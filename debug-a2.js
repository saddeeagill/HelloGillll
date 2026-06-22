// Debug script for A2 vocabulary
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');

function analyzeFile(filename, varName) {
  const filepath = path.join(dataDir, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`  File not found: ${filename}`);
    return;
  }
  
  const content = fs.readFileSync(filepath, 'utf-8');
  
  const idRegex = /"id":\s*(\d+)/g;
  const ids = [];
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    ids.push(parseInt(match[1]));
  }
  
  // Also try non-quoted id format
  if (ids.length === 0) {
    const idRegex2 = /id:\s*(\d+)/g;
    while ((match = idRegex2.exec(content)) !== null) {
      ids.push(parseInt(match[1]));
    }
  }
  
  const wordRegex = /word:\s*'([^']+)'/g;
  const translationRegex = /translation:\s*'([^']+)'/g;
  
  const words = [];
  while ((match = wordRegex.exec(content)) !== null) {
    words.push(match[1]);
  }
  
  // Reset and also try double-quote format
  if (words.length === 0) {
    const wordRegex2 = /"word":\s*"([^"]+)"/g;
    while ((match = wordRegex2.exec(content)) !== null) {
      words.push(match[1]);
    }
  }
  
  const translations = [];
  // Try single quotes first
  const content2 = content;
  const tr1 = /translation:\s*'([^']+)'/g;
  while ((match = tr1.exec(content2)) !== null) {
    translations.push(match[1]);
  }
  // Try double quotes
  if (translations.length === 0) {
    const tr2 = /"translation":\s*"([^"]+)"/g;
    while ((match = tr2.exec(content)) !== null) {
      translations.push(match[1]);
    }
  }
  
  console.log(`\n=== ${filename} ===`);
  console.log(`Total entries: ${ids.length}`);
  if (ids.length === 0) return;
  
  console.log(`ID range: ${Math.min(...ids)} to ${Math.max(...ids)}`);
  
  // Check for gaps
  const sortedIds = [...ids].sort((a, b) => a - b);
  const gaps = [];
  for (let i = 0; i < sortedIds.length - 1; i++) {
    if (sortedIds[i + 1] - sortedIds[i] > 1) {
      const missing = [];
      for (let j = sortedIds[i] + 1; j < sortedIds[i + 1]; j++) {
        missing.push(j);
      }
      gaps.push(`${missing.join(',')} (between ${sortedIds[i]} and ${sortedIds[i + 1]})`);
    }
  }
  if (gaps.length > 0) {
    console.log(`\nID GAPS (${gaps.length}):`);
    gaps.forEach(g => console.log(`  Missing: ${g}`));
  } else {
    console.log(`✓ No ID gaps`);
  }
  
  // Check for duplicate IDs
  const dupeIds = ids.filter((id, idx) => ids.indexOf(id) !== idx);
  if (dupeIds.length > 0) {
    console.log(`\n✗ DUPLICATE IDs: ${[...new Set(dupeIds)].join(', ')}`);
  } else {
    console.log(`✓ No duplicate IDs`);
  }
  
  // Out-of-order
  let outOfOrder = 0;
  for (let i = 0; i < ids.length - 1; i++) {
    if (ids[i] >= ids[i + 1]) {
      outOfOrder++;
      if (outOfOrder <= 5) console.log(`  Out of order: id ${ids[i]} followed by ${ids[i + 1]}`);
    }
  }
  if (outOfOrder > 5) console.log(`  ... and ${outOfOrder - 5} more`);
  if (outOfOrder === 0) console.log(`✓ IDs in order`);
  
  // Duplicate words
  const wordMap = {};
  for (let i = 0; i < words.length; i++) {
    const w = words[i].toLowerCase();
    if (!wordMap[w]) wordMap[w] = [];
    wordMap[w].push({ id: ids[i], translation: translations[i] || '?' });
  }
  const dupeWords = Object.entries(wordMap).filter(([, v]) => v.length > 1);
  if (dupeWords.length > 0) {
    console.log(`\n✗ DUPLICATE WORDS (${dupeWords.length}):`);
    dupeWords.forEach(([word, entries]) => {
      console.log(`  "${word}": ${entries.map(e => `id:${e.id}="${e.translation}"`).join(', ')}`);
    });
  } else {
    console.log(`✓ No duplicate words`);
  }
  
  // Duplicate translations
  const transMap = {};
  for (let i = 0; i < translations.length; i++) {
    const t = translations[i].toLowerCase();
    if (!transMap[t]) transMap[t] = [];
    transMap[t].push({ id: ids[i], word: words[i] });
  }
  const dupeTrans = Object.entries(transMap).filter(([, v]) => v.length > 1);
  if (dupeTrans.length > 0) {
    console.log(`\n✗ DUPLICATE TRANSLATIONS (${dupeTrans.length}):`);
    dupeTrans.forEach(([trans, entries]) => {
      console.log(`  "${trans}": ${entries.map(e => `id:${e.id}="${e.word}"`).join(', ')}`);
    });
  } else {
    console.log(`✓ No duplicate translations`);
  }
  
  // Slash/comma translations
  const slashTrans = [];
  for (let i = 0; i < translations.length; i++) {
    if (translations[i] && (translations[i].includes('/') || (translations[i].includes(',') && translations[i].length < 40))) {
      slashTrans.push({ id: ids[i], word: words[i], translation: translations[i] });
    }
  }
  if (slashTrans.length > 0) {
    console.log(`\n✗ SLASH/COMMA TRANSLATIONS (${slashTrans.length}):`);
    slashTrans.forEach(s => console.log(`  id:${s.id} "${s.word}" -> "${s.translation}"`));
  }
}

console.log('========================================');
console.log('VOCABULARY DATA ANALYSIS - A2 LEVEL');
console.log('========================================');

analyzeFile('a2-nouns.ts');
analyzeFile('a2-adjectives.ts');
analyzeFile('a2-adverbs.ts');
analyzeFile('a2-regularverbs.ts');
analyzeFile('a2-irregularverbs.ts');
