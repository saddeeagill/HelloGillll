// Debug script for B1 vocabulary
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
  
  // Try both quote formats for IDs
  let ids = [];
  let match;
  const idRegex1 = /"id":\s*(\d+)/g;
  while ((match = idRegex1.exec(content)) !== null) ids.push(parseInt(match[1]));
  if (ids.length === 0) {
    const idRegex2 = /id:\s*(\d+)/g;
    while ((match = idRegex2.exec(content)) !== null) ids.push(parseInt(match[1]));
  }
  
  // Try both formats for words
  let words = [];
  const wr1 = /"word":\s*"([^"]+)"/g;
  while ((match = wr1.exec(content)) !== null) words.push(match[1]);
  if (words.length === 0) {
    const wr2 = /word:\s*'([^']+)'/g;
    while ((match = wr2.exec(content)) !== null) words.push(match[1]);
  }
  
  // Translations
  let translations = [];
  const tr1 = /"translation":\s*"([^"]+)"/g;
  while ((match = tr1.exec(content)) !== null) translations.push(match[1]);
  if (translations.length === 0) {
    const tr2 = /translation:\s*'([^']+)'/g;
    while ((match = tr2.exec(content)) !== null) translations.push(match[1]);
  }
  
  console.log(`\n=== ${filename} ===`);
  console.log(`Total entries: ${ids.length}`);
  if (ids.length === 0) return;
  console.log(`ID range: ${Math.min(...ids)} to ${Math.max(...ids)}`);
  
  // Gaps
  const sortedIds = [...ids].sort((a, b) => a - b);
  let gapCount = 0;
  for (let i = 0; i < sortedIds.length - 1; i++) {
    if (sortedIds[i + 1] - sortedIds[i] > 1) {
      gapCount += sortedIds[i + 1] - sortedIds[i] - 1;
      if (gapCount <= 20) {
        const missing = [];
        for (let j = sortedIds[i] + 1; j < sortedIds[i + 1]; j++) missing.push(j);
        console.log(`  Gap: ${missing.join(',')} (between ${sortedIds[i]} and ${sortedIds[i + 1]})`);
      }
    }
  }
  if (gapCount > 0) console.log(`✗ Total missing IDs: ${gapCount}`);
  else console.log(`✓ No ID gaps`);
  
  // Duplicate IDs
  const dupeIds = ids.filter((id, idx) => ids.indexOf(id) !== idx);
  if (dupeIds.length > 0) console.log(`✗ DUPLICATE IDs: ${[...new Set(dupeIds)].slice(0, 10).join(', ')}${dupeIds.length > 10 ? '...' : ''}`);
  else console.log(`✓ No duplicate IDs`);
  
  // Out of order
  let outOfOrder = 0;
  for (let i = 0; i < ids.length - 1; i++) if (ids[i] >= ids[i + 1]) outOfOrder++;
  if (outOfOrder > 0) console.log(`✗ ${outOfOrder} out-of-order IDs`);
  else console.log(`✓ IDs in order`);
  
  // Duplicate words
  const wordMap = {};
  for (let i = 0; i < words.length; i++) {
    const w = words[i].toLowerCase();
    if (!wordMap[w]) wordMap[w] = [];
    wordMap[w].push(ids[i]);
  }
  const dupeWords = Object.entries(wordMap).filter(([, v]) => v.length > 1);
  if (dupeWords.length > 0) {
    console.log(`✗ DUPLICATE WORDS (${dupeWords.length}):`);
    dupeWords.forEach(([w, idList]) => console.log(`  "${w}": ids ${idList.join(',')}`));
  } else console.log(`✓ No duplicate words`);
  
  // Duplicate translations
  const transMap = {};
  for (let i = 0; i < translations.length; i++) {
    const t = translations[i].toLowerCase();
    if (!transMap[t]) transMap[t] = [];
    transMap[t].push({ id: ids[i], word: words[i] });
  }
  const dupeTrans = Object.entries(transMap).filter(([, v]) => v.length > 1);
  if (dupeTrans.length > 0) {
    console.log(`✗ DUPLICATE TRANSLATIONS (${dupeTrans.length}):`);
    dupeTrans.slice(0, 15).forEach(([t, entries]) => {
      console.log(`  "${t}": ${entries.map(e => `${e.word}(${e.id})`).join(', ')}`);
    });
    if (dupeTrans.length > 15) console.log(`  ... and ${dupeTrans.length - 15} more`);
  } else console.log(`✓ No duplicate translations`);
  
  // Slash translations
  const slashCount = translations.filter(t => t && t.includes('/')).length;
  if (slashCount > 0) console.log(`✗ ${slashCount} slash-separated translations`);
}

console.log('========================================');
console.log('VOCABULARY DATA ANALYSIS - B1 LEVEL');
console.log('========================================');

analyzeFile('b1-nouns-partial.ts');
analyzeFile('b1-adjectives.ts');
analyzeFile('b1-adverbs.ts');
analyzeFile('b1-irregularverbs.ts');
analyzeFile('b1-modalverbs.ts');
analyzeFile('b1-regularverbs-part1.ts');
analyzeFile('b1-regularverbs-part2.ts');
