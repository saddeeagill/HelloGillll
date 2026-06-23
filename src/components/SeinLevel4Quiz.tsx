
"use client";
import React, { useState, useEffect } from 'react';

interface Question {
  id: string;
  text: string;
  answer: string[];
}

const POOL: Omit<Question, 'id'>[] = [
  { text: '______ sind', answer: ['wir', 'sie', 'Sie'] },
  { text: '______ bin', answer: ['ich'] },
  { text: '______ ist', answer: ['er', 'sie', 'es', 'man'] },
  { text: '______ bist', answer: ['du'] },
  { text: '______ seid', answer: ['ihr'] },
  { text: '______ sind', answer: ['wir', 'sie', 'Sie'] },
  { text: '______ ist', answer: ['er', 'sie', 'es', 'man'] },
  { text: '______ sind', answer: ['wir', 'sie', 'Sie'] },
  { text: '______ ist', answer: ['er', 'sie', 'es', 'man'] },
  { text: '______ ist', answer: ['er', 'sie', 'es', 'man'] },
];

function generateQuestions(): Question[] {
  const shuffled = [...POOL].sort(() => 0.5 - Math.random());
  return shuffled.map((q, i) => ({
    id: `q_${i}_${Date.now()}`,
    text: q.text,
    answer: q.answer
  }));
}

export default function SeinLevel4Quiz({ onBack }: { onBack: (passed?: boolean) => void }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const userInput = userAnswer.trim().toLowerCase();
    const correct = currentQ.answer.some(ans => ans.toLowerCase() === userInput);
    
    if (correct) setScore(s => s + 1);
    
    // Instant auto-advance
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
    } else {
      setQuizFinished(true);
    }
  };

  const handleRepeat = () => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setScore(0);
    setUserAnswer("");
    setQuizFinished(false);
  };

  if (quizFinished) {
    const passed = score >= 8;
    const percent = Math.round((score / questions.length) * 100);
    
    return (
      <div className="flex flex-col items-center justify-center h-full w-full max-w-3xl mx-auto pt-16 px-4 pb-20">
        <h2 className="text-4xl font-black text-black mb-2">{passed ? "Super!" : "Versuch es nochmal!"}</h2>
        <p className="text-lg font-bold text-gray-500 mb-10">{passed ? "Du hast bestanden!" : "Du brauchst mindestens 80%"}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Ergebnis</span>
            <span className="text-3xl font-black text-black">{score} / {questions.length}</span>
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Prozent</span>
            <span className="text-3xl font-black text-black">{percent} %</span>
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Punkte</span>
            <span className="text-3xl font-black text-green-500">+ {score * 10}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mx-auto mb-16">
          <button onClick={handleRepeat} className="flex-1 px-6 py-4 bg-gray-100 text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-colors">
            Wiederholen
          </button>
          <button onClick={() => onBack(score >= 8)} className="flex-1 px-6 py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-800 transition-colors">
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto pb-20 px-4 md:px-0 pt-8">
      <button onClick={() => onBack(false)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        <span className="font-semibold">Zurück</span>
      </button>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-1">Level 4: Gemischte Konjugation</h3>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-sm p-6 md:p-10 relative">
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Frage {currentIndex + 1} von {questions.length}</span>
          <span className="text-sm font-bold text-black bg-gray-100 px-3 py-1 rounded-full">Level: 4</span>
        </div>

        <p className="text-lg font-medium text-gray-600 mb-6">Welche Person passt?</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-4 text-3xl font-black text-black">
            <span>{currentQ.text}</span>
          </div>

          <div>
            <input
              type="text"
              autoFocus
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Deine Antwort"
              className="w-full text-2xl font-bold p-4 border-2 rounded-xl focus:outline-none transition-colors border-gray-200 focus:border-black"
            />
          </div>

          <button 
            type="submit"
            disabled={!userAnswer.trim()}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              !userAnswer.trim()
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg"
            }`}
          >
            Antworten
          </button>
        </form>
      </div>
    </div>
  );
}
