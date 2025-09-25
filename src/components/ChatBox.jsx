import { useEffect, useRef, useState } from 'react';
import { askCoreAI } from '../lib/coreai';

export default function ChatBox() {
  const [prompt, setPrompt] = useState('');
  const [phase, setPhase] = useState('input');
  const [lockedHeightPx, setLockedHeightPx] = useState(null);
  const textareaRef = useRef(null);
  const loadingTimerRef = useRef(null);

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

  const typeOut = async (fullText, onStep) => {
    let delay = 12;
    for (let i = 0; i <= fullText.length; i++) {
      onStep(fullText.slice(0, i));
      await new Promise(r => setTimeout(r, delay));
      if (i > 2000) delay = 3;
      if (i > 8000) delay = 0;
    }
  };

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) clearInterval(loadingTimerRef.current);
    };
  }, []);

  const doSubmit = async () => {
    const q = prompt.trim();
    if (phase !== 'input' || !q) return;

    const el = textareaRef.current;
    if (el) setLockedHeightPx(el.offsetHeight + 'px');

    setPhase('loading');
    setPrompt('');

    let dots = 1;
    loadingTimerRef.current = setInterval(() => {
      setPrompt('•'.repeat(dots));
      dots = (dots % 5) + 1;
    }, 400);

    try {
      const answer = await askCoreAI(q, userIdRef.current);

      clearInterval(loadingTimerRef.current);
      loadingTimerRef.current = null;
      setLockedHeightPx(null);
      setPhase('typing');
      setPrompt('');

      await typeOut(answer || '(empty response)', partial =>
        setPrompt(partial),
      );
      setPhase('answer');
    } catch (err) {
      clearInterval(loadingTimerRef.current);
      loadingTimerRef.current = null;
      setLockedHeightPx(null);
      console.error('Chat request failed:', err);
      setPrompt('(error: failed to fetch response)');
      setPhase('answer');
    }
  };

  const clearField = () => {
    if (loadingTimerRef.current) {
      clearInterval(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
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
      if (phase === 'answer') {
        clearField();
        return;
      }
      if (phase === 'input') {
        doSubmit();
      }
    }
    if (phase === 'answer' && e.key.length === 1) {
      e.preventDefault();
      clearField();
    }
  };

  const isLoading = phase === 'loading';
  const isTyping = phase === 'typing';
  const isAnswer = phase === 'answer';
  const isInput = phase === 'input';
  const disableSubmit = !isInput || !prompt.trim();

  const textareaClasses = [
    'w-full resize-none rounded-[14px] bg-transparent p-3 pr-16 outline-none transition-all duration-150',
    isTyping || isAnswer ? 'font-mono text-[15px] text-black' : 'text-[15px]',
    isLoading
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
            isLoading
              ? ''
              : 'Ask about CoreAI: Services, Prices, how does it work?'
          }
          className={textareaClasses}
          value={prompt}
          onChange={e => isInput && setPrompt(e.target.value)}
          onInput={autoResize}
          onKeyDown={onTextareaKeyDown}
          disabled={!isInput}
          aria-busy={isLoading}
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
