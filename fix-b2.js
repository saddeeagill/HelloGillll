// Fix B2 vocabulary files - remove exact duplicate words, fix translations
const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, 'src', 'data');

function fixFile(filename, fixes) {
  const filepath = path.join(dataDir, filename);
  let content = fs.readFileSync(filepath, 'utf-8');
  
  // Detect format
  const usesDoubleQuoteKeys = content.includes('"id":');
  
  // Parse IDs
  let ids = [];
  let match;
  const idPattern = usesDoubleQuoteKeys ? /"id":\s*(\d+)/g : /id:\s*(\d+)/g;
  while ((match = idPattern.exec(content)) !== null) ids.push(parseInt(match[1]));
  
  // Parse words
  let words = [];
  const wordPatterns = [/"word":\s*"([^"]+)"/g, /word:\s*'([^']+)'/g, /word:\s*"([^"]+)"/g];
  for (const wp of wordPatterns) {
    while ((match = wp.exec(content)) !== null) words.push(match[1]);
    if (words.length > 0) break;
  }
  
  console.log(`\n=== Processing ${filename} (${ids.length} entries) ===`);
  
  // Find duplicate word entries (keep first, remove second)
  const seenWords = new Map();
  const dupeIds = new Set();
  for (let i = 0; i < words.length; i++) {
    const w = words[i].toLowerCase();
    if (seenWords.has(w)) {
      console.log(`  Remove duplicate: "${words[i]}" (id:${ids[i]}, duplicate of id:${seenWords.get(w)})`);
      dupeIds.add(ids[i]);
    } else {
      seenWords.set(w, ids[i]);
    }
  }
  
  if (dupeIds.size > 0) {
    // Remove duplicate entries from content
    // Find and remove each duplicate entry block
    for (const dupeId of dupeIds) {
      const idStr = usesDoubleQuoteKeys ? `"id": ${dupeId}` : `id: ${dupeId}`;
      // Find the entry containing this id
      const entryRegex = new RegExp(`\\s*\\{[^}]*${idStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^}]*\\},?`, 'g');
      const before = content.length;
      content = content.replace(entryRegex, '');
      if (content.length === before) {
        console.log(`  WARNING: Could not remove entry with id ${dupeId}`);
      }
    }
  }
  
  // Apply specific translation fixes
  if (fixes) {
    for (const [word, newTrans] of Object.entries(fixes)) {
      // Find the entry with this word and replace translation
      const wordEscaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const transRegex = new RegExp(`("word":\\s*"${wordEscaped}"[^}]*"translation":\\s*)"([^"]+)"`, 'g');
      const transRegex2 = new RegExp(`(word:\\s*"${wordEscaped}"[^}]*translation:\\s*)"([^"]+)"`, 'g');
      const transRegex3 = new RegExp(`(word:\\s*'${wordEscaped}'[^}]*translation:\\s*)'([^']+)'`, 'g');
      
      let replaced = false;
      const newContent = content.replace(transRegex, (m, prefix) => { replaced = true; return `${prefix}"${newTrans}"`; });
      if (replaced) { content = newContent; console.log(`  Fix: "${word}" -> "${newTrans}"`); continue; }
      
      const newContent2 = content.replace(transRegex2, (m, prefix) => { replaced = true; return `${prefix}"${newTrans}"`; });
      if (replaced) { content = newContent2; console.log(`  Fix: "${word}" -> "${newTrans}"`); continue; }
      
      const newContent3 = content.replace(transRegex3, (m, prefix) => { replaced = true; return `${prefix}'${newTrans}'`; });
      if (replaced) { content = newContent3; console.log(`  Fix: "${word}" -> "${newTrans}"`); continue; }
    }
  }
  
  // Renumber IDs
  let counter = 0;
  let lastIndex = 0;
  let newContent = '';
  const renumberPattern = usesDoubleQuoteKeys ? /"id":\s*\d+/g : /id:\s*\d+/g;
  while ((match = renumberPattern.exec(content)) !== null) {
    counter++;
    newContent += content.substring(lastIndex, match.index);
    newContent += usesDoubleQuoteKeys ? `"id": ${counter}` : `id: ${counter}`;
    lastIndex = match.index + match[0].length;
  }
  newContent += content.substring(lastIndex);
  
  fs.writeFileSync(filepath, newContent);
  console.log(`  Written ${counter} entries (removed ${dupeIds.size} duplicates)`);
}

// B2 Nouns - fix duplicate words and differentiate duplicate translations
fixFile('b2-nouns-part1.ts', {
  'Ausreise': 'emigration',           // was "departure" (Abfahrt is already "departure")
  'Gewohnheit': 'routine',            // was "habit" (Angewohnheit is already "habit")
  'Bewerbungsschreiben': 'application letter', // was "cover letter"
  'Arbeitsklima': 'work environment', // was "working atmosphere"
  'Empfindung': 'feeling',            // was "sensation"
  'Informationsmaterial': 'informational material', // was "information"
  'Bescheid': 'notification',         // was "notice"
  'Hinweis': 'hint',                  // was "notice"
  'Dokument': 'official document',    // was "document"
  'Fachwelt': 'professional community', // was "professional world"
  'Kanzlerin': 'female chancellor',   // was "chancellor"
  'Kenntnis': 'awareness',            // was "knowledge"
  'Fertigstellung': 'finalization',   // was "completion"
  'Generation': 'generation (people)', // was "generation"
  'Hirn': 'brain (informal)',         // was "brain"
  'Malerei': 'painting (art form)',   // was "painting"
  'Management': 'management (team)',  // was "management"
  'Kampfsport': 'combat sport',       // was "martial arts"
  'Kommunikationsstärke': 'communication strength', // was "communication skills"
  // Fix corrupted slash translations
  'Examen': 'exam',
  'Fazit': 'conclusion',
  'GehilfeGehilfin': 'assistant',
  'Härte': 'hardness',
  'Komma': 'comma',
  'KomplizeKomplizin': 'accomplice',
});

// B2 Adjectives - fix duplicate words and differentiate translations
fixFile('b2-adjectives.ts', {
  'fehlerlos': 'error-free',         // was "flawless" (einwandfrei is already "flawless")
  'wünschenswert': 'desirable',      // keep
  'heimisch': 'local',               // was "native" (gebürtig is already "native")
  'glaubwürdig': 'trustworthy',      // was "credible" (glaubhaft is already "credible")
  'ständig': 'permanent',            // was "constant" (konstant is already "constant")
  'langfristig': 'long-lasting',     // was "long-term" (längerfristig is already "long-term")
  'schlummerlos': 'restless',         // was "sleepless" (schlaflos is already "sleepless")
  'zuversichtlich': 'optimistic',    // was "confident" (selbstbewusst is already "confident")
  'unpassend': 'unsuitable',         // was "inappropriate" (unangebracht already)
  'wesentlich': 'essential',         // was "significant"
});

// B2 Adverbs - fix duplicate words
fixFile('b2-adverbs.ts', {
  'überaus': 'exceedingly',          // was "extremely"
  'zumeist': 'for the most part',    // was "mostly"
});

// B2 Modal Verbs - fix slash translations
fixFile('b2-modalverbs.ts', {
  'dürfen': 'to be allowed to',
  'können': 'to be able to',
  'mögen': 'to like',
  'müssen': 'to have to',
  'sollen': 'to be supposed to',
  'wollen': 'to want to',
});

console.log('\n✓ All B2 files fixed!');
