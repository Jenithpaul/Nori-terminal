const fs = require("fs");
const path = require("path");

const docsPath = path.join(__dirname, "../src/routes/docs.tsx");
let content = fs.readFileSync(docsPath, "utf8");

// 1. Typography
content = content.replace(/font-medium/g, "font-normal");
content = content.replace(/font-semibold/g, "font-normal");
content = content.replace(/font-bold/g, "font-normal");

// 2. Surfaces & Backgrounds
content = content.replace(/bg-white\/\[0\.015\]/g, "bg-[#121214]");
content = content.replace(/bg-white\/\[0\.02\]/g, "bg-[#121214]");
content = content.replace(/bg-white\/\[0\.04\]/g, "bg-[#18181b]");
content = content.replace(/bg-white\/\[0\.05\]/g, "bg-[#121214]");
content = content.replace(/bg-white\/\[0\.06\]/g, "bg-[#18181b]");
content = content.replace(/bg-\[#0a0a0c\]/g, "bg-[#121214]");
content = content.replace(/bg-\[#121214\]\/[0-9]+/g, "bg-[#121214]"); // remove opacity from ash
content = content.replace(/bg-white\/[0-9]+/g, "bg-[#18181b]"); // convert remaining white bg to charcoal

// 3. Borders
content = content.replace(/border-white\/\[0\.04\]/g, "border-neutral-800/30");
content = content.replace(/border-white\/\[0\.05\]/g, "border-neutral-800/30");
content = content.replace(/border-white\/\[0\.06\]/g, "border-neutral-800/30");
content = content.replace(/border-white\/\[0\.08\]/g, "border-neutral-800/30");
content = content.replace(/border-white\/\[0\.1\]/g, "border-neutral-800/30");
content = content.replace(/border-white\/\[0\.15\]/g, "border-neutral-800/30");
content = content.replace(/border-neutral-900\/[0-9]+/g, "border-neutral-800/30");

// 4. Icons (Stroke Width)
// Target `<Icon ` and `<SomeIcon `
content = content.replace(
  /<([A-Z][a-zA-Z0-9]*)\s+className=/g,
  '<$1 strokeWidth={1.2} fill="none" className=',
);

// Target `size={number}` without strokeWidth
content = content.replace(
  /<([A-Z][a-zA-Z0-9]*)\s+size=\{([0-9]+)\}\s+className=/g,
  '<$1 size={$2} strokeWidth={1.2} fill="none" className=',
);

fs.writeFileSync(docsPath, content, "utf8");
console.log("Migration script complete.");
