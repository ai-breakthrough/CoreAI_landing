import { TRANSLATIONS } from './translations';

function reverseMap(obj) {
  const rev = {};
  for (const [en, da] of Object.entries(obj)) {
    rev[da] = en;
  }
  return rev;
}

const ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];

function replaceTextNodes(root, dict) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    null,
    false,
  );
  const toReplace = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!trimmed) continue;

    const unquoted = trimmed.replace(/^["“”]+|["“”]+$/g, '');

    const key = dict[trimmed] ? trimmed : dict[unquoted] ? unquoted : null;
    if (key) {
      const newVal = raw.replace(trimmed, dict[key]);
      if (newVal !== raw) toReplace.push({ node, newVal });
    }
  }
  toReplace.forEach(({ node, newVal }) => (node.nodeValue = newVal));
}

function replaceAttributes(root, dict) {
  const all = root.querySelectorAll('*');
  all.forEach(el => {
    ATTRS.forEach(attr => {
      const v = el.getAttribute(attr);
      if (!v) return;
      const unquoted = v.replace(/^["“”]+|["“”]+$/g, '');
      const key = dict[v] ? v : dict[unquoted] ? unquoted : null;
      if (key) el.setAttribute(attr, dict[key]);
    });
  });
}

export function applyTranslation(lang) {
  const dict = lang === 'da' ? TRANSLATIONS.da : reverseMap(TRANSLATIONS.da);

  const root = document.body;
  replaceTextNodes(root, dict);
  replaceAttributes(root, dict);
}
