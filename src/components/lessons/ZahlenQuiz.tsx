"use client";
import React, { useState } from "react";

const STAGE1_QUESTIONS = [
  { id: 1, word: "elf", number: 11 },
  { id: 2, word: "siebenundzwanzig", number: 27 },
  { id: 3, word: "vierunddreissig", number: 34 },
  { id: 4, word: "neunundvierzig", number: 49 },
  { id: 5, word: "sechzig", number: 60 },
  { id: 6, word: "zweiundsiebzig", number: 72 },
  { id: 7, word: "achtundachtzig", number: 88 },
  { id: 8, word: "fünfundneunzig", number: 95 },
  { id: 9, word: "hundertzehn", number: 110 },
  { id: 10, word: "hundertdreissig", number: 130 },
];

const STAGE2_QUESTIONS = [
  { id: 11, word: "zwölf", number: 12 },
  { id: 12, word: "einundzwanzig", number: 21 },
  { id: 13, word: "fünfundvierzig", number: 45 },
  { id: 14, word: "sechsundfünfzig", number: 56 },
  { id: 15, word: "dreiundsechzig", number: 63 },
  { id: 16, word: "siebzig", number: 70 },
  { id: 17, word: "neunundachtzig", number: 89 },
  { id: 18, word: "achtundneunzig", number: 98 },
  { id: 19, word: "hundertfünfzehn", number: 115 },
  { id: 20, word: "hundertfünfundzwanzig", number: 125 },
];

export default function ZahlenQuiz() {
  const [currentStage, setCurrentStage] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const questions = currentStage === 1 ? STAGE1_QUESTIONS : STAGE2_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];

  const playAudio = (word: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    const isCorrect = parseInt(inputValue, 10) === currentQuestion.number;
    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }

    setTimeout(() => {
      setFeedback(null);
      setInputValue("");
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else if (currentStage === 1) {
        setCurrentStage(2);
        setCurrentQuestionIndex(0);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentStage(1);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setInputValue("");
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100 min-h-[400px]">
        <div className="w-20 h-20 bg-[#ffe400] rounded-full flex items-center justify-center mb-6 shadow-sm">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="text-3xl font-bold text-black mb-2">Zahlenquiz Beendet!</h2>
        <p className="text-xl text-gray-700 mb-8">
          Ihre Punktzahl: <span className="font-bold text-[#0f7650]">{score}</span> von <span className="font-bold">20</span>
        </p>
        <button
          onClick={resetQuiz}
          className="px-8 py-3 bg-[#0f7650] text-white font-bold rounded-xl hover:bg-[#0a5237] transition-all shadow-sm"
        >
          Nochmal spielen
        </button>
      </div>
    );
  }

  const totalIndex = currentStage === 1 ? currentQuestionIndex : currentQuestionIndex + 10;

  return (
    <div className="flex flex-col h-full min-h-[400px] max-w-3xl mx-auto pt-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black mb-2">Zahlenquiz</h2>
        <p className="text-gray-500 font-medium">Üben Sie die deutschen Zahlen von 11 bis 130</p>
        <div className="mt-4 p-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-700">
          <p className="font-bold mb-1">Anleitung:</p>
          <p>Stufe 1: Lesen Sie die deutsche Zahl und geben Sie die Nummer ein</p>
          <p>Stufe 2: Hören Sie die Zahl und geben Sie die Nummer ein</p>
          <p>Insgesamt 20 Fragen (10 pro Stufe)</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="bg-gray-100 text-gray-700 font-bold px-4 py-1.5 rounded-lg text-sm">
          Stufe {currentStage}: {currentStage === 1 ? "Zahlen lesen" : "Zahlen hören"}
        </span>
        <span className="bg-gray-100 text-gray-700 font-bold px-4 py-1.5 rounded-lg text-sm">
          Frage {totalIndex + 1} von 20
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-[#0f7650] transition-all duration-300"
          style={{ width: `${(totalIndex / 20) * 100}%` }}
        ></div>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-8 md:p-12 rounded-2xl flex flex-col items-center justify-center mb-8 shadow-sm flex-grow">
        <p className="text-gray-500 mb-6 font-medium text-center">
          {currentStage === 1 ? "Schreiben Sie diese Zahl als Nummer:" : "Hören Sie die Zahl und schreiben Sie sie als Nummer:"}
        </p>
        
        {currentStage === 1 ? (
          <h3 className="text-3xl md:text-4xl font-bold text-center text-[#0f7650] leading-snug tracking-tight mb-8">
            {currentQuestion.word}
          </h3>
        ) : (
          <button
            onClick={() => playAudio(currentQuestion.word)}
            className="w-20 h-20 rounded-full bg-[#0f7650] text-white flex items-center justify-center hover:bg-[#0a5237] transition-all shadow-md mb-8 hover:scale-105 active:scale-95"
            title="Zahl hören"
          >
            <svg className="w-8 h-8 ml-1" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          </button>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center">
          <label className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
            Ihre Antwort (nur Ziffern):
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={feedback !== null}
            placeholder="z.B. 27"
            className={`w-full text-center text-2xl p-4 border-2 rounded-xl focus:outline-none transition-colors shadow-sm ${
              feedback === "correct" 
                ? "bg-green-50 border-green-500 text-green-700" 
                : feedback === "incorrect"
                ? "bg-red-50 border-red-500 text-red-700"
                : "bg-white border-gray-300 focus:border-[#0f7650]"
            }`}
            autoFocus
          />
          
          {feedback === "correct" && (
            <p className="text-green-600 font-bold mt-4 flex items-center gap-2">
              <span>✅</span> Richtig!
            </p>
          )}
          {feedback === "incorrect" && (
            <p className="text-red-600 font-bold mt-4 flex items-center gap-2">
              <span>❌</span> Falsch, es war {currentQuestion.number}
            </p>
          )}

          <button
            type="submit"
            disabled={!inputValue || feedback !== null}
            className={`mt-6 px-8 py-3 w-full rounded-xl font-bold transition-all shadow-sm ${
              !inputValue || feedback !== null
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Antworten
          </button>
        </form>
      </div>
      
      <div className="flex justify-between items-center text-sm font-bold text-gray-500 px-2">
        <span>Aktuelle Punktzahl: <span className="text-[#0f7650] text-base">{score}</span></span>
      </div>
    </div>
  );
}
