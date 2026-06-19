"use client";
import React, { useState } from "react";

interface Question {
  id: number;
  text: string;
  isTrue: boolean;
}

const QUIZ_QUESTIONS: Question[] = [
  { id: 1, text: "Maria kommt aus Portugal.", isTrue: true },
  { id: 2, text: "Die Person ist neu in der Schweiz.", isTrue: true },
  { id: 3, text: "Die Person schreibt eine kleine Liste.", isTrue: false },
  { id: 4, text: "Maria und Lisa trinken Tee zusammen.", isTrue: false },
  { id: 5, text: "Marias Hund heisst Müller.", isTrue: false },
  { id: 6, text: "Lisa hat eine Tochter.", isTrue: false },
  { id: 7, text: "Marias Eltern wohnen in Bern.", isTrue: false },
  { id: 8, text: "Pedro ist der Vater von Maria.", isTrue: false },
  { id: 9, text: "Maria wohnt in Zürich.", isTrue: false },
  { id: 10, text: "Maria ist eine Hausfrau.", isTrue: false },
];

export default function QuizTab() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  
  const handleAnswer = (answer: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  if (showResults) {
    const score = QUIZ_QUESTIONS.reduce((total, q) => {
      return total + (answers[q.id] === q.isTrue ? 1 : 0);
    }, 0);

    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100 min-h-[400px]">
        <div className="w-20 h-20 bg-[#ffe400] rounded-full flex items-center justify-center mb-6 shadow-sm">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="text-3xl font-bold text-black mb-2">Quiz Beendet!</h2>
        <p className="text-xl text-gray-700 mb-8">
          Ihr Ergebnis: <span className="font-bold text-[#0f7650]">{score}</span> von <span className="font-bold">{QUIZ_QUESTIONS.length}</span>
        </p>
        
        <div className="w-full max-w-2xl space-y-3 mb-8">
          {QUIZ_QUESTIONS.map(q => {
            const isCorrect = answers[q.id] === q.isTrue;
            return (
              <div key={q.id} className={`p-4 rounded-lg flex items-center justify-between border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <span className="text-black text-sm md:text-base font-medium">{q.text}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${isCorrect ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                    Ihre Antwort: {answers[q.id] ? 'Richtig' : 'Falsch'}
                  </span>
                  {!isCorrect && (
                    <span className="text-xs font-bold px-2 py-1 rounded text-gray-700 bg-gray-200">
                      Korrekt: {q.isTrue ? 'Richtig' : 'Falsch'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={resetQuiz}
          className="px-8 py-3 bg-[#0f7650] text-white font-bold rounded-xl hover:bg-[#0a5237] transition-all shadow-sm"
        >
          Nochmal spielen
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-[400px] max-w-3xl mx-auto pt-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Lektion-Quiz</h2>
        <p className="text-gray-500 font-medium">Quiz aus Geschichten</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="bg-gray-100 text-gray-700 font-bold px-4 py-1.5 rounded-lg text-sm">
          Frage {currentQuestionIndex + 1} von {QUIZ_QUESTIONS.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full mb-10 overflow-hidden">
        <div 
          className="h-full bg-[#0f7650] transition-all duration-300"
          style={{ width: `${((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-gray-50 border border-gray-200 p-8 md:p-12 rounded-2xl flex flex-col items-center justify-center mb-10 shadow-sm flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-center text-black leading-snug">
          {currentQuestion.text}
        </h3>
      </div>

      {/* True/False Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => handleAnswer(true)}
          className={`py-4 md:py-6 rounded-xl font-bold text-lg transition-all border-2 ${
            answers[currentQuestion.id] === true
              ? "bg-[#0f7650] text-white border-[#0f7650] shadow-md scale-[1.02]"
              : "bg-white text-[#0f7650] border-[#0f7650] hover:bg-green-50"
          }`}
        >
          Richtig
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className={`py-4 md:py-6 rounded-xl font-bold text-lg transition-all border-2 ${
            answers[currentQuestion.id] === false
              ? "bg-red-600 text-white border-red-600 shadow-md scale-[1.02]"
              : "bg-white text-red-600 border-red-600 hover:bg-red-50"
          }`}
        >
          Falsch
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-auto">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all border ${
            currentQuestionIndex === 0 
              ? 'opacity-0 pointer-events-none' 
              : 'bg-white text-black border-gray-200 hover:bg-gray-50 shadow-sm'
          }`}
        >
          Zurück
        </button>
        
        <button
          onClick={handleNext}
          disabled={answers[currentQuestion.id] === undefined}
          className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm ${
            answers[currentQuestion.id] === undefined 
              ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Ergebnis sehen' : 'Weiter'}
        </button>
      </div>
    </div>
  );
}
