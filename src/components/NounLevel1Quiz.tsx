"use client";
import React, { useState, useEffect } from 'react';
import { VOCABULARY } from '../data/vocabulary';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface NounLevel1QuizProps {
  onBack: (passed?: boolean) => void;
  selectedLangCode: string;
}

export default function NounLevel1Quiz({ onBack, selectedLangCode }: NounLevel1QuizProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswersList, setUserAnswersList] = useState<string[]>([]);

  // Helper to get native translation
  const getTranslationForOption = (item: any, langCode: string) => {
    if (langCode === 'ur' && item.urdu) return item.urdu;
    return item.translation;
  };

  const generateOptions = (correctItem: any, pool: any[]) => {
    const correctOption = getTranslationForOption(correctItem, selectedLangCode);
    const opts = new Set<string>();
    opts.add(correctOption);

    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    for (const item of shuffledPool) {
      if (opts.size >= 4) break;
      const opt = getTranslationForOption(item, selectedLangCode);
      if (opt !== correctOption) {
        opts.add(opt);
      }
    }

    return Array.from(opts).sort(() => 0.5 - Math.random());
  };

  const initializeQuiz = () => {
    const nouns = VOCABULARY.filter(item => item.category === "Nouns" || item.category === "Nomen");
    const shuffled = [...nouns].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setQuestions(selected);
    
    if (selected.length > 0) {
      setOptions(generateOptions(selected[0], nouns));
    }
    
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setQuizFinished(false);
    setUserAnswersList([]);
  };

  useEffect(() => {
    initializeQuiz();
  }, [selectedLangCode]);

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return; // Prevent multiple clicks

    const currentQ = questions[currentIndex];
    const correctOption = getTranslationForOption(currentQ, selectedLangCode);
    const correct = option === correctOption;
    
    setIsCorrect(correct);
    setSelectedOption(option);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    setUserAnswersList([...userAnswersList, option]);

    // Move to next question after delay
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        const nouns = VOCABULARY.filter(item => item.category === "Nouns" || item.category === "Nomen");
        setOptions(generateOptions(questions[currentIndex + 1], nouns));
      } else {
        setQuizFinished(true);
      }
    }, 1500);
  };

  if (questions.length === 0) {
    return <div>Lädt...</div>;
  }

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
          <button onClick={initializeQuiz} className="flex-1 px-6 py-4 bg-gray-100 text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-colors">
            Wiederholen
          </button>
          <button onClick={() => onBack(score >= 8)} className="flex-1 px-6 py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-800 transition-colors">
            Zurück zur Übersicht
          </button>
        </div>

        <div className="w-full text-left">
          <h3 className="text-2xl font-black text-black mb-6">Deine Antworten</h3>
          <div className="space-y-6">
            {questions.map((q, index) => {
              const ans = userAnswersList[index] || "";
              const correctAns = getTranslationForOption(q, selectedLangCode);
              const isAnsCorrect = ans === correctAns;
              
              return (
                <div key={q.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="font-bold text-gray-400 uppercase tracking-widest text-sm mb-4">Wort {index + 1}</div>
                  <div className="text-2xl font-black text-black mb-6">{q.word}</div>
                  <div className="space-y-2">
                    <div className="text-lg">
                      <span className="font-medium text-gray-500">Deine Antwort: </span>
                      <span className={`font-bold ${isAnsCorrect ? 'text-green-500' : 'text-red-500'}`}>{ans || "-"}</span>
                    </div>
                    {!isAnsCorrect && (
                      <div className="text-lg">
                        <span className="font-medium text-gray-500">Richtige Antwort: </span>
                        <span className="font-bold text-black">{correctAns}</span>
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

  const currentQ = questions[currentIndex];

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto pb-20 px-4 md:px-0 pt-8">
      <button onClick={() => onBack(false)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
        <span className="font-semibold">Zurück</span>
      </button>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-1">Level 1: Bedeutung erkennen</h3>
        <p className="text-lg font-medium text-gray-500 uppercase tracking-widest">
          German to {SUPPORTED_LANGUAGES.find(l => l.code === selectedLangCode)?.name || "Language"}
        </p>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-sm p-6 md:p-10 relative">
        <div className="flex flex-col justify-center items-center mb-10">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Frage {currentIndex + 1} von {questions.length}</span>
          <h2 className="text-5xl font-black text-black text-center">{currentQ.word}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((option, index) => {
            let btnClass = "bg-gray-50 border-gray-200 text-black hover:bg-gray-100";
            if (selectedOption) {
              const correctOption = getTranslationForOption(currentQ, selectedLangCode);
              if (option === correctOption) {
                btnClass = "bg-green-100 border-green-500 text-green-700";
              } else if (option === selectedOption && !isCorrect) {
                btnClass = "bg-red-100 border-red-500 text-red-700";
              } else {
                btnClass = "bg-gray-50 border-gray-100 text-gray-300"; // fade out others
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={selectedOption !== null}
                className={`p-6 border-2 rounded-xl text-lg font-bold text-center transition-all shadow-sm ${btnClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 h-8 flex justify-center items-center">
          {selectedOption && isCorrect && <span className="text-green-500 font-bold text-lg">Richtig!</span>}
          {selectedOption && !isCorrect && <span className="text-red-500 font-bold text-lg">Falsch!</span>}
        </div>
      </div>
    </div>
  );
}