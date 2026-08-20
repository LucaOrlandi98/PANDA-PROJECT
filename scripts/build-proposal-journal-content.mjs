import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const workspace = process.cwd();
const sourcePath = path.join(workspace, "src", "data", "journalContent.ts");
const outputPath = path.join(workspace, "public", "proposta-partner", "journal", "content.js");
const imageDirectory = path.join(workspace, "public", "assets", "images", "grecia-turchia");

const source = await readFile(sourcePath, "utf8");
const start = source.indexOf("export const journalLogEntries");
const end = source.indexOf("export const journalOtherEquipmentGroups", start);

if (start === -1 || end === -1) {
  throw new Error("Impossibile estrarre gli articoli originali del Journal.");
}

const statement = source
  .slice(start, end)
  .replace("export const journalLogEntries: JournalLogEntry[] =", "const journalLogEntries =");
const javascript = ts.transpileModule(statement, {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;
const entries = new Function(`${javascript}\nreturn journalLogEntries;`)();
const travelImages = (await readdir(imageDirectory))
  .filter((file) => /\.jpg$/i.test(file))
  .sort()
  .map((file) => `../../assets/images/grecia-turchia/${file}`);
const preparationImages = [
  "../../assets/images/panda-axle.jpg",
  "../../assets/images/panda-front-garage.jpg",
  "../../assets/images/panda-rust-floor.jpg",
  "../../assets/images/panda-underbody.jpg",
];

await writeFile(
  outputPath,
  `window.PANDA_JOURNAL = ${JSON.stringify({ entries, gallery: [...preparationImages, ...travelImages] })};\n`,
  "utf8",
);
