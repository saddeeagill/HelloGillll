"use client";
import React, { useState } from 'react';

interface Question {
  id: number;
  part1: string;
  part2: string;
  part3: string;
  answer1: string;
  answer2: string;
}

const QUESTIONS: Question[] = [
  { id: 1, part1: 'Frauen', part2: 'Auto und es', part3: 'gut.', answer1: 'haben', answer2: 'ist' },
  { id: 2, part1: 'Männer', part2: 'zu Hause und sie', part3: 'Pizza.', answer1: 'sind', answer2: 'haben' },
  { id: 3, part1: 'Kinder', part2: 'im Park und sie', part3: 'Spass.', answer1: 'sind', answer2: 'haben' },
  { id: 4, part1: 'Die Lehrer', part2: 'in der Schule und sie', part3: 'Bücher.', answer1: 'sind', answer2: 'haben' },
  { id: 5, part1: 'Haus', part2: 'alt, aber Garten', part3: 'Blumen.', answer1: 'ist', answer2: 'hat' },
  { id: 6, part1: 'Freunde', part2: 'in der Stadt und sie', part3: 'Hunger.', answer1: 'sind', answer2: 'haben' },
  { id: 7, part1: 'Zug', part2: 'voll, aber du', part3: 'Brot.', answer1: 'ist', answer2: 'hast' },
  { id: 8, part1: 'Kind', part2: 'gesund und es', part3: 'Apfel.', answer1: 'ist', answer2: 'hat' },
  { id: 9, part1: 'Katzen', part2: 'im Bett und Hunde', part3: 'Milch.', answer1: 'sind', answer2: 'haben' },
  { id: 10, part1: 'Leute', part2: 'Ã„pfel und sie', part3: 'sauber.', answer1: 'haben', answer2: 'sind' },
];

export default function NounLevel5Quiz({ onBack }: { onBack: (passed?: boolean) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer1, setUserAnswer1] = useState("");
  const [userAnswer2, setUserAnswer2] = useState("");
  const [userAnswersList, setUserAnswersList] = useState<{ans1: string, ans2: string}[]>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUESTIONS[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showFeedback) {
      if (currentIndex + 1 < QUESTIONS.length) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer1("");
        setUserAnswer2("");
        setShowFeedback(false);
      } else {
        setQuizFinished(true);
      }
      return;
    }

    const correct1 = userAnswer1.trim().toLowerCase() === currentQ.answer1.toLowerCase();
    const correct2 = userAnswer2.trim().toLowerCase() === currentQ.answer2.toLowerCase();
    const allCorrect = correct1 && correct2;
    
    setIsCorrect(allCorrect);
    if (allCorrect) setScore(score + 1);
    
    setUserAnswersList([...userAnswersList, { ans1: userAnswer1, ans2: userAnswer2 }]);
    setShowFeedback(true);
  };

  const handleRepeat = () => {
    setCurrentIndex(0);
    setScore(0);
    setUserAnswer1("");
    setUserAnswer2("");
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
              const ans = userAnswersList[index] || { ans1: "", ans2: "" };
              const isAns1Correct = ans.ans1.trim().toLowerCase() === q.answer1.toLowerCase();
              const isAns2Correct = ans.ans2.trim().toLowerCase() === q.answer2.toLowerCase();
              const allCorrect = isAns1Correct && isAns2Correct;
              
              return (
                <div key={q.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="font-bold text-gray-400 uppercase tracking-widest text-sm mb-4">Frage {index + 1}</div>
                  <div className="text-2xl font-black text-black mb-6 flex flex-wrap gap-2 items-center">
                    <span>{q.part1}</span>
                    <span className={`px-2 underline decoration-4 ${isAns1Correct ? 'decoration-green-500 text-green-600' : 'decoration-red-500 text-red-600'}`}>
                      {ans.ans1 || "___"}
                    </span>
                    <span>{q.part2}</span>
                    <span className={`px-2 underline decoration-4 ${isAns2Correct ? 'decoration-green-500 text-green-600' : 'decoration-red-500 text-red-600'}`}>
                      {ans.ans2 || "___"}
                    </span>
                    <span>{q.part3}</span>
                  </div>
                  
                  {!allCorrect && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl space-y-2">
                      <div className="text-lg">
                        <span className="font-medium text-gray-500">Richtige Lösung: </span>
                        <div className="font-bold text-black mt-1">
                          {q.part1} <span className="text-green-600">{q.answer1}</span> {q.part2} <span className="text-green-600">{q.answer2}</span> {q.part3}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-4 md:px-0 pt-8">
      <button onClick={() => onBack(false)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
        <span className="font-semibold">Zurück</span>
      </button>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-1">Level 5</h3>
        <p className="text-lg font-medium text-gray-500">Alltag mit Situationen & kleinen Sätzen</p>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-sm p-6 md:p-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Frage {currentIndex + 1} von {QUESTIONS.length}</span>
          <span className="text-sm font-bold text-black bg-gray-100 px-4 py-2 rounded-full">Richtige Antworten: {score} / {QUESTIONS.length}</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-12">
          <div className="flex items-center gap-4 text-3xl md:text-4xl font-black text-black flex-wrap justify-center text-center">
            <span>{currentQ.part1}</span>
            <div className="w-32 md:w-40">
              <input
                type="text"
                autoFocus
                disabled={showFeedback}
                value={userAnswer1}
                onChange={(e) => setUserAnswer1(e.target.value)}
                className={`w-full text-center text-2xl md:text-3xl font-bold p-2 md:p-4 border-b-4 focus:outline-none bg-transparent transition-colors ${
                  showFeedback 
                    ? userAnswer1.trim().toLowerCase() === currentQ.answer1.toLowerCase()
                      ? "border-green-500 text-green-600" 
                      : "border-red-500 text-red-600"
                    : "border-gray-300 focus:border-black"
                }`}
              />
            </div>
            <span>{currentQ.part2}</span>
            <div className="w-32 md:w-40">
              <input
                type="text"
                disabled={showFeedback}
                value={userAnswer2}
                onChange={(e) => setUserAnswer2(e.target.value)}
                className={`w-full text-center text-2xl md:text-3xl font-bold p-2 md:p-4 border-b-4 focus:outline-none bg-transparent transition-colors ${
                  showFeedback 
                    ? userAnswer2.trim().toLowerCase() === currentQ.answer2.toLowerCase()
                      ? "border-green-500 text-green-600" 
                      : "border-red-500 text-red-600"
                    : "border-gray-300 focus:border-black"
                }`}
              />
            </div>
            <span>{currentQ.part3}</span>
          </div>

          <div className="mt-8">
            {showFeedback && !isCorrect && (
              <div className="text-red-500 font-bold text-lg px-2 mb-4 text-center">
                Richtige Lösung: <br/>
                <span className="text-black text-xl mt-2 block">
                  {currentQ.part1} <span className="text-green-600">{currentQ.answer1}</span> {currentQ.part2} <span className="text-green-600">{currentQ.answer2}</span> {currentQ.part3}
                </span>
              </div>
            )}
            {showFeedback && isCorrect && (
              <div className="text-green-500 font-bold text-lg px-2 mb-4 text-center">
                Richtig!
              </div>
            )}

            <button 
              type="submit"
              disabled={(!userAnswer1.trim() || !userAnswer2.trim()) && !showFeedback}
              className={`w-full py-5 rounded-2xl font-bold text-xl transition-all mt-4 ${
                (!userAnswer1.trim() || !userAnswer2.trim()) && !showFeedback
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg"
              }`}
            >
              {showFeedback 
                ? currentIndex + 1 < QUESTIONS.length ? "Weiter" : "Level abschließen" 
                : "Weiter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}