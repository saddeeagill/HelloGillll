"use client";
import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
  answer: string;
}

const QUESTIONS: Question[] = [
  { id: 1, text: 'I have', answer: 'ich habe' },
  { id: 2, text: 'You have (informal)', answer: 'du hast' },
  { id: 3, text: 'He has', answer: 'er hat' },
  { id: 4, text: 'She has', answer: 'sie hat' },
  { id: 5, text: 'It has', answer: 'es hat' },
  { id: 6, text: 'We have', answer: 'wir haben' },
  { id: 7, text: 'You have (formal)', answer: 'Sie haben' },
  { id: 8, text: 'They have', answer: 'sie haben' },
  { id: 9, text: 'You all have', answer: 'ihr habt' },
  { id: 10, text: 'One has', answer: 'man hat' },
];

export default function HabenLevel5Quiz({ onBack }: { onBack: (passed?: boolean) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [userAnswersList, setUserAnswersList] = useState<string[]>([]);
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
    
    // Save answer
    setUserAnswersList([...userAnswersList, userAnswer]);
    
    setShowFeedback(true);
  };

  const handleRepeat = () => {
    setCurrentIndex(0);
    setScore(0);
    setUserAnswer("");
    setUserAnswersList([]);
    setShowFeedback(false);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const passed = score >= 8;
    const percent = Math.round((score / QUESTIONS.length) * 100);
    
    return (
      <div className="flex flex-col items-center justify-center h-full w-full max-w-3xl mx-auto pt-16 px-4 pb-20">
        <h2 className="text-4xl font-black text-black mb-2">{passed ? "Super!" : "Versuch es nochmal!"}</h2>
        <p className="text-lg font-bold text-gray-500 mb-10">{passed ? "Du hast bestanden!" : "Du brauchst mindestens 80%"}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Ergebnis</span>
            <span className="text-3xl font-black text-black">{score} / {QUESTIONS.length}</span>
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

        <div className="w-full text-left">
          <h3 className="text-2xl font-black text-black mb-6">Deine Antworten</h3>
          <div className="space-y-6">
            {QUESTIONS.map((q, index) => {
              const ans = userAnswersList[index] || "";
              const isAnsCorrect = ans.trim().toLowerCase() === q.answer.toLowerCase();
              return (
                <div key={q.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="font-bold text-gray-400 uppercase tracking-widest text-sm mb-4">Frage {index + 1}</div>
                  <div className="text-2xl font-black text-black mb-6">{q.text} ______</div>
                  <div className="space-y-2">
                    <div className="text-lg">
                      <span className="font-medium text-gray-500">Deine Antwort: </span>
                      <span className={`font-bold ${isAnsCorrect ? 'text-green-500' : 'text-red-500'}`}>{ans || "-"}</span>
                    </div>
                    {!isAnsCorrect && (
                      <div className="text-lg">
                        <span className="font-medium text-gray-500">Richtige Antwort: </span>
                        <span className="font-bold text-black">{q.answer}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto pb-20 px-4 md:px-0 pt-8">
      <button onClick={() => onBack(false)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
        <span className="font-semibold">Zurück</span>
      </button>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-1">Level 5</h3>
        <p className="text-lg font-medium text-gray-500">Ãœbersetzung Muttersprache â†’ Deutsch</p>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-sm p-6 md:p-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Frage {currentIndex + 1} von {QUESTIONS.length}</span>
          <span className="text-sm font-bold text-black bg-gray-100 px-4 py-2 rounded-full">Richtige Antworten: {score} / {QUESTIONS.length}</span>
        </div>

        <p className="text-xl font-bold text-black mb-8">Ãœbersetze ins Deutsche:</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-4 text-4xl font-black text-black">
            <span>{currentQ.text} ______</span>
          </div>

          <div className="mt-2">
            <p className="text-sm font-bold text-gray-500 mb-2">Wähle deine Muttersprache:</p>
            <div className="bg-gray-100 border-2 border-gray-200 px-4 py-3 rounded-xl inline-block text-black font-bold">
              Englisch
            </div>
          </div>

          <div>
            <input
              type="text"
              autoFocus
              disabled={showFeedback}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Deine Antwort"
              className={`w-full text-2xl font-bold p-6 border-2 rounded-2xl focus:outline-none transition-colors ${
                showFeedback 
                  ? isCorrect 
                    ? "border-green-500 bg-green-50 text-green-700" 
                    : "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-200 focus:border-black"
              }`}
            />
          </div>

          {showFeedback && !isCorrect && (
            <div className="text-red-500 font-bold text-lg px-2">
              Richtige Antwort: <span className="text-black">{currentQ.answer}</span>
            </div>
          )}
          {showFeedback && isCorrect && (
            <div className="text-green-500 font-bold text-lg px-2">
              Richtig!
            </div>
          )}

          <button 
            type="submit"
            disabled={!userAnswer.trim() && !showFeedback}
            className={`w-full py-5 rounded-2xl font-bold text-xl transition-all ${
              !userAnswer.trim() && !showFeedback
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg"
            }`}
          >
            {showFeedback ? "Weiter" : "Antworten"}
          </button>
        </form>
      </div>
    </div>
  );
}