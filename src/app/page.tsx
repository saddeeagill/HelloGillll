import Link from 'next/link';

export default function Home() {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Top Header Bars matching the reference image */}
      <div className="w-full h-12 bg-[#3d313f] relative z-30"></div>
      
      <div className="flex justify-center py-6 relative z-10 bg-white">
        <div 
          className="bg-[#ffe400] text-[#111111] font-black px-6 py-1.5 rounded-full text-2xl flex items-center tracking-tighter"
          style={{ fontFamily: '"Arial Rounded MT Bold", "Nunito", "Comic Sans MS", sans-serif' }}
        >
          hello g
          <span className="relative inline-flex flex-col items-center mx-[1px]">
            {/* The red dot with the white Swiss cross */}
            <span className="absolute -top-[0.1em] w-[9px] h-[9px] bg-[#e30613] rounded-full flex items-center justify-center z-10">
              <span className="w-[5px] h-[1.5px] bg-white absolute"></span>
              <span className="w-[1.5px] h-[5px] bg-white absolute"></span>
            </span>
            <span className="relative z-0">ı</span>
          </span>
          ll
        </div>
      </div>
      
      {/* The yellow horizontal bar under the logo */}
      <div className="w-full h-[3px] bg-[#ffe400] relative z-10"></div>

      <main className="flex-grow p-8 md:p-16 text-black overflow-y-auto w-full">
        <div className="max-w-2xl mx-auto">
          {/* Main Heading in German */}
          <h1 className="text-3xl md:text-4xl font-bold mb-10 text-[#0f7650] text-center">
            Wählen Sie Ihr Sprachniveau
          </h1>
          
          {/* Grid layout for 2 columns: A1 A2, B1 B2 */}
          <div className="grid grid-cols-2 gap-6">
            {levels.map((level) => (
              <Link 
                href={`/level/${level}`}
                key={level}
                className="flex items-center justify-center h-48 border-2 border-gray-200 rounded-2xl text-5xl font-bold hover:shadow-lg hover:border-gray-400 transition-all cursor-pointer bg-white text-black"
              >
                {level}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
