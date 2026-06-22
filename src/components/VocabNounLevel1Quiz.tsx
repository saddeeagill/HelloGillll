"use client";
import React, { useState, useEffect } from 'react';
import { translateText } from '@/utils/translate';

interface Question {
  id: string;
  enWord: string;
  correctGerman: string;
  germanDistractors: string[];
}

const POOL: Question[] = [
  { id: '1', enWord: "menu", correctGerman: "Speisekarte", germanDistractors: ["CD", "Praktikum", "Essen"] },
  { id: '2', enWord: "help", correctGerman: "Hilfe", germanDistractors: ["Marke", "Kasse", "Restaurant"] },
  { id: '3', enWord: "information", correctGerman: "Information", germanDistractors: ["Jacke", "Rezeption", "Leben"] },
  { id: '4', enWord: "friend", correctGerman: "Freund", germanDistractors: ["Glas", "Dokument", "Arm"] },
  { id: '5', enWord: "highway", correctGerman: "Autobahn", germanDistractors: ["Position", "Straßenbahn", "Löffel"] },
  { id: '6', enWord: "garden", correctGerman: "Garten", germanDistractors: ["Wohnung", "Hund", "Tisch"] },
  { id: '7', enWord: "bed", correctGerman: "Bett", germanDistractors: ["Hausaufgabe", "Auge", "Angebot"] },
  { id: '8', enWord: "shop", correctGerman: "Laden", germanDistractors: ["Donnerstag", "Geburtsort", "Student"] },
  { id: '9', enWord: "bank", correctGerman: "Bank", germanDistractors: ["März", "Größe", "Chef"] },
  { id: '10', enWord: "example", correctGerman: "Beispiel", germanDistractors: ["Balkon", "Eingang", "Ankunft"] }
];

interface VocabNounLevel1QuizProps {
  onBack: (passed?: boolean) => void;
  selectedLangCode: string;
}

export default function VocabNounLevel1Quiz({ onBack, selectedLangCode }: VocabNounLevel1QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Translation state for the current question
  const [translatedQuestion, setTranslatedQuestion] = useState<string>("");
  const [germanOptions, setGermanOptions] = useState<string[]>([]);
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(true);

  // Interaction state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Review state
  const [userAnswersList, setUserAnswersList] = useState<{user: string, correct: string}[]>([]);

  const initializeQuiz = () => {
    // Generate fresh shuffled questions
    const shuffled = [...POOL].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setQuizFinished(false);
    setUserAnswersList([]);
    
    setSelectedOption(null);
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
        // Fetch translation for the question word
        const translatedWord = await translateText(currentQ.enWord, selectedLangCode);

        if (isMounted) {
          setTranslatedQuestion(translatedWord);
          
          // Mix up the German options
          const options = [currentQ.correctGerman, ...currentQ.germanDistractors];
          const shuffledOptions = options.sort(() => 0.5 - Math.random());
          setGermanOptions(shuffledOptions);
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

  const handleOptionSelect = (option: string) => {
    if (showFeedback) return;
    
    setSelectedOption(option);
    const correct = option === questions[currentIndex].correctGerman;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prev => prev + 1);
    }
    
    setUserAnswersList(prev => [...prev, { user: option, correct: questions[currentIndex].correctGerman }]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowFeedback(false);
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
              const ans = userAnswersList[index] || { user: "", correct: "" };
              const isAnsCorrect = ans.user === ans.correct;

              return (
                <div key={q.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="font-bold text-gray-400 uppercase tracking-widest text-sm mb-4">Frage {index + 1}</div>
                  <div className="text-2xl font-black text-black mb-6">{q.correctGerman}</div>
                  <div className="space-y-2">
                    <div className="text-lg">
                      <span className="font-medium text-gray-500">Deine Antwort: </span>
                      <span className={`font-bold ${isAnsCorrect ? 'text-green-500' : 'text-red-500'}`}>{ans.user || "-"}</span>
                    </div>
                    {!isAnsCorrect && (
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

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto pb-20 px-4 md:px-0 pt-8">
      <button onClick={() => onBack(false)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        <span className="font-semibold">Zurück</span>
      </button>

      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-black mb-1">Level 1: Bedeutung erkennen</h3>
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
          <h2 className="text-4xl font-black text-black mb-8">{translatedQuestion}</h2>
        </div>

        {isLoadingTranslations ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-gray-400">Übersetzungen werden geladen...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {germanOptions.map((opt, i) => {
                const isSelected = selectedOption === opt;
                const isCorrectAnswer = opt === currentQ.correctGerman;
                
                let btnClass = "bg-white border-2 border-gray-200 text-black hover:border-black hover:bg-gray-50";
                
                if (showFeedback) {
                  if (isCorrectAnswer) {
                    btnClass = "bg-green-100 border-green-500 text-green-900";
                  } else if (isSelected) {
                    btnClass = "bg-red-100 border-red-500 text-red-900";
                  } else {
                    btnClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={showFeedback}
                    onClick={() => handleOptionSelect(opt)}
                    className={`w-full text-center p-5 rounded-2xl font-bold text-lg transition-all shadow-sm ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <button
                onClick={handleNext}
                className="w-full max-w-md mx-auto py-5 rounded-2xl font-bold text-xl transition-all shadow-sm bg-black text-white hover:bg-gray-800 hover:shadow-md mt-4"
              >
                {currentIndex + 1 < questions.length ? "Weiter" : "Level abschließen"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
