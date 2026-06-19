"use client";
import React, { useState } from "react";
import GeschichteTab from "./GeschichteTab";
import NomenTab from "./NomenTab";
import QuizTab from "./QuizTab";
import TheorieTab from "./TheorieTab";
import PruefungTab from "./PruefungTab";
import { LESSON_1 } from "@/data/lessons";

const TABS = ["Geschichte", "Nomen", "Quiz", "Theorie", "Prüfung"];

export default function LessonView({ lessonId }: { lessonId: string }) {
  const [activeTab, setActiveTab] = useState("Geschichte");
  
  // Currently we only have Lektion 1 data
  const lesson = lessonId === 'lektion_1' ? LESSON_1 : LESSON_1;

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
        {activeTab === "Quiz" && <QuizTab />}
        {activeTab === "Theorie" && <TheorieTab />}
        {activeTab === "Prüfung" && <PruefungTab />}
      </div>
    </div>
  );
}
