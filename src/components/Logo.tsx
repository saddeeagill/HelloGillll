'use client';

import Link from 'next/link';

export default function Logo({ showBack = false }: { showBack?: boolean }) {
  return (
    <div className="flex justify-center py-4 bg-white relative">
      {showBack && (
        <Link 
          href="/" 
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black font-semibold text-sm flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Zurück
        </Link>
      )}
      <div
        translate="no"
        className="notranslate"
        style={{
          fontFamily: 'var(--font-nunito), "Arial Rounded MT Bold", sans-serif',
          fontWeight: 900,
          fontSize: '1.5rem',
          lineHeight: 1.2,
          backgroundColor: '#ffe400',
          color: '#000',
          borderRadius: '9999px',
          padding: '4px 24px 6px',
          display: 'inline-flex',
          alignItems: 'center',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
        }}
      >
        {/* "hello g" */}
        <span>hello g</span>

        {/* "i" with Swiss flag replacing the dot */}
        <span style={{ position: 'relative', display: 'inline-block', lineHeight: 'inherit' }}>
          {/* Swiss flag circle covers the i dot */}
          <span
            style={{
              position: 'absolute',
              top: '-1px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '11px',
              height: '11px',
              backgroundColor: '#e30613',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            {/* White cross */}
            <span
              style={{
                position: 'absolute',
                width: '7px',
                height: '2px',
                backgroundColor: '#fff',
                borderRadius: '1px',
              }}
            />
            <span
              style={{
                position: 'absolute',
                width: '2px',
                height: '7px',
                backgroundColor: '#fff',
                borderRadius: '1px',
              }}
            />
          </span>

          {/* The actual letter i — its dot gets hidden behind the Swiss flag */}
          <span style={{ position: 'relative', zIndex: 1 }}>i</span>
        </span>

        {/* "ll" */}
        <span>ll</span>
      </div>
    </div>
  );
}
