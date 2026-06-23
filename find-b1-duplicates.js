const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src', 'data', 'b1-nouns-partial.ts');
let content = fs.readFileSync(filepath, 'utf-8');

const objectRegex = /\{\s*id:\s*(\d+),\s*word:\s*"([^"]*)",\s*plural:\s*"([^"]*)",\s*translation:\s*"([^"]*)",\s*urdu:\s*"([^"]*)",\s*category:\s*'([^']*)',\s*level:\s*'([^']*)'\s*\}/g;

const entries = [];
let match;
while ((match = objectRegex.exec(content)) !== null) {
  entries.push({
    id: parseInt(match[1]),
    word: match[2],
    translation: match[4],
    urdu: match[5]
  });
}

const engGroups = new Map();
const urduGroups = new Map();

for (const entry of entries) {
  const transLower = entry.translation.toLowerCase().trim();
  if (!engGroups.has(transLower)) engGroups.set(transLower, []);
  engGroups.get(transLower).push(entry);

  const urduLower = entry.urdu.trim();
  if (!urduGroups.has(urduLower)) urduGroups.set(urduLower, []);
  urduGroups.get(urduLower).push(entry);
}

console.log("=== DUPLICATE ENGLISH ===");
for (const [eng, group] of engGroups.entries()) {
  if (group.length > 1) {
    console.log(`"${eng}":`);
    group.forEach(e => console.log(`  ${e.id} ${e.word} -> ${e.urdu}`));
  }
}

console.log("\n=== DUPLICATE URDU ===");
for (const [urdu, group] of urduGroups.entries()) {
  if (group.length > 1 && urdu.length > 0) {
    console.log(`"${urdu}":`);
    group.forEach(e => console.log(`  ${e.id} ${e.word} -> ${e.translation}`));
  }
}
