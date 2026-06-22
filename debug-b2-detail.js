// Detailed B2 analysis - find exact duplicate words and translations
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');

function detailedAnalysis(filename) {
  const filepath = path.join(dataDir, filename);
  const content = fs.readFileSync(filepath, 'utf-8');
  
  let ids = [], words = [], translations = [];
  let match;
  
  // Try both id formats
  let idRegex = /"id":\s*(\d+)/g;
  while ((match = idRegex.exec(content)) !== null) ids.push(parseInt(match[1]));
  if (ids.length === 0) { idRegex = /id:\s*(\d+)/g; while ((match = idRegex.exec(content)) !== null) ids.push(parseInt(match[1])); }
  
  // Try word formats
  let wr = /"word":\s*"([^"]+)"/g;
  while ((match = wr.exec(content)) !== null) words.push(match[1]);
  if (words.length === 0) { wr = /word:\s*'([^']+)'/g; while ((match = wr.exec(content)) !== null) words.push(match[1]); }
  if (words.length === 0) { wr = /word:\s*"([^"]+)"/g; while ((match = wr.exec(content)) !== null) words.push(match[1]); }
  
  // Try translation formats
  let tr = /"translation":\s*"([^"]+)"/g;
  while ((match = tr.exec(content)) !== null) translations.push(match[1]);
  if (translations.length === 0) { tr = /translation:\s*'([^']+)'/g; while ((match = tr.exec(content)) !== null) translations.push(match[1]); }
  if (translations.length === 0) { tr = /translation:\s*"([^"]+)"/g; while ((match = tr.exec(content)) !== null) translations.push(match[1]); }
  
  console.log(`\n=== ${filename} (${ids.length} entries) ===`);
  
  // Duplicate words
  const wordMap = {};
  for (let i = 0; i < words.length; i++) {
    const w = words[i].toLowerCase();
    if (!wordMap[w]) wordMap[w] = [];
    wordMap[w].push({ id: ids[i], translation: translations[i] || '?' });
  }
  const dupeWords = Object.entries(wordMap).filter(([, v]) => v.length > 1);
  if (dupeWords.length > 0) {
    console.log(`\nDuplicate words:`);
    dupeWords.forEach(([w, entries]) => {
      console.log(`  "${w}": ${entries.map(e => `id:${e.id}="${e.translation}"`).join(' | ')}`);
    });
  }
  
  // Duplicate translations
  const transMap = {};
  for (let i = 0; i < translations.length; i++) {
    const t = translations[i]?.toLowerCase();
    if (!transMap[t]) transMap[t] = [];
    transMap[t].push({ id: ids[i], word: words[i] });
  }
  const dupeTrans = Object.entries(transMap).filter(([, v]) => v.length > 1);
  if (dupeTrans.length > 0) {
    console.log(`\nDuplicate translations:`);
    dupeTrans.forEach(([t, entries]) => {
      console.log(`  "${t}": ${entries.map(e => `id:${e.id}="${e.word}"`).join(' | ')}`);
    });
  }
  
  // Slash translations
  const slashTrans = [];
  for (let i = 0; i < translations.length; i++) {
    if (translations[i]?.includes('/')) {
      slashTrans.push({ id: ids[i], word: words[i], translation: translations[i] });
    }
  }
  if (slashTrans.length > 0) {
    console.log(`\nSlash translations:`);
    slashTrans.forEach(s => console.log(`  id:${s.id} "${s.word}" -> "${s.translation}"`));
  }
}

console.log('B2 DETAILED ANALYSIS');
console.log('====================');
detailedAnalysis('b2-nouns-part1.ts');
detailedAnalysis('b2-adjectives.ts');
detailedAnalysis('b2-adverbs.ts');
detailedAnalysis('b2-irregularverbs.ts');
detailedAnalysis('b2-modalverbs.ts');
