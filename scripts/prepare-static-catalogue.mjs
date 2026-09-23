import { readFile, writeFile } from "node:fs/promises";

const source = process.env.SOURCE_CATALOGUE ?? "/home/ubuntu/kslo-ai-resource-showcase/shared/resourceCatalogue.ts";
const destination = "src/resourceCatalogue.ts";
let catalogue = await readFile(source, "utf8");

catalogue = catalogue
  .replace(/\n\s*(driveFolderId|guideFileId|sampleFileId):[^\n]+/g, "")
  .replace(/\n\s*(driveFolderId|guideFileId|sampleFileId)\??: string;/g, "")
  .replace(/"\/manus-storage\/([a-zA-Z0-9._-]+)"/g, 'staticAsset("$1")');

catalogue = `export const staticAsset = (filename: string) => \`${"${import.meta.env.BASE_URL}"}assets/\${filename}\`;\n\n${catalogue}`;
await writeFile(destination, catalogue);
console.log("Prepared static catalogue without Drive IDs or Manus storage URLs.");
