"use client";
import React, { useState, useEffect } from 'react';
import { translateText } from '@/utils/translate';

interface Question {
  id: string;
  enWord: string;
  acceptedGerman: string[];
}

const POOL: Question[] = [
  { id: '1', enWord: "ticket", acceptedGerman: ["Ticket", "Fahrkarte", "Karte", "Eintrittskarte"] },
  { id: '2', enWord: "printer", acceptedGerman: ["Drucker"] },
  { id: '3', enWord: "rice", acceptedGerman: ["Reis"] },
  { id: '4', enWord: "bank", acceptedGerman: ["Bank"] },
  { id: '5', enWord: "lady", acceptedGerman: ["Frau", "Dame"] },
  { id: '6', enWord: "stove", acceptedGerman: ["Herd", "Ofen"] },
  { id: '7', enWord: "August", acceptedGerman: ["August"] },
  { id: '8', enWord: "mouth", acceptedGerman: ["Mund"] },
  { id: '9', enWord: "baby", acceptedGerman: ["Baby", "Säugling"] },
  { id: '10', enWord: "stop", acceptedGerman: ["Haltestelle", "Station"] }
];

interface VocabNounLevel2QuizProps {
  onBack: (passed?: boolean) => void;
  selectedLangCode: string;
}

export default function VocabNounLevel2Quiz({ onBack, selectedLangCode }: VocabNounLevel2QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Translation state
  const [translatedQuestion, setTranslatedQuestion] = useState<string>("");
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(true);

  // Interaction state
  const [userInput, setUserInput] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  // Review state
  const [userAnswersList, setUserAnswersList] = useState<{user: string, correct: string, isCorrect: boolean}[]>([]);

  const initializeQuiz = () => {
    const shuffled = [...POOL].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setQuizFinished(false);
    setUserAnswersList([]);
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setUserInput("");
    setIsCorrect(null);
    setShowFeedback(false);
    setShowHint(false);
  };

  useEffect(() => {
    initializeQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLangCode]);

  useEffect(() => {
    let isMounted = true;
    
    if (questions.length === 0 || quizFinished) return;
    
    const fetchTranslations = async () => {
      setIsLoadingTranslations(true);
      const currentQ = questions[currentIndex];
      
      try {
        const translatedWord = await translateText(currentQ.enWord, selectedLangCode);

        if (isMounted) {
          setTranslatedQuestion(translatedWord);
          setIsLoadingTranslations(false);
        }
      } catch (error) {
        console.error("Translation error:", error);
        if (isMounted) setIsLoadingTranslations(false);
      }
    };

    fetchTranslations();

    return () => { isMounted = false; };
  }, [currentIndex, questions, selectedLangCode, quizFinished]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showFeedback || !userInput.trim()) return;
    
    const currentQ = questions[currentIndex];
    
    // Check if input matches any of the accepted answers (case insensitive)
    const normalizedInput = userInput.trim().toLowerCase();
    const correct = currentQ.acceptedGerman.some(ans => ans.toLowerCase() === normalizedInput);
    
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prev => prev + 1);
    }
    
    setUserAnswersList(prev => [
      ...prev, 
      { user: userInput.trim(), correct: currentQ.acceptedGerman[0], isCorrect: correct }
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      setQuizFinished(true);
    }
  };

  if (questions.length === 0) {
    return <div className="text-center py-10 font-bold">Lädt...</div>;
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
              const ans = userAnswersList[index] || { user: "", correct: "", isCorrect: false };

              return (
                <div key={q.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="font-bold text-gray-400 uppercase tracking-widest text-sm mb-4">Frage {index + 1}</div>
                  <div className="text-2xl font-black text-black mb-6">{q.acceptedGerman[0]}</div>
                  <div className="space-y-2">
                    <div className="text-lg">
                      <span className="font-medium text-gray-500">Deine Antwort: </span>
                      <span className={`font-bold ${ans.isCorrect ? 'text-green-500' : 'text-red-500'}`}>{ans.user || "-"}</span>
                    </div>
                    {!ans.isCorrect && (
                      <div className="text-lg">
                        <span className="font-medium text-gray-500">Richtige Antwort: </span>
                        <span className="font-bold text-black">{ans.correct}</span>
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
  const primaryAnswer = currentQ.acceptedGerman[0];

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto pb-20 px-4 md:px-0 pt-8">
      <button onClick={() => onBack(false)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        <span className="font-semibold">Zurück</span>
      </button>

      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-black mb-1">Level 2: Wort produzieren</h3>
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
        </div>

        <div className="text-center mb-10">
          <h2 className="text-5xl font-black text-black mb-4 lowercase tracking-tight">
            {isLoadingTranslations ? "..." : translatedQuestion}
          </h2>
        </div>

        {isLoadingTranslations ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-gray-400">Lädt...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto w-full">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showFeedback}
              className={`w-full text-center p-5 rounded-2xl font-bold text-2xl border-2 focus:outline-none transition-all ${
                showFeedback 
                  ? isCorrect 
                    ? "bg-green-50 border-green-500 text-green-900" 
                    : "bg-red-50 border-red-500 text-red-900"
                  : "bg-gray-50 border-gray-200 focus:border-black text-black placeholder-gray-300"
              }`}
              autoFocus
              autoComplete="off"
            />
            
            {showFeedback ? (
              <div className="mt-4 text-center animate-fade-in">
                {isCorrect ? (
                  <div className="text-green-500 font-bold text-lg mb-6">Richtig!</div>
                ) : (
                  <div className="mb-6">
                    <div className="text-red-500 font-bold text-lg mb-2">Falsch!</div>
                    <div className="text-gray-600 font-medium">
                      Die richtige Antwort ist: <span className="text-black font-black text-xl">{primaryAnswer}</span>
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-sm bg-black text-white hover:bg-gray-800 hover:shadow-md"
                >
                  {currentIndex + 1 < questions.length ? "Weiter" : "Level abschließen"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className={`w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-sm ${
                    userInput.trim() 
                      ? "bg-black text-white hover:bg-gray-800" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Prüfen
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
