// Verify the A1 nouns fix
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');

function analyzeFile(filename) {
  const filepath = path.join(dataDir, filename);
  const content = fs.readFileSync(filepath, 'utf-8');
  
  const idRegex = /"id":\s*(\d+)/g;
  const ids = [];
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    ids.push(parseInt(match[1]));
  }
  
  const wordRegex = /"word":\s*"([^"]+)"/g;
  const translationRegex = /"translation":\s*"([^"]+)"/g;
  
  const words = [];
  while ((match = wordRegex.exec(content)) !== null) {
    words.push(match[1]);
  }
  
  const translations = [];
  while ((match = translationRegex.exec(content)) !== null) {
    translations.push(match[1]);
  }
  
  console.log(`\n=== ${filename} ===`);
  console.log(`Total entries: ${ids.length}`);
  console.log(`ID range: ${Math.min(...ids)} to ${Math.max(...ids)}`);
  
  // Check sequential
  let sequential = true;
  for (let i = 0; i < ids.length; i++) {
    if (ids[i] !== i + 1) {
      console.log(`ID gap at position ${i}: expected ${i + 1}, got ${ids[i]}`);
      sequential = false;
    }
  }
  if (sequential) console.log('✓ IDs are perfectly sequential (1 to ' + ids.length + ')');
  
  // Check duplicate words
  const wordSet = new Set();
  let dupeWordCount = 0;
  for (const w of words) {
    if (wordSet.has(w.toLowerCase())) {
      console.log(`✗ Still duplicate word: ${w}`);
      dupeWordCount++;
    }
    wordSet.add(w.toLowerCase());
  }
  if (dupeWordCount === 0) console.log('✓ No duplicate German words');
  
  // Check duplicate translations
  const transMap = {};
  for (let i = 0; i < translations.length; i++) {
    const t = translations[i].toLowerCase();
    if (!transMap[t]) transMap[t] = [];
    transMap[t].push(words[i]);
  }
  const dupeTranslations = Object.entries(transMap).filter(([, v]) => v.length > 1);
  if (dupeTranslations.length > 0) {
    console.log(`\nRemaining duplicate translations: ${dupeTranslations.length}`);
    dupeTranslations.forEach(([t, ws]) => {
      console.log(`  "${t}": ${ws.join(', ')}`);
    });
  } else {
    console.log('✓ No duplicate translations');
  }
}

analyzeFile('a1-nouns.ts');
