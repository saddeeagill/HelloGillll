"use client";
import React, { useState, useEffect, useRef } from "react";
import GeschichteTab from "./GeschichteTab";
import NomenTab from "./NomenTab";
import QuizTab from "./QuizTab";
import TheorieTab from "./TheorieTab";
import PruefungTab from "./PruefungTab";
import { LESSON_1, LESSON_2, LESSON_3, LESSON_4, LESSON_5, LESSON_6, LESSON_7, LESSON_8, LESSON_9, LESSON_10, LESSON_11, LESSON_12, LESSON_13, LESSON_14, LESSON_15, LESSON_16 } from "@/data/lessons";

const TABS = ["Geschichte", "Nomen", "Quiz", "Theorie", "Prüfung"];

export default function LessonView({ lessonId }: { lessonId: string }) {
  const [activeTab, setActiveTab] = useState("Geschichte");
  const [activeTopicId, setActiveTopicId] = useState("");
  const [showPrintMenu, setShowPrintMenu] = useState(false);
  const [printMode, setPrintMode] = useState<"geschichte" | "alle">("alle");
  const menuRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    setActiveTopicId(lesson.topics[0]?.id || "");
  }, [lesson.id, lesson.topics]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowPrintMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrint = (mode: "geschichte" | "alle") => {
    setPrintMode(mode);
    setShowPrintMenu(false);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto pb-20 px-3 md:px-0">
      {/* Header section */}
      <div className="mb-4 md:mb-6 pt-2 print:hidden">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-black drop-shadow-sm tracking-tight">
            {lesson.title}
          </h1>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowPrintMenu(!showPrintMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-black text-sm font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-sm print:hidden"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              PDF Drucken
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showPrintMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 print:hidden overflow-hidden">
                <button
                  onClick={() => handlePrint("geschichte")}
                  className="block w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  Geschichte
                </button>
                <button
                  onClick={() => handlePrint("alle")}
                  className="block w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Alle Geschichten
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide gap-2 snap-x">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`snap-start whitespace-nowrap px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-colors border-2 ${
                activeTab === tab
                  ? "bg-[#e5e7eb] text-black border-[#e5e7eb] shadow-sm"
                  : "bg-white text-black border-gray-200 hover:border-gray-400 hover:shadow-sm"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-8 min-h-[500px] print:hidden">
        {activeTab === "Geschichte" && <GeschichteTab lesson={lesson} activeTopicId={activeTopicId} setActiveTopicId={setActiveTopicId} />}
        {activeTab === "Nomen" && <NomenTab lesson={lesson} />}
        {activeTab === "Quiz" && <QuizTab lesson={lesson} />}
        {activeTab === "Theorie" && <TheorieTab />}
        {activeTab === "Prüfung" && <PruefungTab lesson={lesson} />}
      </div>

      {/* Print only content */}
      <div className="hidden print:block text-black">
        <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-black">{lesson.title}</h1>
        
        {printMode === "alle" ? (
          <>
            <h2 className="text-2xl font-bold mb-4 mt-8">Alle Geschichten</h2>
            {lesson.topics.map((topic) => (
              <div key={topic.id} className="mb-6">
                <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                <p className="whitespace-pre-wrap leading-relaxed">{topic.content}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 mt-8">Geschichte</h2>
            {lesson.topics.filter(t => t.id === activeTopicId).map((topic) => (
              <div key={topic.id} className="mb-6">
                <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                <p className="whitespace-pre-wrap leading-relaxed">{topic.content}</p>
              </div>
            ))}
          </>
        )}

        {lesson.nomenList && lesson.nomenList.length > 0 && (
          <div className="break-before-page">
            <h2 className="text-2xl font-bold mb-4 mt-8 border-b-2 border-black pb-2">Nomen</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-gray-400 py-2 font-bold">Singular</th>
                  <th className="border-b border-gray-400 py-2 font-bold">Plural</th>
                  <th className="border-b border-gray-400 py-2 font-bold">Englisch</th>
                </tr>
              </thead>
              <tbody>
                {lesson.nomenList.map((nomen) => (
                  <tr key={nomen.id}>
                    <td className="border-b border-gray-200 py-2">{nomen.singular}</td>
                    <td className="border-b border-gray-200 py-2">{nomen.plural}</td>
                    <td className="border-b border-gray-200 py-2">{nomen.english}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
