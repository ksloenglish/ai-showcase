import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const sourceRoot = process.env.SOURCE_ROOT ?? "/home/ubuntu/kslo-ai-resource-showcase";
const destination = join(process.cwd(), "public", "assets");
const sourceFiles = [
  join(sourceRoot, "shared", "resourceCatalogue.ts"),
  join(sourceRoot, "client", "src", "pages", "Home.tsx"),
  join(sourceRoot, "client", "src", "components", "BrandMark.tsx"),
];
const assetOrigin = "https://ksloai.manus.space/manus-storage/";

await mkdir(destination, { recursive: true });
const sourceText = (await Promise.all(sourceFiles.map(file => readFile(file, "utf8")))).join("\n");
const assets = [...sourceText.matchAll(/\/manus-storage\/([a-zA-Z0-9._-]+)/g)].map(match => match[1]);
const uniqueAssets = [...new Set(assets)].sort();

if (!uniqueAssets.length) throw new Error("No Manus storage assets were found in the source catalogue.");

const results = [];
for (const filename of uniqueAssets) {
  const localPath = join(destination, filename);
  let response;
  let lastError;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      response = await fetch(`${assetOrigin}${encodeURIComponent(filename)}`, { signal: AbortSignal.timeout(30_000) });
      if (response.ok) break;
    } catch (error) {
      lastError = error;
    }
    await new Promise(resolve => setTimeout(resolve, 750 * (attempt + 1)));
  }
  if (!response?.ok) {
    const failureDetail = response?.status ?? (lastError instanceof Error ? lastError.message : "network error");
    throw new Error(`Could not export ${filename}: ${failureDetail}`);
  }
  await writeFile(localPath, Buffer.from(await response.arrayBuffer()));
  results.push({ filename, bytes: Number(response.headers.get("content-length") ?? 0), contentType: response.headers.get("content-type") ?? "" });
}

await writeFile(join(destination, "manifest.json"), `${JSON.stringify({ source: "Manus managed storage export", assets: results }, null, 2)}\n`);
console.log(`Exported ${results.length} static assets.`);
