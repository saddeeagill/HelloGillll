const fs = require('fs');
const path = require('path');

const refinements = {
  15: { word: 'bloß', translation: 'merely / only / just', urdu: 'صرف / محض' },
  16: { word: 'da', translation: 'there / since / because', urdu: 'وہاں / چونکہ' },
  17: { word: 'dabei', translation: 'thereby / in doing so / while doing', urdu: 'اس کے ساتھ / اسی دوران / کرتے ہوئے' },
  18: { word: 'dafür', translation: 'for it / in favor of / for that', urdu: 'اس کے حق میں / اس کے لیے' },
  19: { word: 'dagegen', translation: 'against it / on the other hand', urdu: 'اس کے خلاف / دوسری طرف' },
  22: { word: 'daneben', translation: 'beside / next to / besides', urdu: 'اس کے علاوہ / اس کے پاس' },
  28: { word: 'eben', translation: 'just / exactly / precisely', urdu: 'بالکل / ابھی / ٹھیک' },
  31: { word: 'eher', translation: 'rather / sooner', urdu: 'زیادہ تر / بہتر طور پر / نسبتاً' },
  32: { word: 'eigentlich', translation: 'actually / in fact', urdu: 'دراصل / حقیقت میں' },
  35: { word: 'erst', translation: 'only / not until', urdu: 'صرف / تب تک / ابھی نہیں' },
  36: { word: 'etwa', translation: 'about / approximately', urdu: 'تقریباً / شاید' },
  38: { word: 'extra', translation: 'specially / extra', urdu: 'خاص طور پر / اضافی طور پر' },
  45: { word: 'gerade', translation: 'just / exactly / straight', urdu: 'بالکل / سیدھا / ابھی' },
  49: { word: 'gleichfalls', translation: 'likewise / same to you', urdu: 'آپ کو بھی / اسی طرح' },
  52: { word: 'immer', translation: 'always', urdu: 'ہمیشہ / ہر وقت' },
  54: { word: 'inzwischen', translation: 'meanwhile / in the meantime', urdu: 'اس دوران / تب تک' },
  60: { word: 'mittlerweile', translation: 'meanwhile / by now', urdu: 'اب تک / اس دوران' },
  61: { word: 'nahezu', translation: 'nearly / almost', urdu: 'تقریباً / قریب قریب' },
  67: { word: 'noch', translation: 'still / yet / anymore (in questions)', urdu: 'ابھی / ابھی تک / بھی' },
  70: { word: 'nötigenfalls', translation: 'if necessary / if needed', urdu: 'ضرورت پڑنے پر / اگر ضروری ہو' },
  72: { word: 'nur', translation: 'only / just / merely', urdu: 'صرف / بس' },
  75: { word: 'ständig', translation: 'constantly / continuously', urdu: 'مسلسل / لگاتار' },
  80: { word: 'ungewiss', translation: 'uncertain / unsure', urdu: 'غیر یقینی / غیر واضح' },
  81: { word: 'vermehrt', translation: 'increasingly / more and more', urdu: 'بڑھتا ہوا / زیادہ ہوتا ہوا' },
  82: { word: 'vorüber', translation: 'over / passed / temporary', urdu: 'ختم / گزر گیا / عارضی' },
  83: { word: 'weiterhin', translation: 'furthermore / still / continued', urdu: 'مزید / جاری طور پر' },
  87: { word: 'zunehmend', translation: 'increasingly', urdu: 'تیزی سے بڑھتا ہوا / بڑھتا ہوا' },
  88: { word: 'zwischendurch', translation: 'in between / from time to time', urdu: 'درمیان میں / وقفے وقفے سے' }
};

const filepath = path.join(__dirname, 'src', 'data', 'b1-adverbs.ts');
let content = fs.readFileSync(filepath, 'utf-8');

const objectRegex = /\{\s*id:\s*(\d+)[^}]+\}/g;

let updatedContent = content.replace(objectRegex, (match, idStr) => {
  const id = parseInt(idStr, 10);
  const ref = refinements[id];
  if (!ref) return match; // Keep existing if no refinement
  
  return `{ id: ${id}, word: "${ref.word}", translation: "${ref.translation}", urdu: "${ref.urdu}", category: 'Adverbs', level: 'B1' }`;
});

fs.writeFileSync(filepath, updatedContent, 'utf-8');
console.log('Refined B1 adverbs');
