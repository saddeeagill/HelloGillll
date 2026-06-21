export interface VocabItem {
  id: number;
  word: string;
  translation: string;
  category: string;
  level: string;
  article?: string;
  plural?: string;
  principalParts?: string;
  conjugation?: string;
  urdu?: string;
}
