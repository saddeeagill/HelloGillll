const fs = require('fs');
const path = require('path');

const refinements = {
  1: { word: 'Abenteuerlust', translation: 'adventurous spirit', urdu: 'مہم جوئی کا جذبہ' },
  10: { word: 'Abteil', translation: 'compartment', urdu: 'ڈبہ / کمپارٹمنٹ' },
  13: { word: 'Alleinernährerin', translation: 'sole breadwinner', urdu: 'واحد کفیل (خاتون)' },
  15: { word: 'Alltagsprodukt', translation: 'everyday product', urdu: 'روزمرہ کی مصنوعات' },
  16: { word: 'Alltagssprache', translation: 'everyday language', urdu: 'روزمرہ کی زبان' },
  17: { word: 'Alltagsszene', translation: 'everyday scene', urdu: 'روزمرہ کا منظر' },
  18: { word: 'Alzheimer', translation: "Alzheimer's disease", urdu: 'الزائمر کی بیماری' },
  22: { word: 'Amtssprache', translation: 'official language', urdu: 'سرکاری زبان' },
  26: { word: 'Angebotserstellung', translation: 'quotation preparation', urdu: 'کوٹیشن تیار کرنا' },
  27: { word: 'Angel', translation: 'fishing rod / angel', urdu: 'فرشتہ / کانٹا (سیاق پر)' },
  35: { word: 'Anruferin', translation: 'female caller', urdu: 'خاتون کالر' },
  39: { word: 'Ansehen', translation: 'reputation / view', urdu: 'عزت / دیکھنا' },
  44: { word: 'Arbeitserlaubnis', translation: 'work permit', urdu: 'ورک پرمٹ / اجازت نامہ' },
  52: { word: 'Arbeitsvertrag', translation: 'employment contract', urdu: 'ملازمت کا معاہدہ' },
  56: { word: 'Ärztemangel', translation: 'shortage of doctors', urdu: 'ڈاکٹروں کی کمی' },
  60: { word: 'Atmosphäre', translation: 'atmosphere', urdu: 'فضا / ماحول' },
  70: { word: 'Aufgabenteilung', translation: 'division of tasks', urdu: 'کاموں کی تقسیم' },
  71: { word: 'Aufklärung', translation: 'enlightenment / clarification', urdu: 'وضاحت / روشن خیالی' },
  75: { word: 'Auftakt', translation: 'opening / kickoff', urdu: 'آغاز' },
  78: { word: 'Aufwand', translation: 'effort / expense', urdu: 'محنت / خرچ' },
  79: { word: 'Aufzählung', translation: 'enumeration', urdu: 'فہرست بندی' },
  80: { word: 'Ausarbeitung', translation: 'elaboration / preparation', urdu: 'تفصیلی تیاری' },
  85: { word: 'Ausgang', translation: 'exit', urdu: 'باہر نکلنے کا' }
};

const filepath = path.join(__dirname, 'src', 'data', 'b2-nouns-part1.ts');
let content = fs.readFileSync(filepath, 'utf-8');

const objectRegex = /\{\s*id:\s*(\d+)\s*,\s*word:\s*"([^"]+)",\s*plural:\s*"([^"]+)",\s*translation:\s*"([^"]+)",\s*urdu:\s*"([^"]+)",\s*category:\s*'([^']+)',\s*level:\s*'([^']+)'\s*\}/g;

let updatedContent = content.replace(objectRegex, (match, idStr, word, plural, translation, urdu, category, level) => {
  const id = parseInt(idStr, 10);
  const ref = refinements[id];
  
  if (!ref) {
    return match;
  }
  
  // Replace word, translation, urdu with refined ones. 
  // We keep the plural, category, level unchanged.
  return `{ id: ${id}, word: "${ref.word}", plural: "${plural}", translation: "${ref.translation}", urdu: "${ref.urdu}", category: '${category}', level: '${level}' }`;
});

fs.writeFileSync(filepath, updatedContent, 'utf-8');
console.log('Refined B2 nouns part 1');
