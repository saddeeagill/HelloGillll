"use client";
import React, { useState } from "react";
import GeschichteTab from "./GeschichteTab";
import NomenTab from "./NomenTab";
import QuizTab from "./QuizTab";
import TheorieTab from "./TheorieTab";
import PruefungTab from "./PruefungTab";
import { LESSON_1, LESSON_2, LESSON_3, LESSON_4, LESSON_5, LESSON_6, LESSON_7, LESSON_8, LESSON_9, LESSON_10, LESSON_11, LESSON_12, LESSON_13, LESSON_14, LESSON_15, LESSON_16 } from "@/data/lessons";

const TABS = ["Geschichte", "Nomen", "Quiz", "Theorie", "Prüfung"];

export default function LessonView({ lessonId }: { lessonId: string }) {
  const [activeTab, setActiveTab] = useState("Geschichte");
  
  // Currently we only have Lektion 1 to 16 data
  const lesson = lessonId === 'lektion_16' ? LESSON_16 
    : lessonId === 'lektion_15' ? LESSON_15
    : lessonId === 'lektion_14' ? LESSON_14
    : lessonId === 'lektion_13' ? LESSON_13
    : lessonId === 'lektion_12' ? LESSON_12
    : lessonId === 'lektion_11' ? LESSON_11
    : lessonId === 'lektion_10' ? LESSON_10
    : lessonId === 'lektion_9' ? LESSON_9
    : lessonId === 'lektion_8' ? LESSON_8
    : lessonId === 'lektion_7' ? LESSON_7
    : lessonId === 'lektion_6' ? LESSON_6
    : lessonId === 'lektion_5' ? LESSON_5
    : lessonId === 'lektion_4' ? LESSON_4
    : lessonId === 'lektion_3' ? LESSON_3
    : lessonId === 'lektion_2' ? LESSON_2
    : LESSON_1;

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto pb-20 px-3 md:px-0">
      {/* Header section */}
      <div className="mb-4 md:mb-6 pt-2">
        <h1 className="text-2xl md:text-3xl font-bold text-black drop-shadow-sm tracking-tight mb-4">
          {lesson.title}
        </h1>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide gap-2 snap-x">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`snap-start whitespace-nowrap px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-colors border-2 ${
                activeTab === tab
                  ? "bg-[#ffe400] text-black border-[#ffe400] shadow-sm"
                  : "bg-white text-black border-gray-200 hover:border-gray-400 hover:shadow-sm"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-8 min-h-[500px]">
        {activeTab === "Geschichte" && <GeschichteTab lesson={lesson} />}
        {activeTab === "Nomen" && <NomenTab lesson={lesson} />}
        {activeTab === "Quiz" && <QuizTab lesson={lesson} />}
        {activeTab === "Theorie" && <TheorieTab />}
        {activeTab === "Prüfung" && <PruefungTab lesson={lesson} />}
      </div>
    </div>
  );
}
