import { useEffect, useRef, useState } from 'react';
import { applyTranslation } from '@/lang/domTranslate';

const LANGS = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'da', label: 'DA', flag: '🇩🇰' },
];

export default function LanguageDropdown({ className = '' }) {
  const saved =
    typeof window !== 'undefined' ? localStorage.getItem('lng') : 'en';
  const [lang, setLang] = useState(saved || 'en');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (lang === 'da') applyTranslation('da');
    else applyTranslation('en');
    try {
      localStorage.setItem('lng', lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    const onClick = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  const current = LANGS.find(l => l.code === lang) || LANGS[0];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-1.5 rounded-md border border-black/50 bg-white/70 backdrop-blur-sm px-2.5 py-1 text-xs font-medium shadow-sm hover:bg-white transition"
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="tracking-wide text-black">{current.label}</span>
        <svg width="10" height="10" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5 7l5 6 5-6H5z" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-1 w-28 overflow-hidden rounded-lg border border-black/70 bg-white shadow-lg"
        >
          {LANGS.map(l => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={current.code === l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-1.5 px-2.5 py-1.5 text-xs hover:bg-black/5 ${
                  current.code === l.code ? 'font-semibold' : ''
                }`}
              >
                <span className="text-sm leading-none">{l.flag}</span>
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
