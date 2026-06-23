"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lessons_1 = require("./lessons");
var lessons = [
    lessons_1.LESSON_1, lessons_1.LESSON_2, lessons_1.LESSON_3, lessons_1.LESSON_4,
    lessons_1.LESSON_5, lessons_1.LESSON_6, lessons_1.LESSON_7, lessons_1.LESSON_8,
    lessons_1.LESSON_9, lessons_1.LESSON_10, lessons_1.LESSON_11, lessons_1.LESSON_12,
    lessons_1.LESSON_13, lessons_1.LESSON_14, lessons_1.LESSON_15, lessons_1.LESSON_16
];
var results = {};
lessons.forEach(function (lesson) {
    if (!lesson)
        return;
    var missingNouns = new Set();
    lesson.topics.forEach(function (topic) {
        var matches = topic.content.match(/\*\*(.*?)\*\*/g) || [];
        var highlightedWords = matches.map(function (m) { return m.slice(2, -2).trim(); });
        highlightedWords.forEach(function (word) {
            var _a;
            var wLower = word.toLowerCase();
            // Check if this word exists in nomenList
            var found = (_a = lesson.nomenList) === null || _a === void 0 ? void 0 : _a.find(function (n) {
                return n.singular.toLowerCase() === wLower ||
                    n.plural.toLowerCase() === wLower;
            });
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
