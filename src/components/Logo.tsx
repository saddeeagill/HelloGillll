'use client';

export default function Logo() {
  return (
    <div className="flex justify-center py-4 bg-white">
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
