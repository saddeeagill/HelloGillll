"use client";
import React, { useState, useEffect } from 'react';
import { translateText } from '@/utils/translate';

interface Question {
  id: string;
  enWord: string;
  acceptedGerman: string[];
}

const POOL: Question[] = [
  { id: '1', enWord: "dog", acceptedGerman: ["Hund"] },
  { id: '2', enWord: "cat", acceptedGerman: ["Katze"] },
  { id: '3', enWord: "book", acceptedGerman: ["Buch"] },
  { id: '4', enWord: "house", acceptedGerman: ["Haus"] },
  { id: '5', enWord: "water", acceptedGerman: ["Wasser"] },
  { id: '6', enWord: "bread", acceptedGerman: ["Brot"] },
  { id: '7', enWord: "milk", acceptedGerman: ["Milch"] },
  { id: '8', enWord: "apple", acceptedGerman: ["Apfel"] },
  { id: '9', enWord: "car", acceptedGerman: ["Auto"] },
  { id: '10', enWord: "table", acceptedGerman: ["Tisch"] },
  { id: '11', enWord: "chair", acceptedGerman: ["Stuhl"] },
  { id: '12', enWord: "window", acceptedGerman: ["Fenster"] },
  { id: '13', enWord: "door", acceptedGerman: ["Tür"] },
  { id: '14', enWord: "shoe", acceptedGerman: ["Schuh"] },
  { id: '15', enWord: "tree", acceptedGerman: ["Baum"] },
  { id: '16', enWord: "flower", acceptedGerman: ["Blume"] },
  { id: '17', enWord: "sun", acceptedGerman: ["Sonne"] },
  { id: '18', enWord: "moon", acceptedGerman: ["Mond"] },
  { id: '19', enWord: "city", acceptedGerman: ["Stadt"] },
  { id: '20', enWord: "street", acceptedGerman: ["Straße", "Strasse"] }
];

interface VocabNounLevel5QuizProps {
  onBack: (passed?: boolean) => void;
  selectedLangCode: string;
}

export default function VocabNounLevel5Quiz({ onBack, selectedLangCode }: VocabNounLevel5QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Translation & Audio state
  const [translatedWordToSpeak, setTranslatedWordToSpeak] = useState<string>("");
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Interaction state
  const [userInput, setUserInput] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Review state
  const [userAnswersList, setUserAnswersList] = useState<{user: string, correct: string, isCorrect: boolean}[]>([]);

  const initializeQuiz = () => {
    // Select 20 questions (the entire pool, just shuffled)
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
          setTranslatedWordToSpeak(translatedWord);
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

  const playAudio = () => {
    if (!translatedWordToSpeak) return;
    
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(translatedWordToSpeak);
      utterance.lang = selectedLangCode;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech wird von deinem Browser nicht unterstützt.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showFeedback || !userInput.trim()) return;
    
    const currentQ = questions[currentIndex];
    
    // Case insensitive match
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
    const passed = score >= 16; // 80% of 20
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
          <button onClick={() => onBack(score >= 16)} className="flex-1 px-6 py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-800 transition-colors">
            Zurück zur Übersicht
          </button>
        </div>

        <div className="w-full text-left">
          <h3 className="text-2xl font-black text-black mb-6">Deine Antworten</h3>
          <div className="space-y-6">
            {questions.map((q, index) => {
              const ans = userAnswersList[index] || { user: "", correct: "", isCorrect: false };

              return (
                <div key={q.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-1 w-full">
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
          <h3 className="text-xl font-bold text-black mb-1">Level 5: Hören</h3>
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
          {isLoadingTranslations ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
              <p className="font-bold text-gray-400">Audio wird geladen...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6 py-4">
              <button 
                onClick={playAudio}
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                  isPlaying 
                    ? "bg-blue-500 text-white scale-110 shadow-lg shadow-blue-200 animate-pulse" 
                    : "bg-gray-100 text-gray-600 hover:bg-black hover:text-white hover:scale-105 shadow-md"
                }`}
              >
                <svg className="w-16 h-16 ml-2" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              </button>
            </div>
          )}
        </div>

        {!isLoadingTranslations && (
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
