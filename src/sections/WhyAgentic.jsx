import SectionContainer from '@/components/SectionContainer';

export default function WhyAgentic() {
  return (
    <section id="why-agentic" className="relative bg-[#fef3b0]">
      <SectionContainer>
        <div className="mx-auto max-w-7xl px-5 pt-2 pb-4">
          <header className="mb-6 -mt-6">
            <h2 className="font-mono text-[clamp(28px,4vw,44px)] leading-tight tracking-tight relative z-10">
              &lt;Why Agentic AI?&gt;
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <p className="leading-relaxed">
              <strong>Market Size:</strong> The AI Agents market is projected to
              grow from <span className="font-semibold">$10B</span> in 2024 to
              roughly <span className="font-semibold">$196.6B</span> by 2030.
            </p>
            <p className="leading-relaxed">
              The combined LLM + Agentic AI market may expand from{' '}
              <span className="font-semibold">$12.2B</span> (2024) to over{' '}
              <span className="font-semibold">$232B</span> by 2030–2034 with
              CAGRs &gt; 35–44%.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 text-[clamp(18px,2.4vw,26px)] md:grid-cols-4">
            <div>
              <span className="font-semibold">35–44%</span>
              <div className="text-sm text-black/70">Estimated CAGR</div>
            </div>
            <div>
              <span className="font-semibold">2030</span>
              <div className="text-sm text-black/70">Acceleration horizon</div>
            </div>
            <div>
              <span className="font-semibold">$196.6B</span>
              <div className="text-sm text-black/70">Agent market by 2030</div>
            </div>
            <div>
              <span className="font-semibold">$232B+</span>
              <div className="text-sm text-black/70">LLM + Agentic market</div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
