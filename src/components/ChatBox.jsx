import { useEffect, useRef, useState } from 'react';
import { askCoreAI } from '../lib/coreai';

export default function ChatBox() {
  const [prompt, setPrompt] = useState('');
  const [phase, setPhase] = useState('input');
  const [lockedHeightPx, setLockedHeightPx] = useState(null);
  const textareaRef = useRef(null);

  const dotsTimerRef = useRef(null);
  const waitingTimerRef = useRef(null);
  const runIdRef = useRef(0);

  const baseTextRef = useRef('');
  const dotCountRef = useRef(1);

  const WAITING_MSG = 'We’re processing your request, please wait a moment';

  const userIdRef = useRef(
    crypto?.randomUUID?.() ||
      `u_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
  );

  const autoResize = () => {
    if (lockedHeightPx) return;
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const max = 180;
    const h = Math.min(el.scrollHeight, max);
    el.style.height = h + 'px';
    el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden';
  };
  useEffect(() => {
    autoResize();
  }, [prompt, lockedHeightPx]);

  const typeOut = async (fullText, onStep, runId = runIdRef.current) => {
    let delay = 12;
    for (let i = 0; i <= fullText.length; i++) {
      if (runIdRef.current !== runId) return;
      onStep(fullText.slice(0, i));
      await new Promise(r => setTimeout(r, delay));
      if (i > 2000) delay = 3;
      if (i > 8000) delay = 0;
    }
  };

  const renderDotsFrame = () => {
    const base = baseTextRef.current;
    const dots = '.'.repeat(dotCountRef.current);
    setPrompt(base ? `${base} ${dots}` : dots);
  };

  const startDots = () => {
    stopDots();
    dotCountRef.current = 1;
    renderDotsFrame();
    dotsTimerRef.current = setInterval(() => {
      dotCountRef.current = (dotCountRef.current % 5) + 1;
      renderDotsFrame();
    }, 400);
  };

  const stopDots = () => {
    if (dotsTimerRef.current) {
      clearInterval(dotsTimerRef.current);
      dotsTimerRef.current = null;
    }
  };

  const scheduleWaitingText = (delayMs, thisRunId) => {
    if (waitingTimerRef.current) clearTimeout(waitingTimerRef.current);
    waitingTimerRef.current = setTimeout(() => {
      if (runIdRef.current !== thisRunId) return;
      baseTextRef.current = WAITING_MSG;
      setPhase('waiting');
      renderDotsFrame();
    }, delayMs);
  };

  useEffect(() => {
    return () => {
      stopDots();
      if (waitingTimerRef.current) clearTimeout(waitingTimerRef.current);
    };
  }, []);

  const doSubmit = async () => {
    const q = prompt.trim();
    if (phase !== 'input' || !q) return;

    const thisRunId = ++runIdRef.current;

    const el = textareaRef.current;
    if (el) setLockedHeightPx(el.offsetHeight + 'px');

    baseTextRef.current = '';
    setPhase('loading');
    setPrompt('');
    startDots();
    scheduleWaitingText(4000, thisRunId);

    const ATTEMPT_TIMEOUT_MS = 15000;
    const BASE_BACKOFF_MS = 1200;
    const MAX_BACKOFF_MS = 8000;

    const withTimeout = (p, ms) =>
      new Promise((resolve, reject) => {
        const to = setTimeout(() => reject(new Error('timeout')), ms);
        p.then(
          v => {
            clearTimeout(to);
            resolve(v);
          },
          e => {
            clearTimeout(to);
            reject(e);
          },
        );
      });

    let answer = null;
    let attempt = 0;

    while (runIdRef.current === thisRunId && answer == null) {
      attempt += 1;
      try {
        const res = await withTimeout(
          askCoreAI(q, userIdRef.current),
          ATTEMPT_TIMEOUT_MS,
        );
        if (runIdRef.current !== thisRunId) return;
        answer = res;
      } catch (_) {
        const backoff = Math.min(BASE_BACKOFF_MS * attempt, MAX_BACKOFF_MS);
        await new Promise(r => setTimeout(r, backoff));
      }
    }

    if (runIdRef.current !== thisRunId) return;

    stopDots();
    if (waitingTimerRef.current) clearTimeout(waitingTimerRef.current);

    if (answer) {
      baseTextRef.current = '';
      setLockedHeightPx(null);
      setPhase('typing');
      setPrompt('');
      await typeOut(answer || '(empty response)', t => setPrompt(t), thisRunId);
      if (runIdRef.current !== thisRunId) return;
      setPhase('answer');
    } else {
      baseTextRef.current = WAITING_MSG;
      setPhase('waiting');
      startDots();
    }
  };

  const clearField = () => {
    ++runIdRef.current;
    stopDots();
    if (waitingTimerRef.current) clearTimeout(waitingTimerRef.current);
    baseTextRef.current = '';
    dotCountRef.current = 1;

    setLockedHeightPx(null);
    setPrompt('');
    setPhase('input');
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const onSubmit = e => {
    e.preventDefault();
    doSubmit();
  };

  const onTextareaKeyDown = e => {
    if (e.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (phase === 'answer') return clearField();
      if (phase === 'input') doSubmit();
    }
    if (phase === 'answer' && e.key.length === 1) {
      e.preventDefault();
      clearField();
    }
  };

  const isLoading = phase === 'loading';
  const isWaiting = phase === 'waiting';
  const isTyping = phase === 'typing';
  const isAnswer = phase === 'answer';
  const isInput = phase === 'input';
  const disableSubmit = !isInput || !prompt.trim();

  const textareaClasses = [
    'w-full resize-none rounded-[14px] bg-transparent p-3 pr-16 outline-none transition-all duration-150',
    isTyping || isAnswer || isWaiting
      ? 'font-mono text-[15px] text-black'
      : 'text-[15px]',
    isLoading || isWaiting
      ? 'text-neutral-500 md:text-xl text-lg tracking-widest caret-transparent'
      : '',
  ].join(' ');

  return (
    <div className="w-full max-w-[650px]">
      <form
        onSubmit={onSubmit}
        action=""
        className="relative w-full max-w-[650px] rounded-[22px] border border-black bg-gradient-to-b from-[#eceef3] to-[#e6e8ed] p-4 shadow"
      >
        <textarea
          id="prompt"
          ref={textareaRef}
          rows={5}
          placeholder={
            isLoading || isWaiting
              ? ''
              : 'Ask about CoreAI: Services, Prices, how does it work?'
          }
          className={textareaClasses}
          value={prompt}
          onChange={e => isInput && setPrompt(e.target.value)}
          onInput={autoResize}
          onKeyDown={onTextareaKeyDown}
          disabled={!isInput}
          aria-busy={isLoading || isWaiting}
          style={{
            height: lockedHeightPx || undefined,
            overflowY: lockedHeightPx ? 'hidden' : undefined,
          }}
        />

        <button
          type="submit"
          aria-label="Send"
          disabled={disableSubmit}
          className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full border-2 border-black bg-[#ffe59a] shadow-[0_2px_0_rgrgba(0,0,0,0.35)] transition-transform duration-150 ease-out hover:scale-105 hover:bg-[#fcda73]"
        >
          <span className="translate-x-[1px] text-[20px] leading-none text-black">
            ▶
          </span>
        </button>

        {isAnswer && (
          <button
            type="button"
            onClick={clearField}
            aria-label="Clear"
            className="absolute top-5 right-5 grid h-8 w-8 place-items-center rounded-full border border-black/50 bg-white/80 backdrop-blur hover:bg-white transition"
            title="Clear and ask a new question"
          >
            <span className="text-lg leading-none">✕</span>
          </button>
        )}
      </form>
    </div>
  );
}
