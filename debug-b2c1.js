// Debug script for B2 and C1 vocabulary
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');

function analyzeFile(filename) {
  const filepath = path.join(dataDir, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`  File not found: ${filename}`);
    return;
  }
  
  const content = fs.readFileSync(filepath, 'utf-8');
  
  let ids = [];
  let match;
  const idRegex1 = /"id":\s*(\d+)/g;
  while ((match = idRegex1.exec(content)) !== null) ids.push(parseInt(match[1]));
  if (ids.length === 0) {
    const idRegex2 = /id:\s*(\d+)/g;
    while ((match = idRegex2.exec(content)) !== null) ids.push(parseInt(match[1]));
  }
  
  let words = [];
  const wr1 = /"word":\s*"([^"]+)"/g;
  while ((match = wr1.exec(content)) !== null) words.push(match[1]);
  if (words.length === 0) {
    const wr2 = /word:\s*'([^']+)'/g;
    while ((match = wr2.exec(content)) !== null) words.push(match[1]);
  }
  if (words.length === 0) {
    const wr3 = /word:\s*"([^"]+)"/g;
    while ((match = wr3.exec(content)) !== null) words.push(match[1]);
  }
  
  let translations = [];
  const tr1 = /"translation":\s*"([^"]+)"/g;
  while ((match = tr1.exec(content)) !== null) translations.push(match[1]);
  if (translations.length === 0) {
    const tr2 = /translation:\s*'([^']+)'/g;
    while ((match = tr2.exec(content)) !== null) translations.push(match[1]);
  }
  if (translations.length === 0) {
    const tr3 = /translation:\s*"([^"]+)"/g;
    while ((match = tr3.exec(content)) !== null) translations.push(match[1]);
  }
  
  console.log(`\n=== ${filename} ===`);
  console.log(`Total entries: ${ids.length}`);
  if (ids.length === 0) return;
  console.log(`ID range: ${Math.min(...ids)} to ${Math.max(...ids)}`);
  
  // Gaps
  const sortedIds = [...ids].sort((a, b) => a - b);
  let totalGaps = 0;
  for (let i = 0; i < sortedIds.length - 1; i++) {
    if (sortedIds[i + 1] - sortedIds[i] > 1) {
      totalGaps += sortedIds[i + 1] - sortedIds[i] - 1;
    }
  }
  if (totalGaps > 0) console.log(`✗ ${totalGaps} missing IDs in gaps`);
  else console.log(`✓ No ID gaps`);
  
  // Duplicate IDs
  const dupeIds = ids.filter((id, idx) => ids.indexOf(id) !== idx);
  if (dupeIds.length > 0) console.log(`✗ ${dupeIds.length} duplicate IDs`);
  else console.log(`✓ No duplicate IDs`);
  
  // Duplicate words
  const wordSet = new Set();
  let dupeWordCount = 0;
  for (const w of words) {
    if (wordSet.has(w.toLowerCase())) dupeWordCount++;
    wordSet.add(w.toLowerCase());
  }
  if (dupeWordCount > 0) console.log(`✗ ${dupeWordCount} duplicate words`);
  else console.log(`✓ No duplicate words`);
  
  // Duplicate translations
  const transSet = new Set();
  let dupeTransCount = 0;
  for (const t of translations) {
    if (transSet.has(t.toLowerCase())) dupeTransCount++;
    transSet.add(t.toLowerCase());
  }
  if (dupeTransCount > 0) console.log(`✗ ${dupeTransCount} duplicate translations`);
  else console.log(`✓ No duplicate translations`);
  
  // Slash translations
  const slashCount = translations.filter(t => t && t.includes('/')).length;
  if (slashCount > 0) console.log(`✗ ${slashCount} slash-separated translations`);
}

console.log('========================================');
console.log('VOCABULARY DATA ANALYSIS - B2 LEVEL');
console.log('========================================');
analyzeFile('b2-nouns-part1.ts');
analyzeFile('b2-adjectives.ts');
analyzeFile('b2-adverbs.ts');
analyzeFile('b2-irregularverbs.ts');
analyzeFile('b2-modalverbs.ts');
analyzeFile('b2-regularverbs.ts');

console.log('\n========================================');
console.log('VOCABULARY DATA ANALYSIS - C1 LEVEL');
console.log('========================================');
analyzeFile('c1-nouns-part1.ts');
analyzeFile('c1-adjectives.ts');
analyzeFile('c1-adverbs.ts');
analyzeFile('c1-irregularverbs.ts');
analyzeFile('c1-modalverbs.ts');
analyzeFile('c1-regularverbs.ts');
