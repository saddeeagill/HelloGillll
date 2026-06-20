import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Home() {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Top Header Bars matching the reference image */}
      <div className="w-full h-12 bg-[#3d313f] relative z-30"></div>
      
      <Logo />
      
      {/* The yellow horizontal bar under the logo */}
      <div className="w-full h-[3px] bg-[#e5e7eb] relative z-10"></div>

      <main className="flex-grow p-8 md:p-16 text-black overflow-y-auto w-full">
        <div className="max-w-2xl mx-auto">
          {/* Main Heading in German */}
          {/* Main Heading in German */}
          
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
