import { useEffect, useState } from 'react';
import { applyTranslation } from '@/lang/domTranslate';

const LANGS = [
  { code: 'en', label: 'EN', svg: 'img/GB.svg', title: 'English' },
  { code: 'da', label: 'DA', svg: 'img/DK.svg', title: 'Dansk' },
];

export default function LanguageFlags({ className = '' }) {
  const saved =
    typeof window !== 'undefined' ? localStorage.getItem('lng') : 'en';
  const [lang, setLang] = useState(saved || 'en');

  useEffect(() => {
    applyTranslation(lang === 'da' ? 'da' : 'en');
    try {
      localStorage.setItem('lng', lang);
    } catch {}
  }, [lang]);

  return (
    <div className={`flex gap-2 ${className}`}>
      {LANGS.map(l => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-label={l.title}
          title={l.title}
          className="p-0 m-0"
        >
          <img src={l.svg} alt={l.title} className="h-5 w-auto" />
        </button>
      ))}
    </div>
  );
}
