// ===============================
// 1. Автоматичне підключення паралаксу на картинки
// ===============================
(function () {
  const set = (el, attrs) => {
    if (!el) return;
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v === true ? '' : v);
    }
  };

  // ===== SERVICES =====
  document.querySelectorAll('#services img').forEach(img => {
    if (!img.hasAttribute('data-parallax')) {
      set(img, {
        'data-parallax': true,
        'data-depth': '1.4',
        'data-axis': 'y',
        'data-range': '320',
        'data-range-mobile': '180',
      });
    }
  });

  // ===== USE CASES — маленькі картки =====
  const attachUseCards = () => {
    document.querySelectorAll('#use-cases .usecard-img').forEach(img => {
      if (!img.hasAttribute('data-parallax')) {
        set(img, {
          'data-parallax': true,
          'data-depth': '1.2',
          'data-axis': 'y',
          'data-range': '220',
          'data-range-mobile': '130',
        });
      }
    });
  };
  attachUseCards();

  // ===== USE CASES — головне зображення =====
  const hero = document.querySelector('#use-cases .case-hero img');
  if (hero && !hero.hasAttribute('data-parallax')) {
    set(hero, {
      'data-parallax': true,
      'data-depth': '1.8',
      'data-axis': 'y',
      'data-range': '260',
      'data-range-mobile': '150',
      'data-rotate': '0.6',
    });
  }

  // ===== PROBLEMS — ліва колонка (фон) =====
  const probLeft = document.querySelector('#problems .problems-left');
  if (probLeft && !probLeft.hasAttribute('data-parallax')) {
    set(probLeft, {
      'data-parallax': true,
      'data-depth': '-2.2',
      'data-axis': 'y',
      'data-range': '260',
      'data-range-mobile': '160',
    });
  }

  // ===== PROBLEMS — картинки справа =====
  document.querySelectorAll('#problems .problems-right img').forEach(img => {
    if (!img.hasAttribute('data-parallax')) {
      set(img, {
        'data-parallax': true,
        'data-depth': '0.8',
        'data-axis': 'y',
        'data-range': '180',
        'data-range-mobile': '110',
      });
    }
  });

  // Перепривʼязуємо картинки після завантаження сторінки
  window.addEventListener('DOMContentLoaded', attachUseCards);
})();

// ===============================
// 2. Паралакс-движок
// ===============================
(() => {
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const num = (v, fb) => (isNaN(parseFloat(v)) ? fb : parseFloat(v));

  const items = Array.from(document.querySelectorAll('[data-parallax]')).map(
    el => ({
      el,
      speed: num(el.dataset.speed, NaN),
      depth: num(el.dataset.depth, 0),
      axis: (el.dataset.axis || 'y').toLowerCase(),
      rotate: num(el.dataset.rotate, 0),
      range: num(el.dataset.range, 300),
      rangeMobile: num(el.dataset.rangeMobile, NaN),
      zUnit: num(el.dataset.zunit, 30),
      clamp: num(el.dataset.clamp || el.dataset.max, NaN),
      visible: false,
      x: 0,
      y: 0,
      z: 0,
      r: 0,
    }),
  );

  const io = new IntersectionObserver(
    entries => {
      for (const e of entries) {
        const it = items.find(i => i.el === e.target);
        if (it) it.visible = e.isIntersecting;
      }
    },
    { root: null, rootMargin: '15% 0px', threshold: 0 },
  );

  items.forEach(i => io.observe(i.el));

  let ticking = false;
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );

  addEventListener(
    'resize',
    () => {
      ticking = false;
      update();
    },
    { passive: true },
  );

  function update() {
    const vh = innerHeight;
    const sy = scrollY || pageYOffset;
    const vpCenter = sy + vh / 2;
    const isMobile = innerWidth <= 720;

    for (const it of items) {
      if (!it.visible) continue;

      const rect = it.el.getBoundingClientRect();
      const elemCenter = rect.top + sy + rect.height / 2;
      const progress = (vpCenter - elemCenter) / vh;

      const base = isNaN(it.speed) ? 0.08 * (it.depth || 0) : it.speed;
      const usedRange =
        isMobile && !isNaN(it.rangeMobile) ? it.rangeMobile : it.range;

      let dy = progress * base * usedRange;
      let dx =
        it.axis === 'x' || it.axis === 'both'
          ? progress * base * (usedRange * 0.6)
          : 0;
      if (it.axis === 'y') dx = 0;

      if (!isNaN(it.clamp)) {
        const c = Math.abs(it.clamp);
        dy = Math.max(Math.min(dy, c), -c);
        dx = Math.max(Math.min(dx, c), -c);
      }

      const z = it.depth * it.zUnit;
      const r = it.rotate ? progress * it.rotate : 0;

      if (dy !== it.y || dx !== it.x || z !== it.z || r !== it.r) {
        it.y = dy;
        it.x = dx;
        it.z = z;
        it.r = r;
        it.el.style.transform = `translateZ(${z.toFixed(
          2,
        )}px) translate3d(${dx.toFixed(2)}px, ${dy.toFixed(
          2,
        )}px, 0) rotateZ(${r.toFixed(3)}deg)`;
      }
    }
    ticking = false;
  }

  update();
})();

// ===============================
// 3. Анімація чисел у #why-agentic
// ===============================
(() => {
  const root = document.querySelector('#why-agentic');
  if (!root) return;

  const numberRegex =
    /(?<![\d.,])(\d{1,3}(?:[.,]\d{1,2})?)(?=\s?(?:%|(?:\s?(?:bln|billion|B))\b)?)/gi;

  const wrapNumbers = node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const txt = node.nodeValue;
      if (!txt || !numberRegex.test(txt)) return;

      numberRegex.lastIndex = 0;
      const frag = document.createDocumentFragment();
      let lastIdx = 0,
        m;

      while ((m = numberRegex.exec(txt)) !== null) {
        const numStr = m[1];
        if (/^\d{4,}$/.test(numStr)) continue; // не анімуємо роки

        if (m.index > lastIdx)
          frag.appendChild(
            document.createTextNode(txt.slice(lastIdx, m.index)),
          );

        const span = document.createElement('span');
        span.className = 'highlighted-number';
        const normalized = parseFloat(numStr.replace(',', '.'));
        if (!isNaN(normalized)) {
          span.setAttribute('data-count', normalized);
          span.setAttribute(
            'data-decimals',
            numStr.includes('.') || numStr.includes(',') ? 1 : 0,
          );
          span.textContent = '0';
          frag.appendChild(span);
        } else {
          frag.appendChild(document.createTextNode(numStr));
        }
        lastIdx = m.index + numStr.length;
      }

      if (lastIdx < txt.length)
        frag.appendChild(document.createTextNode(txt.slice(lastIdx)));
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (
        ['SCRIPT', 'STYLE'].includes(node.tagName) ||
        node.getAttribute?.('aria-hidden') === 'true'
      )
        return;
      Array.from(node.childNodes).forEach(wrapNumbers);
    }
  };

  wrapNumbers(root);

  const counters = root.querySelectorAll('.highlighted-number[data-count]');
  if (!counters.length) return;

  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  const animate = el => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    let startTime = null;

    const duration = Math.min(2000, 800 + Math.abs(target) * 10);

    const step = ts => {
      if (!startTime) startTime = ts;
      const p = Math.min(1, (ts - startTime) / duration);
      const eased = easeOutCubic(p);
      const val = target * eased;
      el.textContent = val.toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    };

    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(animate);
          io.disconnect();
        }
      });
    },
    { threshold: 0.4 },
  );

  io.observe(root);
})();
