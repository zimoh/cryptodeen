import { copyFile, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const distDir = join(process.cwd(), "dist");
const indexPath = join(distDir, "index.html");
const repoBasePath = "/cryptodeen";

const html = await readFile(indexPath, "utf8");
const patched = html
  .replaceAll('href="/', `href="${repoBasePath}/`)
  .replaceAll('src="/', `src="${repoBasePath}/`);

await writeFile(indexPath, patched);
await copyFile(indexPath, join(distDir, "404.html"));
