"use client";
import React, { useState } from 'react';

interface Question {
  id: number;
  pronoun: string;
  english: string;
  answer: string;
}

const QUESTIONS: Question[] = [
  { id: 1, pronoun: 'ich', english: 'I', answer: 'habe' },
  { id: 2, pronoun: 'du', english: 'you', answer: 'hast' },
  { id: 3, pronoun: 'er', english: 'he', answer: 'hat' },
  { id: 4, pronoun: 'sie', english: 'she', answer: 'hat' },
  { id: 5, pronoun: 'es', english: 'it', answer: 'hat' },
  { id: 6, pronoun: 'wir', english: 'we', answer: 'haben' },
  { id: 7, pronoun: 'ihr', english: 'you (plural)', answer: 'habt' },
  { id: 8, pronoun: 'sie', english: 'they', answer: 'haben' },
  { id: 9, pronoun: 'Sie', english: 'you (formal)', answer: 'haben' },
  { id: 10, pronoun: 'ich', english: 'I (repeat)', answer: 'habe' },
];

export default function HabenLevel1Quiz({ onBack }: { onBack: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUESTIONS[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showFeedback) {
      // Move to next question
      if (currentIndex + 1 < QUESTIONS.length) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer("");
        setShowFeedback(false);
      } else {
        setQuizFinished(true);
      }
      return;
    }

    const correct = userAnswer.trim().toLowerCase() === currentQ.answer.toLowerCase();
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    setShowFeedback(true);
  };

  if (quizFinished) {
    const passed = score >= 8;
    return (
      <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto pt-16 px-4">
        <h2 className="text-3xl font-black mb-4">{passed ? "Glückwunsch!" : "Fast geschafft!"}</h2>
        <p className="text-xl mb-8">Du hast {score} von {QUESTIONS.length} richtig.</p>
        {passed ? (
          <div className="text-green-500 font-bold mb-8">You passed Level 1!</div>
        ) : (
          <div className="text-red-500 font-bold mb-8">You need at least 8 correct to pass.</div>
        )}
        <div className="flex gap-4">
          <button onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setUserAnswer("");
            setShowFeedback(false);
            setQuizFinished(false);
          }} className="px-6 py-3 bg-gray-200 text-black font-bold rounded-xl hover:bg-gray-300">
            Nochmal (Retry)
          </button>
          <button onClick={onBack} className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800">
            Zurück zum Menü
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto pb-20 px-4 md:px-0 pt-8">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        <span className="font-semibold">Zurück</span>
      </button>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-1">Level 1</h3>
        <h1 className="text-3xl font-black text-black">Personentabelle</h1>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-sm p-6 md:p-10 relative">
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Frage {currentIndex + 1} von {QUESTIONS.length}</span>
          <span className="text-sm font-bold text-black bg-gray-100 px-3 py-1 rounded-full">Correct answers: {score} / {QUESTIONS.length}</span>
        </div>

        <p className="text-lg font-medium text-gray-600 mb-6">Ergänze die richtige Verbform (Fill in the correct verb form):</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-4 text-3xl font-black text-black">
            <span>{currentQ.pronoun}</span>
            <span className="text-gray-300">({currentQ.english})</span>
          </div>

          <div>
            <input
              type="text"
              autoFocus
              disabled={showFeedback}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Deine Antwort (Your answer)"
              className={`w-full text-2xl font-bold p-4 border-2 rounded-xl focus:outline-none transition-colors ${
                showFeedback 
                  ? isCorrect 
                    ? "border-green-500 bg-green-50 text-green-700" 
                    : "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-200 focus:border-black"
              }`}
            />
          </div>

          {showFeedback && !isCorrect && (
            <div className="text-red-500 font-bold text-lg">
              Falsch! Die richtige Antwort ist: <span className="text-black">{currentQ.answer}</span>
            </div>
          )}
          {showFeedback && isCorrect && (
            <div className="text-green-500 font-bold text-lg">
              Richtig! (Correct!)
            </div>
          )}

          <button 
            type="submit"
            disabled={!userAnswer.trim() && !showFeedback}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              !userAnswer.trim() && !showFeedback
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg"
            }`}
          >
            {showFeedback ? "Weiter (Next)" : "Antworten (Answer)"}
          </button>
        </form>
      </div>
    </div>
  );
}
