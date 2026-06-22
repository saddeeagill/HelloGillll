"use client";
import React, { useState } from "react";

export default function TheorieTab({ lesson }: { lesson: any }) {
  const [zoom, setZoom] = useState(1);

  if (!lesson) return null;
  
  // Parse lesson ID to build the correct Vercel URL
  // "lektion_1" -> num 1, level a1
  // "a2_lektion_1" -> num 1, level a2
  let imageSrc = "";
  if (lesson.id.startsWith("a2_lektion_")) {
    const num = lesson.id.replace("a2_lektion_", "");
    imageSrc = `https://hello-gill-app.vercel.app/theory-lektion-${num}-a2.jpg`;
  } else {
    const num = lesson.id.replace("lektion_", "");
    imageSrc = `https://hello-gill-app.vercel.app/theory-lektion-${num}-a1.jpg`;
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.25));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="flex flex-col items-center justify-start w-full h-[100vh] overflow-hidden bg-gray-50 text-center relative p-0">
      
      {/* Zoom Controls Overlay */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-sm border border-gray-200">
        <button 
          onClick={handleZoomOut}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700 font-bold transition-colors"
          title="Zoom Out"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
        </button>
        <span className="font-bold text-gray-700 min-w-[3rem]">{Math.round(zoom * 100)}%</span>
        <button 
          onClick={handleZoomIn}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700 font-bold transition-colors"
          title="Zoom In"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button 
          onClick={handleResetZoom}
          className="px-3 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700 font-semibold text-sm transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Container for the Theory Image */}
      <div className="w-full h-full relative flex flex-col items-center justify-start overflow-auto">
        <h2 className="text-2xl font-bold text-gray-700 py-6 shrink-0">Theorie: {lesson.title}</h2>
        
        <div className="flex-1 w-full flex items-start justify-center p-4">
          <img 
            src={imageSrc} 
            alt={`${lesson.title} Theorie`} 
            style={{ width: `${zoom * 100}vw`, maxWidth: "none" }}
            className="h-auto object-contain transition-all duration-200"
            onError={(e) => {
              // Optional: fallback if image is missing
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-8">
            <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span className="font-semibold text-sm">Bild nicht gefunden</span>
            <span className="text-xs mt-1">Image URL attempted: <strong>{imageSrc}</strong></span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
