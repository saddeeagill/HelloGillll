import { 
  LESSON_1, LESSON_2, LESSON_3, LESSON_4, 
  LESSON_5, LESSON_6, LESSON_7, LESSON_8, 
  LESSON_9, LESSON_10, LESSON_11, LESSON_12, 
  LESSON_13, LESSON_14, LESSON_15, LESSON_16 
} from './lessons';
import * as fs from 'fs';

const lessons = [
  LESSON_1, LESSON_2, LESSON_3, LESSON_4,
  LESSON_5, LESSON_6, LESSON_7, LESSON_8,
  LESSON_9, LESSON_10, LESSON_11, LESSON_12,
  LESSON_13, LESSON_14, LESSON_15, LESSON_16
];

const results: Record<string, string[]> = {};

lessons.forEach(lesson => {
  if (!lesson) return;
  const missingNouns = new Set<string>();
  
  lesson.topics.forEach(topic => {
    const matches = topic.content.match(/\*\*(.*?)\*\*/g) || [];
    const highlightedWords = matches.map(m => m.slice(2, -2).trim());
    
    highlightedWords.forEach(word => {
      const wLower = word.toLowerCase();
      // Check if this word exists in nomenList
      const found = lesson.nomenList?.find(n => 
        n.singular.toLowerCase() === wLower || 
        n.plural.toLowerCase() === wLower
      );
      
      if (!found) {
        missingNouns.add(word);
      }
    });
  });
  
  if (missingNouns.size > 0) {
    results[lesson.id] = Array.from(missingNouns);
  }
});

console.log(JSON.stringify(results, null, 2));
