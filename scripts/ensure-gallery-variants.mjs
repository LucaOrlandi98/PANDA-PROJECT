import { existsSync, readdirSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const imageRoot = path.join(projectRoot, "public", "assets", "images");
const optimizerScript = path.join(projectRoot, "scripts", "optimize_gallery_images.py");
const bundledCodexPython = process.platform === "win32"
  ? path.join(
      process.env.USERPROFILE ?? "",
      ".cache",
      "codex-runtimes",
      "codex-primary-runtime",
      "dependencies",
      "python",
      "python.exe",
    )
  : path.join(
      process.env.HOME ?? "",
      ".cache",
      "codex-runtimes",
      "codex-primary-runtime",
      "dependencies",
      "python",
      "python",
    );
const sourceExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const generatedSuffixes = [".thumb.webp", ".lightbox.webp"];

function isGeneratedVariant(filePath) {
  return generatedSuffixes.some((suffix) => filePath.toLowerCase().endsWith(suffix));
}

function walkFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(fullPath);
    }

    return [fullPath];
  });
}

function listSourceImages() {
  if (!existsSync(imageRoot)) {
    return [];
  }

  return walkFiles(imageRoot).filter((filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    return sourceExtensions.has(extension) && !isGeneratedVariant(filePath);
  });
}

function getVariantPath(filePath, suffix) {
  const extension = path.extname(filePath);
  return `${filePath.slice(0, -extension.length)}${suffix}`;
}

function hasStaleVariants(filePath) {
  const sourceModifiedAt = statSync(filePath).mtimeMs;

  return generatedSuffixes.some((suffix) => {
    const variantPath = getVariantPath(filePath, suffix);

    if (!existsSync(variantPath)) {
      return true;
    }

    return statSync(variantPath).mtimeMs < sourceModifiedAt;
  });
}

function findPythonCommand() {
  const candidates = [
    ...(existsSync(bundledCodexPython) ? [[bundledCodexPython]] : []),
    ...(process.platform === "win32"
    ? [
        ["python"],
        ["py", "-3"],
        ["python3"],
      ]
    : [
        ["python3"],
        ["python"],
      ]),
  ];

  return candidates.find((command) => {
    const result = spawnSync(command[0], [...command.slice(1), "--version"], {
      encoding: "utf8",
      stdio: "ignore",
    });

    return result.status === 0;
  });
}

function runOptimizer() {
  const pythonCommand = findPythonCommand();

  if (!pythonCommand) {
    throw new Error("Python non trovato. Installa Python 3 oppure genera i derivati immagine prima del build.");
  }

  const result = spawnSync(
    pythonCommand[0],
    [...pythonCommand.slice(1), optimizerScript, imageRoot],
    {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: "inherit",
    },
  );

  if (result.status !== 0) {
    throw new Error("Ottimizzazione immagini non riuscita.");
  }
}

const sourceImages = listSourceImages();
const needsOptimization = sourceImages.some(hasStaleVariants);

if (!needsOptimization) {
  console.log(`Gallery assets già ottimizzati (${sourceImages.length} sorgenti).`);
  process.exit(0);
}

runOptimizer();

const remainingStaleFiles = listSourceImages().filter(hasStaleVariants);

if (remainingStaleFiles.length > 0) {
  console.error("Alcune immagini non hanno derivati aggiornati:");
  remainingStaleFiles.forEach((filePath) => console.error(`- ${path.relative(projectRoot, filePath)}`));
  process.exit(1);
}

console.log(`Gallery assets ottimizzati (${sourceImages.length} sorgenti).`);
