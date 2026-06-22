// Debug script to analyze vocabulary data issues
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
  
  // Extract all id values
  const idRegex = /"id":\s*(\d+)/g;
  const ids = [];
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    ids.push(parseInt(match[1]));
  }
  
  // Extract all words and translations
  const wordRegex = /"word":\s*"([^"]+)"/g;
  const translationRegex = /"translation":\s*"([^"]+)"/g;
  const pluralRegex = /"plural":\s*"([^"]*)"/g;
  
  const words = [];
  while ((match = wordRegex.exec(content)) !== null) {
    words.push(match[1]);
  }
  
  content.replace(/"word":\s*"([^"]+)"/g, () => {}); // reset
  const translations = [];
  while ((match = translationRegex.exec(content)) !== null) {
    translations.push(match[1]);
  }
  
  const plurals = [];
  while ((match = pluralRegex.exec(content)) !== null) {
    plurals.push(match[1]);
  }
  
  console.log(`\n=== ${filename} ===`);
  console.log(`Total entries: ${ids.length}`);
  console.log(`ID range: ${Math.min(...ids)} to ${Math.max(...ids)}`);
  
  // Check for gaps in IDs
  const sortedIds = [...ids].sort((a, b) => a - b);
  const gaps = [];
  for (let i = 0; i < sortedIds.length - 1; i++) {
    if (sortedIds[i + 1] - sortedIds[i] > 1) {
      const gapStart = sortedIds[i] + 1;
      const gapEnd = sortedIds[i + 1] - 1;
      gaps.push(`${gapStart}-${gapEnd} (after id ${sortedIds[i]})`);
    }
  }
  if (gaps.length > 0) {
    console.log(`\nID GAPS FOUND (${gaps.length}):`);
    gaps.forEach(g => console.log(`  Missing: ${g}`));
  } else {
    console.log(`\nNo ID gaps found - sequential OK`);
  }
  
  // Check for duplicate IDs
  const dupeIds = ids.filter((id, idx) => ids.indexOf(id) !== idx);
  if (dupeIds.length > 0) {
    console.log(`\nDUPLICATE IDs: ${[...new Set(dupeIds)].join(', ')}`);
  }
  
  // Check for out-of-order IDs
  let outOfOrder = [];
  for (let i = 0; i < ids.length - 1; i++) {
    if (ids[i] >= ids[i + 1]) {
      outOfOrder.push(`id ${ids[i]} followed by id ${ids[i + 1]} (entries ${i + 1} and ${i + 2})`);
    }
  }
  if (outOfOrder.length > 0) {
    console.log(`\nOUT-OF-ORDER IDs (${outOfOrder.length}):`);
    outOfOrder.forEach(o => console.log(`  ${o}`));
  }
  
  // Check for duplicate translations (same English word for different German words)
  const translationMap = {};
  for (let i = 0; i < words.length; i++) {
    const trans = translations[i]?.toLowerCase();
    if (!translationMap[trans]) translationMap[trans] = [];
    translationMap[trans].push({ word: words[i], id: ids[i], plural: plurals[i] || '' });
  }
  
  const dupeTranslations = Object.entries(translationMap).filter(([, v]) => v.length > 1);
  if (dupeTranslations.length > 0) {
    console.log(`\nDUPLICATE TRANSLATIONS (${dupeTranslations.length}):`);
    dupeTranslations.forEach(([trans, entries]) => {
      console.log(`  "${trans}" used by:`);
      entries.forEach(e => console.log(`    - id:${e.id} word:"${e.word}" plural:"${e.plural}"`));
    });
  }
  
  // Check for duplicate German words
  const wordMap = {};
  for (let i = 0; i < words.length; i++) {
    const w = words[i].toLowerCase();
    if (!wordMap[w]) wordMap[w] = [];
    wordMap[w].push({ id: ids[i], translation: translations[i] });
  }
  
  const dupeWords = Object.entries(wordMap).filter(([, v]) => v.length > 1);
  if (dupeWords.length > 0) {
    console.log(`\nDUPLICATE GERMAN WORDS (${dupeWords.length}):`);
    dupeWords.forEach(([word, entries]) => {
      console.log(`  "${word}" appears ${entries.length} times:`);
      entries.forEach(e => console.log(`    - id:${e.id} translation:"${e.translation}"`));
    });
  }
  
  // Check for translations that look like plurals or have issues
  const suspiciousTranslations = [];
  for (let i = 0; i < words.length; i++) {
    const trans = translations[i];
    const word = words[i];
    const plural = plurals[i] || '';
    
    // Check if translation contains the plural form
    if (plural && trans.toLowerCase().includes(plural.toLowerCase()) && plural !== word) {
      suspiciousTranslations.push({ id: ids[i], word, translation: trans, plural, issue: 'Translation contains plural form' });
    }
    
    // Check if translation has multiple meanings separated by comma or slash
    if (trans.includes('/') || (trans.includes(',') && !trans.includes('excuse me'))) {
      suspiciousTranslations.push({ id: ids[i], word, translation: trans, plural, issue: 'Multiple meanings in translation' });
    }
    
    // Check if translation seems wrong (e.g., adjective for noun)
    if (word === 'Alter' && trans === 'old') {
      suspiciousTranslations.push({ id: ids[i], word, translation: trans, plural, issue: 'Wrong translation - Alter as noun means "age" not "old"' });
    }
  }
  
  if (suspiciousTranslations.length > 0) {
    console.log(`\nSUSPICIOUS TRANSLATIONS (${suspiciousTranslations.length}):`);
    suspiciousTranslations.forEach(s => {
      console.log(`  id:${s.id} "${s.word}" -> "${s.translation}" (plural: "${s.plural}")`);
      console.log(`    Issue: ${s.issue}`);
    });
  }
}

// Analyze A1 files first
console.log('========================================');
console.log('VOCABULARY DATA ANALYSIS - A1 LEVEL');
console.log('========================================');

analyzeFile('a1-nouns.ts');
