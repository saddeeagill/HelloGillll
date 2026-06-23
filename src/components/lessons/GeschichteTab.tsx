"use client";
import React, { useState } from "react";
import { Lesson } from "@/data/lessons";
import { renderHighlightedText } from "@/utils/highlight";

export default function GeschichteTab({ 
  lesson,
  activeTopicId,
  setActiveTopicId
}: { 
  lesson: Lesson;
  activeTopicId: string;
  setActiveTopicId: (id: string) => void;
}) {
  const activeTopic = lesson.topics.find((t) => t.id === activeTopicId) || lesson.topics[0];
  const playAudio = () => {
    if (!activeTopic) return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeTopic.content);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  const stopAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Topics Sidebar */}
      <div className="w-full md:w-1/4 flex flex-col gap-2 border-r md:pr-4 border-gray-100">
        <h3 className="font-bold text-gray-500 mb-2 uppercase text-xs tracking-wider">Themen</h3>
        {lesson.topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => {
              setActiveTopicId(topic.id);
              stopAudio();
            }}
            className={`text-left px-4 py-3 rounded-lg font-semibold transition-all ${
              activeTopicId === topic.id
                ? "bg-[#000000] text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {topic.title}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="w-full md:w-3/4 flex flex-col">
        {/* Actions Menu */}
        <div className="flex flex-wrap items-center gap-3 mb-6 bg-gray-50 p-3 rounded-xl print:hidden">
          <button
            onClick={playAudio}
            className="flex items-center gap-2 px-4 py-2 bg-[#000000] text-white text-sm font-bold rounded-lg hover:bg-[#333333] transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
            Abspielen
          </button>
          
          <button
            onClick={stopAudio}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-200 text-sm font-bold rounded-lg hover:bg-red-200 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12"></rect>
            </svg>
            Stoppen
          </button>
        </div>

        {/* Story Text */}
        <div className="prose max-w-none text-black leading-relaxed md:text-lg print:text-black print:text-base">
          <h2 className="text-2xl font-bold mb-4">{activeTopic?.title}</h2>
          <p className="whitespace-pre-wrap">{activeTopic ? renderHighlightedText(activeTopic.content) : ""}</p>
        </div>
      </div>
    </div>
  );
}
