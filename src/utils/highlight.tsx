import React from 'react';

// Helper to highlight specific words marked with **word** in the text
export const renderHighlightedText = (text: string) => {
  // Split by **...** to find marked words
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Remove the ** from the start and end
      const word = part.slice(2, -2);
      return (
        <span key={i} className="bg-[#000000] text-white px-1 py-0.5 rounded font-bold mx-px shadow-sm print:bg-gray-200 print:text-black print:border-b-2 print:border-black print:shadow-none">
          {word}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};
