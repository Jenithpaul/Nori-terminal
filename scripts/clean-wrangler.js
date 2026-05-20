import fs from 'fs';
import path from 'path';

const files = [
  path.join('dist', 'client', 'wrangler.json'),
  path.join('dist', 'server', 'wrangler.json')
];

for (const file of files) {
  if (fs.existsSync(file)) {
    try {
      fs.unlinkSync(file);
      console.log(`Successfully deleted generated wrangler configuration to prevent redirection: ${file}`);
    } catch (err) {
      console.error(`Failed to delete ${file}:`, err);
    }
  } else {
    console.log(`File not found, skipping: ${file}`);
  }
}
