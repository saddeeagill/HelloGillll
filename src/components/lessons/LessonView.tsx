"use client";
import React, { useState, useEffect, useRef } from "react";
import GeschichteTab from "./GeschichteTab";
import NomenTab from "./NomenTab";
import QuizTab from "./QuizTab";
import TheorieTab from "./TheorieTab";
import PruefungTab from "./PruefungTab";
import { LESSON_1, LESSON_2, LESSON_3, LESSON_4, LESSON_5, LESSON_6, LESSON_7, LESSON_8, LESSON_9, LESSON_10, LESSON_11, LESSON_12, LESSON_13, LESSON_14, LESSON_15, LESSON_16 } from "@/data/lessons";
import { renderHighlightedText } from "@/utils/highlight";
import { SUPPORTED_LANGUAGES } from "@/data/languages";
import TranslateText from "../TranslateText";

const getTopicNouns = (content: string, nomenList?: any[]) => {
  if (!nomenList) return [];
  const matches = content.match(/\*\*(.*?)\*\*/g) || [];
  const highlightedWords = matches.map((m) => m.slice(2, -2).toLowerCase());
  
  const filtered = nomenList.filter(
    (nomen) =>
      highlightedWords.includes(nomen.singular.toLowerCase()) ||
      highlightedWords.includes(nomen.plural.toLowerCase())
  );
  
  return filtered.sort((a, b) => a.id - b.id);
};

const getTabs = (lessonId: string) => {
  const lessonNum = parseInt(lessonId.replace('lektion_', ''), 10) || 1;
  return (lessonNum >= 4 && lessonNum <= 16) 
    ? ["Geschichte", "Nomen", "Theorie"] 
    : ["Geschichte", "Nomen", "Quiz", "Theorie", "Prüfung"];
};

export default function LessonView({ lessonId }: { lessonId: string }) {
  const [activeTab, setActiveTab] = useState("Geschichte");
  const [activeTopicId, setActiveTopicId] = useState("");
  const [selectedLangCode, setSelectedLangCode] = useState("pt");
  const [showPrintMenu, setShowPrintMenu] = useState(false);
  const [printMode, setPrintMode] = useState<"geschichte" | "alle" | "theorie">("alle");
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

  const TABS = getTabs(lesson.id);

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

  // Build plain HTML string for a story content (converts **word** to <strong>)
  const buildStoryHtml = (content: string): string => {
    return content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="background:#000;color:#fff;padding:1px 4px;border-radius:3px;">$1</strong>')
      .replace(/\n/g, '<br>');
  };

  // Build noun table HTML for a set of nouns
  const buildNounTableHtml = (nouns: any[]): string => {
    if (nouns.length === 0) return '';
    const langLabel = SUPPORTED_LANGUAGES.find(l => l.code === selectedLangCode)?.nativeName || 'Translation';
    const rows = nouns.map((nomen, index) => `
      <tr>
        <td>${index + 1}</td>
        <td><strong>${nomen.singular}</strong></td>
        <td>${nomen.plural}</td>
        <td>${nomen.english}</td>
        <td>${nomen.english}</td>
      </tr>`).join('');
    return `
      <div class="noun-section">
        <h4>Nomen</h4>
        <table>
          <thead>
            <tr>
              <th class="nr">Nr.</th>
              <th>Singular</th>
              <th>Plural</th>
              <th>English</th>
              <th>${langLabel}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  };

  const handlePrint = (mode: "geschichte" | "alle" | "theorie") => {
    setShowPrintMenu(false);

    const topicsToPrint = mode === 'alle'
      ? lesson.topics
      : lesson.topics.filter(t => t.id === activeTopicId);

    let bodyContent = '';

    if (mode === 'theorie') {
      const imgSrc = lesson.id.startsWith("a2_lektion_")
        ? `https://hello-gill-app.vercel.app/theory-lektion-${lesson.id.replace("a2_lektion_", "")}-a2.jpg`
        : `https://hello-gill-app.vercel.app/theory-lektion-${lesson.id.replace("lektion_", "")}-a1.jpg`;
      bodyContent = `<div style="text-align:center;"><img src="${imgSrc}" style="max-width:100%;height:auto;" /></div>`;
    } else {
      bodyContent = topicsToPrint.map(topic => {
        const nouns = getTopicNouns(topic.content, lesson.nomenList);
        const storyHtml = buildStoryHtml(topic.content);
        const nounHtml = buildNounTableHtml(nouns);
        return `
          <div class="story-block">
            <h2>${topic.title}</h2>
            <p class="story-text">${storyHtml}</p>
            ${nounHtml}
          </div>`;
      }).join('');
    }

    const printHtml = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>${lesson.title}</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 12mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 12pt;
      color: #000;
      background: #fff;
      padding: 0;
    }
    h1 {
      font-size: 20pt;
      font-weight: bold;
      border-bottom: 2px solid #000;
      padding-bottom: 8px;
      margin-bottom: 20px;
    }
    .story-block {
      margin-bottom: 32px;
    }
    h2 {
      font-size: 15pt;
      font-weight: bold;
      margin-bottom: 10px;
      margin-top: 20px;
      page-break-after: avoid;
    }
    .story-text {
      line-height: 1.7;
      margin-bottom: 16px;
      white-space: pre-wrap;
    }
    .noun-section {
      margin-top: 16px;
    }
    h4 {
      font-size: 12pt;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      padding-bottom: 4px;
      margin-bottom: 8px;
      page-break-after: avoid;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10pt;
      page-break-inside: auto;
    }
    thead { display: table-header-group; }
    thead tr {
      background: #f0f0f0;
      border-bottom: 2px solid #ccc;
    }
    th {
      padding: 6px 8px;
      font-weight: bold;
      text-align: left;
    }
    th.nr { width: 40px; }
    td {
      padding: 5px 8px;
      border-bottom: 1px solid #eee;
      text-align: left;
    }
    tr { page-break-inside: avoid; }
  </style>
</head>
<body>
  <h1>${lesson.title}</h1>
  ${bodyContent}
  <script>window.onload = function(){ window.print(); };<\/script>
</body>
</html>`;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printHtml);
      printWindow.document.close();
    }
  };


  return (
    <div className="flex flex-col min-h-screen w-full max-w-5xl mx-auto pb-20 px-3 md:px-0 print:block print:min-h-0 print:pb-0">
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
              PDF / Drucken
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
                  className="block w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  Alle Geschichten
                </button>
                <button
                  onClick={() => handlePrint("theorie")}
                  className="block w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Theorie
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Tabs Dropdown */}
        <div className="relative mb-4 w-full md:w-64">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full appearance-none px-4 py-3 bg-white border-2 border-gray-200 text-black font-bold rounded-xl focus:outline-none focus:border-black transition-colors shadow-sm cursor-pointer"
          >
            {TABS.map((tab) => (
              <option key={tab} value={tab}>
                {tab}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-8 min-h-[500px] print:hidden">
        {activeTab === "Geschichte" && <GeschichteTab lesson={lesson} activeTopicId={activeTopicId} setActiveTopicId={setActiveTopicId} />}
        {activeTab === "Nomen" && <NomenTab lesson={lesson} selectedLangCode={selectedLangCode} setSelectedLangCode={setSelectedLangCode} />}
        {activeTab === "Quiz" && <QuizTab lesson={lesson} />}
        {activeTab === "Theorie" && <TheorieTab lesson={lesson} />}
        {activeTab === "Prüfung" && <PruefungTab lesson={lesson} />}
      </div>

      {/* Print only content */}
      <div className="hidden print:block text-black">
        <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-black">{lesson.title}</h1>
        
        {printMode === "theorie" ? (
          <div className="w-full text-center mt-8">
            <h2 className="text-2xl font-bold mb-4">Theorie</h2>
            <img 
              src={lesson.id.startsWith("a2_lektion_") ? `https://hello-gill-app.vercel.app/theory-lektion-${lesson.id.replace("a2_lektion_", "")}-a2.jpg` : `https://hello-gill-app.vercel.app/theory-lektion-${lesson.id.replace("lektion_", "")}-a1.jpg`}
              alt="Theorie"
              className="max-w-full h-auto mx-auto"
            />
          </div>
        ) : printMode === "alle" ? (
          <>
            <h2 className="text-2xl font-bold mb-2 mt-8">Alle Geschichten</h2>
            {lesson.topics.map((topic) => {
              const topicNouns = getTopicNouns(topic.content, lesson.nomenList);
              return (
              <div key={topic.id} className="mb-10">
                <h3 className="text-xl font-bold mb-2 break-after-avoid">{topic.title}</h3>
                <p className="whitespace-pre-wrap leading-relaxed">{renderHighlightedText(topic.content)}</p>
                {topicNouns.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-bold mb-2 border-b border-gray-300 pb-1 break-after-avoid">Nomen</h4>
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100 border-b-2 border-gray-200 text-black">
                          <th className="py-2 px-3 font-semibold text-sm w-12">Nr.</th>
                          <th className="py-2 px-3 font-semibold text-sm">Singular</th>
                          <th className="py-2 px-3 font-semibold text-sm">Plural</th>
                          <th className="py-2 px-3 font-semibold text-sm">English</th>
                          <th className="py-2 px-3 font-semibold text-sm">
                            {SUPPORTED_LANGUAGES.find(l => l.code === selectedLangCode)?.nativeName || "Translation"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {topicNouns.map((nomen, index) => (
                          <tr key={nomen.id} className="border-b border-gray-100">
                            <td className="py-2 px-3 font-medium text-gray-500">{index + 1}</td>
                            <td className="py-2 px-3 font-bold text-black">{nomen.singular}</td>
                            <td className="py-2 px-3 text-black">{nomen.plural}</td>
                            <td className="py-2 px-3 text-black font-medium">{nomen.english}</td>
                            <td className="py-2 px-3 text-black font-medium">
                              {selectedLangCode === 'en' ? nomen.english : <TranslateText text={nomen.singular} targetLang={selectedLangCode} />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )})}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2 mt-8">Geschichte</h2>
            {lesson.topics.filter(t => t.id === activeTopicId).map((topic) => {
              const topicNouns = getTopicNouns(topic.content, lesson.nomenList);
              return (
              <div key={topic.id} className="mb-10">
                <h3 className="text-xl font-bold mb-2 break-after-avoid">{topic.title}</h3>
                <p className="whitespace-pre-wrap leading-relaxed">{renderHighlightedText(topic.content)}</p>
                {topicNouns.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-bold mb-2 border-b border-gray-300 pb-1 break-after-avoid">Nomen</h4>
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100 border-b-2 border-gray-200 text-black">
                          <th className="py-2 px-3 font-semibold text-sm w-12">Nr.</th>
                          <th className="py-2 px-3 font-semibold text-sm">Singular</th>
                          <th className="py-2 px-3 font-semibold text-sm">Plural</th>
                          <th className="py-2 px-3 font-semibold text-sm">English</th>
                          <th className="py-2 px-3 font-semibold text-sm">
                            {SUPPORTED_LANGUAGES.find(l => l.code === selectedLangCode)?.nativeName || "Translation"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {topicNouns.map((nomen, index) => (
                          <tr key={nomen.id} className="border-b border-gray-100">
                            <td className="py-2 px-3 font-medium text-gray-500">{index + 1}</td>
                            <td className="py-2 px-3 font-bold text-black">{nomen.singular}</td>
                            <td className="py-2 px-3 text-black">{nomen.plural}</td>
                            <td className="py-2 px-3 text-black font-medium">{nomen.english}</td>
                            <td className="py-2 px-3 text-black font-medium">
                              {selectedLangCode === 'en' ? nomen.english : <TranslateText text={nomen.singular} targetLang={selectedLangCode} />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )})}
          </>
        )}
      </div>
    </div>
  );
}
