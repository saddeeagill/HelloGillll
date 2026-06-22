const fs = require('fs');
const path = require('path');
const { translate } = require('@vitalets/google-translate-api');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts') && !f.includes('types') && !f.includes('lessons') && !f.includes('vocabulary') && !f.includes('exam') && !f.includes('languages'));

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function processFile(file) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // To avoid evaluating arbitrary files and dealing with formatting loss, 
  // we will use regex to find each block and update the translation and urdu fields.
  // This expects the format: word: "...", translation: "...", urdu: "..."
  // Or: "word": "...", "translation": "..."
  
  console.log(`Processing ${file}...`);

  const regex = /(?:\"word\"|word):\s*\"([^\"]+)\"([^}]+?)(?:\"translation\"|translation):\s*\"([^\"]*)\"([^}]+?)(?:(?:\"urdu\"|urdu):\s*\"([^\"]*)\")?/g;
  
  let match;
  let newContent = content;
  let updatesCount = 0;
  
  const matches = [...content.matchAll(regex)];
  console.log(`Found ${matches.length} words in ${file}`);

  for (const m of matches) {
    const fullMatch = m[0];
    const word = m[1];
    const midText = m[2];
    const currentTranslation = m[3];
    const midText2 = m[4];
    const currentUrdu = m[5]; // might be undefined

    try {
      // 1. Get English Translation
      const enRes = await translate(word, { from: 'de', to: 'en' });
      const enTranslation = enRes.text.toLowerCase();
      
      // 2. Get Urdu Translation
      const urRes = await translate(word, { from: 'de', to: 'ur' });
      const urTranslation = urRes.text;

      // Decide if we should update
      let shouldUpdate = false;
      let newEn = currentTranslation;
      let newUr = currentUrdu || "";

      // We won't blindly overwrite if the current translation is close.
      // But if it's empty, or the user wants to "make them correct", we can overwrite.
      if (!currentTranslation || currentTranslation.trim() === "" || currentTranslation !== enTranslation) {
        // Just always use API translation to enforce correctness as requested
        newEn = enTranslation;
        shouldUpdate = true;
      }
      
      if (!currentUrdu || currentUrdu !== urTranslation) {
        newUr = urTranslation;
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        // Construct the replacement string
        let replacement = '';
        if (fullMatch.includes('"word"')) {
           replacement = `"word": "${word}"${midText}"translation": "${newEn}"${midText2}"urdu": "${newUr}"`;
        } else {
           replacement = `word: "${word}"${midText}translation: "${newEn}"${midText2}urdu: "${newUr}"`;
        }
        
        newContent = newContent.replace(fullMatch, replacement);
        updatesCount++;
      }
      
      await delay(100); // 100ms delay to avoid rate limiting
      
    } catch (err) {
      console.error(`Error translating ${word}: ${err.message}`);
      await delay(2000); // wait longer on error
    }
  }

  if (updatesCount > 0) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${updatesCount} translations in ${file}`);
  }
}

async function run() {
  console.log(`Starting audit on ${files.length} files...`);
  for (const file of files) {
    await processFile(file);
  }
  console.log('Finished auditing all files.');
}

run();
