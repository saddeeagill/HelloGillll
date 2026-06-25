"use client";

import React, { useState, useEffect } from "react";
import { VOCABULARY } from "../data/vocabulary";
import { translateText } from "../utils/translate";

interface Question {
  id: string;
  category: string;
  germanWord: string;
  englishTranslation: string;
  correctAnswer: string;
  distractors: string[];
}

interface GeneralVocabQuizViewProps {
  level?: string;
  selectedLangCode: string;
  onBack: () => void;
}

const CATEGORY_MAP: Record<string, string> = {
  "Nouns": "Nomen",
  "Adjectives": "Adjektive",
  "Adverbs": "Adverbien",
  "Regular Verbs": "Regelmäßige Verben",
  "Irregular Verbs": "Unregelmäßige Verben",
  "Modal Verbs": "Modalverben",
};

export default function GeneralVocabQuizView({ level = "A1", selectedLangCode, onBack }: GeneralVocabQuizViewProps) {
  const [quizState, setQuizState] = useState<"setup" | "playing" | "finished">("setup");
  const [selectedWordType, setSelectedWordType] = useState<string>("Alle Wortarten");
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [isLoadingTranslations, setIsLoadingTranslations] = useState(false);
  const [translatedQuestion, setTranslatedQuestion] = useState<string>("");
  const [translatedOptions, setTranslatedOptions] = useState<string[]>([]);
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const startQuiz = async () => {
    let pool = VOCABULARY.filter(w => w.level === level.toUpperCase());
    
    if (pool.length < 10) {
      alert("Nicht genug Wörter für dieses Level gefunden.");
      return;
    }

    let selectedWords: any[] = [];

    if (selectedWordType === "Alle Wortarten") {
      const categories = ["Nouns", "Adjectives", "Regular Verbs", "Irregular Verbs", "Adverbs", "Modal Verbs"];
      const catWords: any[] = [];
      const remainingPool = [...pool];

      // Pick at least 1 from each available category
      categories.forEach(cat => {
        const catPool = remainingPool.filter(w => w.category === cat);
        if (catPool.length > 0) {
          const picked = catPool[Math.floor(Math.random() * catPool.length)];
          catWords.push(picked);
          const idx = remainingPool.findIndex(w => w.id === picked.id && w.category === picked.category);
          if (idx !== -1) remainingPool.splice(idx, 1);
        }
      });

      const needed = 10 - catWords.length;
      const shuffledRemaining = remainingPool.sort(() => 0.5 - Math.random());
      selectedWords = [...catWords, ...shuffledRemaining.slice(0, needed)].sort(() => 0.5 - Math.random());
    } else {
      pool = pool.filter(w => CATEGORY_MAP[w.category] === selectedWordType);
      if (pool.length < 10) {
        alert("Nicht genug Wörter für diese Kategorie gefunden.");
        return;
      }
      const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
      selectedWords = shuffledPool.slice(0, 10);
    }

    const generatedQuestions: Question[] = selectedWords.map(word => {
      let distractorPool = VOCABULARY.filter(w => w.level === level.toUpperCase() && w.id !== word.id && w.category === word.category);
      if (distractorPool.length < 3) {
        distractorPool = VOCABULARY.filter(w => w.level === level.toUpperCase() && w.id !== word.id);
      }
      const shuffledDistractors = [...distractorPool].sort(() => 0.5 - Math.random());
      const selectedDistractors = shuffledDistractors.slice(0, 3).map(w => w.translation);

      return {
        id: word.id.toString(),
        category: word.category,
        germanWord: word.word,
        englishTranslation: word.translation,
        correctAnswer: word.translation,
        distractors: selectedDistractors
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setScore(0);
    setQuizState("playing");
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
  };

  useEffect(() => {
    let isMounted = true;
    
    if (quizState !== "playing" || questions.length === 0) return;
    
    const fetchTranslations = async () => {
      setIsLoadingTranslations(true);
      const currentQ = questions[currentIndex];
      
      try {
        // Translate correct answer
        const translatedCorrect = await translateText(currentQ.correctAnswer, selectedLangCode);
        
        // Translate distractors
        const translatedDistractors = await Promise.all(
          currentQ.distractors.map(d => translateText(d, selectedLangCode))
        );

        if (isMounted) {
          const options = [translatedCorrect, ...translatedDistractors];
          const shuffledOptions = options.sort(() => 0.5 - Math.random());
          setTranslatedOptions(shuffledOptions);
          // Assuming the correct answer to check against
          setTranslatedQuestion(translatedCorrect);
          setIsLoadingTranslations(false);
        }
      } catch (error) {
        console.error("Translation error:", error);
        if (isMounted) setIsLoadingTranslations(false);
      }
    };

    fetchTranslations();

    return () => { isMounted = false; };
  }, [currentIndex, questions, selectedLangCode, quizState]);

  const handleOptionClick = (option: string) => {
    if (showFeedback) return;
    
    setSelectedOption(option);
    const correct = option.trim().toLowerCase() === translatedQuestion.trim().toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowFeedback(false);
    } else {
      setQuizState("finished");
    }
  };

  if (quizState === "setup") {
    return (
      <div className="flex flex-col h-full w-full max-w-2xl mx-auto pt-8 px-4">
        <h1 className="text-3xl font-black mb-8">Quiz Setup</h1>
        
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
          <p className="font-bold text-lg mb-4">Level: {level}</p>
          
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-500 mb-2">Wähle die Wortart:</label>
            <select 
              value={selectedWordType}
              onChange={(e) => setSelectedWordType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-black text-sm rounded-xl focus:border-black block py-3 px-4 font-bold cursor-pointer"
            >
              <option value="Alle Wortarten">Alle Wortarten</option>
              <option value="Nomen">Nomen</option>
              <option value="Adjektive">Adjektive</option>
              <option value="Adverbien">Adverbien</option>
              <option value="Modalverben">Modalverben</option>
              <option value="Regelmäßige Verben">Regelmäßige Verben</option>
              <option value="Unregelmäßige Verben">Unregelmäßige Verben</option>
            </select>
          </div>
          
          <button 
            onClick={startQuiz}
            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors"
          >
            Quiz starten
          </button>
        </div>
      </div>
    );
  }

  if (quizState === "finished") {
    return (
      <div className="flex flex-col h-full w-full max-w-2xl mx-auto pt-8 px-4 text-center">
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-10 shadow-sm">
          <h2 className="text-3xl font-black mb-4">Quiz beendet!</h2>
          <p className="text-xl mb-8">Du hast <span className="font-bold text-black">{score}</span> von <span className="font-bold text-black">{questions.length}</span> Punkten erreicht.</p>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setQuizState("setup")}
              className="px-6 py-3 bg-gray-100 text-black rounded-xl font-bold hover:bg-gray-200"
            >
              Neues Quiz
            </button>
            <button 
              onClick={onBack}
              className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800"
            >
              Zurück zur Level-Auswahl
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const catGerman = CATEGORY_MAP[currentQ?.category] || currentQ?.category;

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto pt-8 px-4 pb-20">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Quiz - Level {level}</h2>
          <p className="text-sm font-bold text-gray-500">Question {currentIndex + 1} of {questions.length}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-black text-black">Points: {score}</p>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm flex flex-col items-center text-center">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
          Übersetze: {catGerman}
        </span>
        <h3 className="text-4xl md:text-5xl font-black text-black mb-8">{currentQ?.germanWord}</h3>

        {isLoadingTranslations ? (
          <div className="flex justify-center items-center py-10 w-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            {translatedOptions.map((option, idx) => {
              let btnClass = "bg-white border-2 border-gray-100 text-black hover:border-gray-300";
              
              if (showFeedback) {
                if (option === translatedQuestion) {
                  btnClass = "bg-green-100 border-green-500 text-green-800";
                } else if (option === selectedOption && !isCorrect) {
                  btnClass = "bg-red-100 border-red-500 text-red-800";
                } else {
                  btnClass = "bg-gray-50 border-gray-100 text-gray-400 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  disabled={showFeedback}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all text-left flex justify-between items-center ${btnClass}`}
                >
                  <span>{option}</span>
                  {showFeedback && option === translatedQuestion && <span>✅</span>}
                  {showFeedback && option === selectedOption && !isCorrect && <span>❌</span>}
                </button>
              );
            })}
          </div>
        )}

        {showFeedback && (
          <div className="mt-8 w-full">
            <button
              onClick={handleNext}
              className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors"
            >
              {currentIndex < questions.length - 1 ? "Nächste Frage" : "Quiz abschließen"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
