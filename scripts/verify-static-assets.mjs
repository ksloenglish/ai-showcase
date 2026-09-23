import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const catalogue = await readFile("src/resourceCatalogue.ts", "utf8");
const references = [...catalogue.matchAll(/staticAsset\("([a-zA-Z0-9._-]+)"\)/g)].map(match => match[1]);
const uniqueReferences = [...new Set(references)];
const requiredSiteAssets = [
  "kslo-hero-editorial_15d4a6d8.jpg",
  "kslo-process-editorial_0640bf4b.jpg",
  "kslo-signal-texture_487954d6.jpg",
  "kslo-english-official-logo_5c0e5ebe.png",
];

if (catalogue.includes("/manus-storage/")) throw new Error("Catalogue still references Manus managed storage.");
if (uniqueReferences.length !== 42) throw new Error(`Expected 42 local catalogue assets; found ${uniqueReferences.length}.`);
for (const filename of [...uniqueReferences, ...requiredSiteAssets]) {
  await access(join("public", "assets", filename));
}
console.log(`Static assets: PASS (${uniqueReferences.length} catalogue assets and ${requiredSiteAssets.length} site assets)`);
