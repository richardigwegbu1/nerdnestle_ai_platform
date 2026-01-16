const fs = require("fs");
const path = require("path");

function rm(p) {
  fs.rmSync(p, { recursive: true, force: true });
}
function mkdir(p) {
  fs.mkdirSync(p, { recursive: true });
}
function cp(src, dest) {
  fs.cpSync(src, dest, { recursive: true });
}

const root = process.cwd();
const nextDir = path.join(root, ".next");
const standaloneDir = path.join(nextDir, "standalone");
const standaloneNextDir = path.join(standaloneDir, ".next");

const srcStatic = path.join(nextDir, "static");
const dstStatic = path.join(standaloneNextDir, "static");

const srcPublic = path.join(root, "public");
const dstPublic = path.join(standaloneDir, "public");

mkdir(standaloneNextDir);

if (fs.existsSync(srcStatic)) {
  rm(dstStatic);
  cp(srcStatic, dstStatic);
  console.log("Copied .next/static -> .next/standalone/.next/static");
} else {
  console.warn("WARNING: .next/static not found (did next build run?)");
}

if (fs.existsSync(srcPublic)) {
  rm(dstPublic);
  cp(srcPublic, dstPublic);
  console.log("Copied public -> .next/standalone/public");
} else {
  console.log("No public/ directory found; skipping.");
}

