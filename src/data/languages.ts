export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'pa', name: 'Punjabi (Shahmukhi)', nativeName: 'پنجابی' },
  { code: 'pa-IN', name: 'Punjabi (Gurmukhi)', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'ku', name: 'Kurdish', nativeName: 'Kurdî' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' }
];
