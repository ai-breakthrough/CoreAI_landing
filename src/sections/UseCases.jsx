import SectionContainer from '@/components/SectionContainer';

export default function UseCases() {
  const cases = [
    {
      img: 'img/case1.png',
      title: 'Production Planning',
      text: 'Agents coordinate production schedules across multiple lines, optimize material flow, and auto-adjust capacity from demand & supply constraints.',
    },
    {
      img: 'img/case2.png',
      title: 'Demand & Supply Forecasting',
      text: 'Forecast across retail & loyalty, accounting for seasonality, promos, and market trends — then coordinate execution.',
    },
  ];

  const btnPrimary =
    'font-mono text-sm rounded-full bg-[#ffe59a] px-8 py-2 text-black shadow-[4px_4px_0_rgba(0,0,0,0.85)] transition-all duration-200 will-change-transform hover:bg-[#ffd766] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(0,0,0,0.85)] active:translate-y-[1px] active:shadow-[2px_2px_0_rgba(0,0,0,0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffe59a]';

  const btnNeutral =
    'font-mono text-sm rounded-full border border-black bg-[#e4e5e7] px-8 py-2 text-black shadow-[4px_4px_0_rgba(0,0,0,0.85)] transition-all duration-200 will-change-transform hover:bg-[#dfe0e3] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(0,0,0,0.85)] active:translate-y-[1px] active:shadow-[2px_2px_0_rgba(0,0,0,0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#e4e5e7]';

  return (
    <section id="use-cases" className="bg-[#9fd7e5] py-12">
      <SectionContainer>
        <div className="mx-auto max-w-7xl px-5">
          <header className="mb-6 -mt-6">
            <h2 className="font-mono text-[clamp(28px,4vw,44px)] leading-tight tracking-tight relative z-10">
              &lt;Use Cases&gt;
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {cases.map(c => (
                <div
                  key={c.title}
                  className="font-mono overflow-hidden rounded-none border border-black bg-[#e4e5e7] shadow"
                >
                  <div className="p-4 pb-0">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="h-40 w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-l font-semibold">{c.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {c.text}
                    </p>
                    <div className="mt-3">
                      <button className={btnPrimary}>More Information</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <article>
              <h2 className="text-3xl font-semibold">
                AI Social Assistant Ecosystem
              </h2>

              <figure className="my-6">
                <img
                  src="img/afenticAi2.png"
                  alt="AI Social Assistant Ecosystem"
                  className="w-full max-w-[420px] border border-black"
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <div className="max-w-[430px]">
                <ul className="mb-6 space-y-2 font-mono text-sm text-[#1b5c6b]">
                  <li>+ Over 500 agents connected into 1 system</li>
                  <li>+ Orchestrated domain-specific agents</li>
                  <li>+ AI-native developers trained in-house</li>
                  <li>+ Hybrid Business Model</li>
                </ul>

                <p className="mb-6 font-mono leading-relaxed text-sm text-[#1b5c6b]">
                  AI Social Assistant Ecosystem is an agentic platform that
                  helps newcomers navigate state welfare, legal, and
                  bureaucratic complexity — fast and reliably.
                </p>

                <section>
                  <h4 className="font-semibold font-mono text-[#103841]">
                    Problem
                  </h4>
                  <p className="mb-4 font-mono leading-relaxed text-sm text-[#1b5c6b]">
                    Language barriers, limited immediate help, long request
                    cycles, and unfamiliarity with public systems create delays
                    and poor outcomes.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold font-mono text-[#103841]">
                    Solution
                  </h4>
                  <p className="mb-4 font-mono leading-relaxed text-sm text-[#1b5c6b]">
                    One ecosystem with 100-language accessibility, real-time
                    verified legal/public sources, and step-by-step guidance.
                    Context-aware suggestions, personal use-case analysis, and
                    recommendations. Now civilguide helps ~10M people across
                    Europe.
                  </p>
                </section>

                <button className={btnNeutral}>Read more cases</button>
              </div>
            </article>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
