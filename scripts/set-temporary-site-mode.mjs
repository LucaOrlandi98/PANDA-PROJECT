import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const requestedMode = process.argv[2];
const modeAliases = {
  ripristina: "ripristino",
  ripristino: "ripristino",
  oscura: "oscura",
};
const normalizedMode = modeAliases[requestedMode];

if (!normalizedMode) {
  console.error(
    "Uso: node scripts/set-temporary-site-mode.mjs <ripristina|ripristino|oscura>",
  );
  process.exit(1);
}

const configPath = resolve("src/data/temporarySite.ts");
const source = readFileSync(configPath, "utf8");
const modePattern =
  /export const activeTemporarySiteMode: TemporarySiteMode = "(ripristino|oscura)";/;

if (!modePattern.test(source)) {
  console.error("Impossibile trovare activeTemporarySiteMode in src/data/temporarySite.ts.");
  process.exit(1);
}

const updatedSource = source.replace(
  modePattern,
  `export const activeTemporarySiteMode: TemporarySiteMode = "${normalizedMode}";`,
);

writeFileSync(configPath, updatedSource);
console.log(`Modalita temporanea impostata su: ${normalizedMode}`);
