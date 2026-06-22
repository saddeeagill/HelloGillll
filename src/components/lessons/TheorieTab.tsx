"use client";
import React from "react";

export default function TheorieTab({ lesson }: { lesson: any }) {
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

  return (
    <div className="flex flex-col items-center justify-start w-full h-[100vh] overflow-auto bg-gray-50 text-center relative p-0">
      
      {/* Container for the Theory Image */}
      <div className="w-full min-h-max bg-white relative flex flex-col items-center justify-start overflow-auto">
        <h2 className="text-2xl font-bold text-gray-700 py-6">Theorie: {lesson.title}</h2>
        
        <img 
          src={imageSrc} 
          alt={`${lesson.title} Theorie`} 
          className="w-[100vw] h-auto object-contain max-w-none"
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
  );
}
