"use client";

import React, { useState } from "react";

const CATEGORIES = [
  "Nouns",
  "Adjectives",
  "Adverbs",
  "Regular Verbs",
  "Irregular Verbs",
  "Modal Verbs",
];

const CATEGORY_MAP: Record<string, string> = {
  "Nouns": "Nomen",
  "Adjectives": "Adjektive",
  "Adverbs": "Adverbien",
  "Regular Verbs": "Regelmäßige Verben",
  "Irregular Verbs": "Unregelmäßige Verben",
  "Modal Verbs": "Modalverben",
};

export default function VocabQuizView({ level = "A1" }: { level?: string }) {
  const [selectedCategory, setSelectedCategory] = useState("Nouns");

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-3 md:px-0">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6 pt-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-black drop-shadow-sm tracking-tight">
            Vokabular Quiz
          </h1>
        </div>
        
        {/* Controls: Quiz Selection Bar */}
        <div className="flex items-center gap-2 shrink-0 justify-end w-full md:w-auto">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border-2 border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2 md:py-2.5 font-bold cursor-pointer shadow-sm w-full md:w-auto"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {CATEGORY_MAP[cat]} Quiz
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Placeholder area for quiz content */}
      <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-gray-200 rounded-xl bg-white mt-4">
        <h2 className="text-2xl font-bold text-gray-500 mb-2">{CATEGORY_MAP[selectedCategory]} Quiz</h2>
        <p className="text-gray-400">Waiting for further instructions to build the quiz UI...</p>
      </div>
    </div>
  );
}
