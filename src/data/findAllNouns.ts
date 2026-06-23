import { 
  LESSON_1, LESSON_2, LESSON_3, LESSON_4, 
  LESSON_5, LESSON_6, LESSON_7, LESSON_8, 
  LESSON_9, LESSON_10, LESSON_11, LESSON_12, 
  LESSON_13, LESSON_14, LESSON_15, LESSON_16 
} from './lessons';

const lessons = [
  LESSON_1, LESSON_2, LESSON_3, LESSON_4,
  LESSON_5, LESSON_6, LESSON_7, LESSON_8,
  LESSON_9, LESSON_10, LESSON_11, LESSON_12,
  LESSON_13, LESSON_14, LESSON_15, LESSON_16
];

const results: Record<string, string[]> = {};

lessons.forEach(lesson => {
  if (!lesson) return;
  const allNouns = new Set<string>();
  
  lesson.topics.forEach(topic => {
    const matches = topic.content.match(/\*\*(.*?)\*\*/g) || [];
    const highlightedWords = matches.map(m => m.slice(2, -2).trim());
    highlightedWords.forEach(word => allNouns.add(word));
  });
  
  if (allNouns.size > 0) {
    results[lesson.title] = Array.from(allNouns);
  }
});

console.log(JSON.stringify(results, null, 2));
