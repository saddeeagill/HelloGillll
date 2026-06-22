"use client";
import React, { useState, useEffect, useRef } from 'react';
import { VOCABULARY } from '../data/vocabulary';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface NounLevel3QuizProps {
  onBack: (passed?: boolean) => void;
  selectedLangCode: string;
}

export default function NounLevel3Quiz({ onBack, selectedLangCode }: NounLevel3QuizProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswersList, setUserAnswersList] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const getTranslationForOption = (item: any, langCode: string) => {
    if (langCode === 'ur' && item.urdu) return item.urdu;
    return item.translation;
  };

  const getLanguageName = () => {
    return SUPPORTED_LANGUAGES.find(l => l.code === selectedLangCode)?.name || "Language";
  };

  const initializeQuiz = () => {
    // Only pick nouns that have a defined 'plural' field that is not empty
    const nouns = VOCABULARY.filter(item => 
      (item.category === "Nouns" || item.category === "Nomen") && 
      item.plural && item.plural.trim() !== "" && item.plural !== "-"
    );
    const shuffled = [...nouns].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setQuestions(selected);
    
    setCurrentIndex(0);
    setScore(0);
    setUserAnswer("");
    setIsCorrect(null);
    setShowFeedback(false);
    setQuizFinished(false);
    setUserAnswersList([]);
  };

  useEffect(() => {
    initializeQuiz();
  }, [selectedLangCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showFeedback) {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setUserAnswer("");
        setIsCorrect(null);
        setShowFeedback(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        setQuizFinished(true);
      }
      return;
    }

    if (!userAnswer.trim()) return;

    const currentQ = questions[currentIndex];
    
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentQ.plural.trim().toLowerCase();
    
    const correct = normalizedUserAnswer === normalizedCorrectAnswer || 
                    normalizedCorrectAnswer.includes(normalizedUserAnswer) && normalizedUserAnswer.length > 3;

    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    setUserAnswersList([...userAnswersList, userAnswer]);
  };

  if (questions.length === 0) {
    return <div>Lädt... (Keine Nomen mit Plural gefunden)</div>;
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
              const normalizedAns = ans.trim().toLowerCase();
              const normalizedCorrect = q.plural.trim().toLowerCase();
              const isAnsCorrect = normalizedAns === normalizedCorrect || (normalizedCorrect.includes(normalizedAns) && normalizedAns.length > 3);
              
              return (
                <div key={q.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="font-bold text-gray-400 uppercase tracking-widest text-sm mb-4">Wort {index + 1}</div>
                  <div className="text-2xl font-black text-black mb-6">{getTranslationForOption(q, selectedLangCode)} (Singular: {q.word})</div>
                  <div className="space-y-2">
                    <div className="text-lg">
                      <span className="font-medium text-gray-500">Deine Antwort: </span>
                      <span className={`font-bold ${isAnsCorrect ? 'text-green-500' : 'text-red-500'}`}>{ans || "-"}</span>
                    </div>
                    {!isAnsCorrect && (
                      <div className="text-lg">
                        <span className="font-medium text-gray-500">Richtige Pluralform: </span>
                        <span className="font-bold text-black">{q.plural}</span>
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

      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-black mb-1">Level 3: Plural bilden</h3>
          <p className="text-lg font-medium text-gray-500 uppercase tracking-widest">
            Level 3: Singular ↔ Plural
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Punkte</p>
          <p className="text-2xl font-black text-black">{score * 10}</p>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-3xl shadow-sm p-8 md:p-12 relative">
        <div className="flex justify-between items-center mb-10">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-xl">
            Frage {currentIndex + 1} von {questions.length}
          </span>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl flex items-center gap-2">
            <span>🏳️</span> {getLanguageName()}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-black text-black mb-2">{getTranslationForOption(currentQ, selectedLangCode)}</h2>
            <p className="text-xl font-bold text-gray-400 mb-8">(Singular: {currentQ.word})</p>
            
            <div className="w-full max-w-md mx-auto relative">
              <label className="block text-left text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                Write the plural form:
              </label>
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={showFeedback}
                autoFocus
                placeholder="Plural.."
                className={`w-full p-6 text-2xl font-bold rounded-2xl border-2 transition-all outline-none ${
                  showFeedback 
                    ? isCorrect 
                      ? "border-green-500 bg-green-50 text-green-700" 
                      : "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-gray-50 focus:border-black focus:bg-white"
                }`}
              />
              
              {showFeedback && !isCorrect && (
                <div className="mt-6 p-4 bg-red-50 border-2 border-red-100 rounded-xl text-left">
                  <span className="block text-sm font-bold text-red-400 uppercase tracking-widest mb-1">Richtige Antwort</span>
                  <span className="text-2xl font-black text-red-600">{currentQ.plural}</span>
                </div>
              )}
              {showFeedback && isCorrect && (
                <div className="mt-6 p-4 bg-green-50 border-2 border-green-100 rounded-xl text-center">
                  <span className="text-2xl font-black text-green-600">Richtig!</span>
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit"
            disabled={!userAnswer.trim() && !showFeedback}
            className={`w-full max-w-md mx-auto py-5 rounded-2xl font-bold text-xl transition-all shadow-sm ${
              !userAnswer.trim() && !showFeedback
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : showFeedback
                  ? "bg-black text-white hover:bg-gray-800 hover:shadow-md"
                  : "bg-black text-white hover:bg-gray-800 hover:shadow-md"
            }`}
          >
            {showFeedback 
              ? currentIndex + 1 < questions.length ? "Nächste Frage ➔" : "Level abschließen" 
              : "Überprüfen"}
          </button>
        </form>
      </div>
    </div>
  );
}