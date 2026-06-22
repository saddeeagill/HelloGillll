// Generic fix script - renumber IDs in vocabulary files
// Usage: node fix-ids.js <filename> 
const fs = require('fs');
const path = require('path');

const filename = process.argv[2];
if (!filename) {
  console.log('Usage: node fix-ids.js <filename>');
  process.exit(1);
}

const filepath = path.join(__dirname, 'src', 'data', filename);
let content = fs.readFileSync(filepath, 'utf-8');

// Detect format: double-quoted or unquoted keys
const isDoubleQuotedKeys = content.includes('"id":');
const isSingleQuotedValues = content.includes("category: '");

// Find all id values and replace them sequentially
let counter = 0;
let lastIndex = 0;
let newContent = '';

if (isDoubleQuotedKeys) {
  // Format: "id": 123
  const idRegex = /"id":\s*\d+/g;
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    counter++;
    newContent += content.substring(lastIndex, match.index);
    newContent += `"id": ${counter}`;
    lastIndex = match.index + match[0].length;
  }
  newContent += content.substring(lastIndex);
} else {
  // Format: id: 123
  const idRegex = /id:\s*\d+/g;
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    counter++;
    newContent += content.substring(lastIndex, match.index);
    newContent += `id: ${counter}`;
    lastIndex = match.index + match[0].length;
  }
  newContent += content.substring(lastIndex);
}

fs.writeFileSync(filepath, newContent);
console.log(`${filename}: Renumbered ${counter} entries sequentially (1 to ${counter})`);
