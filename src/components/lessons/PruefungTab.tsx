"use client";
import React, { useState } from "react";

type QuestionType = "mcq" | "tf" | "text";

interface ExamQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[]; // For MCQ
  correctAnswerIndex?: number; // For MCQ
  correctAnswerBool?: boolean; // For TF
  tts?: boolean; // Text-to-speech enabled
}

interface ExamSection {
  id: string;
  tabLabel: string;
  title: string;
  questions: ExamQuestion[];
}

const EXAM_SECTIONS: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 READ",
    title: "Choose the correct answer",
    questions: [
      { id: 1, type: "mcq", question: "Where does Maria come from?", options: ["Portugal", "Switzerland", "Bern", "Lisbon"], correctAnswerIndex: 0 },
      { id: 2, type: "mcq", question: "What is Maria's dog's name?", options: ["Müller", "Max", "Pedro", "His"], correctAnswerIndex: 1 },
      { id: 3, type: "mcq", question: "Where does her neighbor's husband work?", options: ["Park", "Café", "Bank", "School"], correctAnswerIndex: 2 },
      { id: 4, type: "mcq", question: "What is Maria's teacher's name?", options: ["Sofia", "Lisa", "Anna", "Saddeea Gill"], correctAnswerIndex: 3 },
      { id: 5, type: "mcq", question: "What do Maria and Lisa drink together?", options: ["Kaffee", "Milch", "Tee", "Juice"], correctAnswerIndex: 2 },
      { id: 6, type: "mcq", question: "What is the name of Maria's brother in the second story?", options: ["Max", "Hans", "Pedro", "Silva"], correctAnswerIndex: 2 },
      { id: 7, type: "mcq", question: "What does Lisa's son have to play with?", options: ["Fahrrad", "Ball", "Auto", "Buch"], correctAnswerIndex: 1 },
      { id: 8, type: "mcq", question: "How many boys are playing on the field with one ball?", options: ["Eins", "Zwei", "Drei", "Vier"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Up to what number do the boys count?", options: ["Drei", "Vier", "Fünf", "Sechs"], correctAnswerIndex: 2 },
      { id: 10, type: "mcq", question: "Wen ruft Maria in der dritten Geschichte an?", options: ["Mutter", "Bruder", "Schwester", "Vater"], correctAnswerIndex: 0 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 LISTEN / READ",
    title: "Right or wrong?",
    questions: [
      { id: 11, type: "tf", question: "Maria comes from Portugal.", correctAnswerBool: true, tts: true },
      { id: 12, type: "tf", question: "Maria's dog is called Müller.", correctAnswerBool: false, tts: true },
      { id: 13, type: "tf", question: "Maria lives in Bern.", correctAnswerBool: true, tts: true },
      { id: 14, type: "tf", question: "The river in Bern is loud.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Maria and Lisa are drinking tea together.", correctAnswerBool: false, tts: true },
      { id: 16, type: "tf", question: "Pedro is Maria's sister.", correctAnswerBool: false, tts: true },
      { id: 17, type: "tf", question: "Lisa has a son.", correctAnswerBool: false, tts: true },
      { id: 18, type: "tf", question: "Die Jungen spielen mit drei Bällen.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "Maria hears the children saying numbers.", correctAnswerBool: true, tts: true },
      { id: 20, type: "tf", question: "Maria ruft ihre Schwester an.", correctAnswerBool: false, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 WRITE",
    title: "Enter your answer here...",
    questions: [
      { id: 21, type: "text", question: "Name → Write: \"My name is ...\"" },
      { id: 22, type: "text", question: "Origin → Write: \"I come from ...\"" },
      { id: 23, type: "text", question: "Place of residence → Write: \"I live in ...\"" },
      { id: 24, type: "text", question: "Pet → Write: \"I have ...\" (e.g. dog, cat)" },
      { id: 25, type: "text", question: "Family → Write: \"My family...\" (e.g., is large, lives in ...)" },
    ]
  }
];

export default function PruefungTab() {
  const [examStarted, setExamStarted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | boolean | string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentSection = EXAM_SECTIONS[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      setExamStarted(true);
    }
  };

  const handleAnswer = (answer: number | boolean | string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex < EXAM_SECTIONS.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
      setCurrentQuestionIndex(EXAM_SECTIONS[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const resetExam = () => {
    setExamStarted(false);
    setFirstName("");
    setLastName("");
    setAnswers({});
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const restartFromQuestions = () => {
    setAnswers({});
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const playTTS = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE"; // Most content is German, some is English. Browser will do its best.
      window.speechSynthesis.speak(utterance);
    }
  };

  // 1. START SCREEN
  if (!examStarted) {
    return (
      <div className="flex flex-col items-center justify-center pt-8 pb-16">
        <div className="bg-white border border-gray-200 p-8 md:p-12 rounded-2xl shadow-sm w-full max-w-xl">
          <h2 className="text-3xl font-bold text-center text-black mb-2">Lesson test</h2>
          <p className="text-gray-500 text-center mb-10 font-medium">Lesson 1 - Introducing yourself</p>

          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">First name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f7650] focus:border-transparent transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Last name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f7650] focus:border-transparent transition-all font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={!firstName.trim() || !lastName.trim()}
              className="w-full py-4 mt-4 bg-[#ffe400] text-black font-bold text-lg rounded-xl hover:bg-[#e6cd00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Start exam
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. RESULTS SCREEN
  if (showResults) {
    const totalQuestions = EXAM_SECTIONS.reduce((acc, sec) => acc + sec.questions.length, 0);
    const score = EXAM_SECTIONS.reduce((total, sec) => {
      return total + sec.questions.reduce((secTotal, q) => {
        if (q.type === 'mcq') return secTotal + (answers[q.id] === q.correctAnswerIndex ? 1 : 0);
        if (q.type === 'tf') return secTotal + (answers[q.id] === q.correctAnswerBool ? 1 : 0);
        if (q.type === 'text') {
          const textAns = answers[q.id] as string;
          return secTotal + (textAns && textAns.trim().length > 0 ? 1 : 0);
        }
        return secTotal;
      }, 0);
    }, 0);

    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100 min-h-[400px]">
        <h2 className="text-3xl font-bold text-black mb-2">Exam Completed!</h2>
        <p className="text-lg text-gray-600 mb-8 font-medium">
          Name: <span className="text-black font-bold">{firstName} {lastName}</span>
        </p>
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm border-4 border-[#0f7650]">
          <span className="text-4xl font-black text-[#0f7650]">{score}/{totalQuestions}</span>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={restartFromQuestions}
            className="px-6 py-3 bg-white border-2 border-gray-200 text-black font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            Start anew
          </button>
        </div>
      </div>
    );
  }

  // 2. EXAM FLOW
  return (
    <div className="flex flex-col h-full min-h-[500px] max-w-4xl mx-auto pt-4">
      {/* Exam Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-1">Lesson test</h2>
        <p className="text-gray-500 font-medium mb-6">Lesson 1 - Introducing yourself</p>
        
        {/* Exam Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
          <span className={`px-4 py-2 text-sm font-bold rounded-md ${currentSectionIndex === 0 ? "bg-[#0f7650] text-white" : "bg-gray-100 text-gray-400"}`}>1 READ</span>
          <span className={`px-4 py-2 text-sm font-bold rounded-md ${currentSectionIndex === 1 ? "bg-[#0f7650] text-white" : "bg-gray-100 text-gray-400"}`}>2 LISTEN / READ</span>
          <span className={`px-4 py-2 text-sm font-bold rounded-md ${currentSectionIndex === 2 ? "bg-[#0f7650] text-white" : "bg-gray-100 text-gray-400"}`}>3 WRITE</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-[#0f7650] font-bold text-lg uppercase tracking-wider">
          Question {currentQuestionIndex + 1} of {currentSection.questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-[#0f7650] transition-all duration-300"
          style={{ width: `${((currentQuestionIndex) / currentSection.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl md:text-3xl font-bold text-black leading-snug">
            {currentQuestion.question}
          </h3>
          {currentQuestion.tts && (
            <button 
              onClick={() => playTTS(currentQuestion.question)}
              className="flex-shrink-0 w-10 h-10 bg-[#0f7650] text-white rounded-full flex items-center justify-center hover:bg-[#0a5237] transition-colors shadow-md"
            >
              <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Options */}
      {currentQuestion.type === "mcq" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {currentQuestion.options?.map((option, index) => {
            const isSelected = answers[currentQuestion.id] === index;
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`py-5 px-6 rounded-xl font-bold text-lg text-left transition-all border-2 ${
                  isSelected
                    ? "bg-[#ffe400] text-black border-[#ffe400] shadow-md scale-[1.02]"
                    : "bg-gray-50 text-black border-gray-200 hover:bg-white hover:border-gray-400"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      {currentQuestion.type === "tf" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => handleAnswer(true)}
            className={`py-5 px-6 rounded-xl font-bold text-lg text-center transition-all border-2 ${
              answers[currentQuestion.id] === true
                ? "bg-[#0f7650] text-white border-[#0f7650] shadow-md scale-[1.02]"
                : "bg-gray-50 text-black border-gray-200 hover:bg-green-50"
            }`}
          >
            Correct
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className={`py-5 px-6 rounded-xl font-bold text-lg text-center transition-all border-2 ${
              answers[currentQuestion.id] === false
                ? "bg-red-600 text-white border-red-600 shadow-md scale-[1.02]"
                : "bg-gray-50 text-black border-gray-200 hover:bg-red-50"
            }`}
          >
            Incorrect
          </button>
        </div>
      )}

      {currentQuestion.type === "text" && (
        <div className="mb-10 w-full">
          <textarea
            value={(answers[currentQuestion.id] as string) || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Enter your answer here..."
            className="w-full h-40 p-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f7650] focus:border-transparent transition-all font-medium resize-none shadow-sm text-lg"
          ></textarea>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-auto">
        <button
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            currentSectionIndex === 0 && currentQuestionIndex === 0
              ? 'opacity-0 pointer-events-none' 
              : 'bg-white border-2 border-gray-200 text-black hover:bg-gray-50 shadow-sm'
          }`}
        >
          Back
        </button>
        
        <div className="flex gap-4">
          <button
            onClick={restartFromQuestions}
            className="hidden sm:block px-6 py-3 bg-white border-2 border-gray-200 text-black font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            Start anew
          </button>
          <button
            onClick={handleNext}
            disabled={
              answers[currentQuestion.id] === undefined || 
              (currentQuestion.type === 'text' && ((answers[currentQuestion.id] as string) || '').trim().length === 0)
            }
            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-sm ${
              answers[currentQuestion.id] === undefined || (currentQuestion.type === 'text' && ((answers[currentQuestion.id] as string) || '').trim().length === 0)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {(currentSectionIndex === EXAM_SECTIONS.length - 1 && currentQuestionIndex === currentSection.questions.length - 1) ? 'Finish' : 'Further'}
          </button>
        </div>
      </div>
    </div>
  );
}
