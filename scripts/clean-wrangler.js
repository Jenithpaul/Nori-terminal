import fs from "fs";
import path from "path";

const filesToDelete = [
  path.join("dist", "client", "wrangler.json"),
  path.join("dist", "server", "wrangler.json"),
];

// Delete generated wrangler files from build output
for (const file of filesToDelete) {
  if (fs.existsSync(file)) {
    try {
      fs.unlinkSync(file);
      console.log(`Deleted generated wrangler configuration: ${file}`);
    } catch (err) {
      console.error(`Failed to delete ${file}:`, err);
    }
  }
}

// Delete .wrangler directory to clear redirect pointers
const wranglerDir = ".wrangler";
if (fs.existsSync(wranglerDir)) {
  try {
    fs.rmSync(wranglerDir, { recursive: true, force: true });
    console.log(`Deleted ${wranglerDir} directory to clear redirect pointers.`);
  } catch (err) {
    console.error(`Failed to delete ${wranglerDir} directory:`, err);
  }
}
