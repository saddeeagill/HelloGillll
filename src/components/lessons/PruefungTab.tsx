"use client";
import React, { useState } from "react";

interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: "Where does Maria come from?",
    options: ["Portugal", "Switzerland", "Bern", "Lisbon"],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    question: "What is Maria's dog's name?",
    options: ["Müller", "Max", "Pedro", "His"],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    question: "Where does her neighbor's husband work?",
    options: ["Park", "Café", "Bank", "School"],
    correctAnswerIndex: 2,
  },
  {
    id: 4,
    question: "What is Maria's teacher's name?",
    options: ["Sofia", "Lisa", "Anna", "Saddeea Gill"], // Adjusted "Eighth Gill" to "Saddeea Gill" based on the story
    correctAnswerIndex: 3,
  },
  {
    id: 5,
    question: "What do Maria and Lisa drink together?",
    options: ["Kaffee", "Milch", "Tee", "Juice"],
    correctAnswerIndex: 2, // From "T wie Tee" inferred context
  },
  {
    id: 6,
    question: "What is the name of Maria's brother in the second story?",
    options: ["Max", "Hans", "Pedro", "Silva"],
    correctAnswerIndex: 2, // Inferred Pedro
  },
  {
    id: 7,
    question: "What does Lisa's son have to play with?",
    options: ["Fahrrad", "Ball", "Auto", "Buch"],
    correctAnswerIndex: 1, // "Zahl mit Ball" context
  },
  {
    id: 8,
    question: "How many boys are playing on the field with one ball?",
    options: ["Eins", "Zwei", "Drei", "Vier"],
    correctAnswerIndex: 1, // Inferred 2
  },
  {
    id: 9,
    question: "Up to what number do the boys count?",
    options: ["Drei", "Vier", "Fünf", "Sechs"],
    correctAnswerIndex: 2, // Inferred 5
  },
  {
    id: 10,
    question: "Wen ruft Maria in der dritten Geschichte an?",
    options: ["Mutter", "Bruder", "Schwester", "Vater"],
    correctAnswerIndex: 0, // "Ich mache Anruf an meine Mutter"
  },
];

export default function PruefungTab() {
  const [examStarted, setExamStarted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = EXAM_QUESTIONS[currentQuestionIndex];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      setExamStarted(true);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < EXAM_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const resetExam = () => {
    setExamStarted(false);
    setFirstName("");
    setLastName("");
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const restartFromQuestions = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
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
    const score = EXAM_QUESTIONS.reduce((total, q) => {
      return total + (answers[q.id] === q.correctAnswerIndex ? 1 : 0);
    }, 0);

    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100 min-h-[400px]">
        <h2 className="text-3xl font-bold text-black mb-2">Exam Completed!</h2>
        <p className="text-lg text-gray-600 mb-8 font-medium">
          Name: <span className="text-black font-bold">{firstName} {lastName}</span>
        </p>
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm border-4 border-[#0f7650]">
          <span className="text-4xl font-black text-[#0f7650]">{score}/{EXAM_QUESTIONS.length}</span>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={restartFromQuestions}
            className="px-6 py-3 bg-white border-2 border-gray-200 text-black font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            Start anew
          </button>
          <button
            onClick={resetExam}
            className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-sm"
          >
            New Student
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
          <span className="px-4 py-2 bg-[#0f7650] text-white text-sm font-bold rounded-md">1 READ</span>
          <span className="px-4 py-2 bg-gray-100 text-gray-400 text-sm font-bold rounded-md">2 LISTEN / READ</span>
          <span className="px-4 py-2 bg-gray-100 text-gray-400 text-sm font-bold rounded-md">3 WRITE</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-[#0f7650] font-bold text-lg uppercase tracking-wider">
          Question {currentQuestionIndex + 1} of {EXAM_QUESTIONS.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-[#0f7650] transition-all duration-300"
          style={{ width: `${((currentQuestionIndex) / EXAM_QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 font-bold mb-3 uppercase tracking-wider">Choose the correct answer</p>
        <h3 className="text-2xl md:text-3xl font-bold text-black leading-snug">
          {currentQuestion.question}
        </h3>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {currentQuestion.options.map((option, index) => {
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

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-auto">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            currentQuestionIndex === 0 
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
            disabled={answers[currentQuestion.id] === undefined}
            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-sm ${
              answers[currentQuestion.id] === undefined 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {currentQuestionIndex === EXAM_QUESTIONS.length - 1 ? 'Finish' : 'Further'}
          </button>
        </div>
      </div>
    </div>
  );
}
