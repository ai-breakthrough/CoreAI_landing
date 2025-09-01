import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';

function useParallax(range = 40) {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, [0, 1], [0, range]);
}

const SectionContainer = ({ className = '', children }) => (
  <div className={`mx-auto w-full max-w-[1040px] px-5 ${className}`}>
    {children}
  </div>
);

function SocialLink({
  Icon,
  label,
  outline = false,
  inverse = false,
  size = 10,
  filled = false,
}) {
  const base =
    'inline-flex items-center justify-center rounded-full transition hover:scale-[1.06]';

  const sizeCls =
    size === 12
      ? 'h-12 w-12'
      : size === 11
      ? 'h-11 w-11'
      : size === 10
      ? 'h-10 w-10'
      : 'h-11 w-11';

  let style = '';
  if (filled) {
    style = 'bg-black text-white border border-black';
  } else if (outline) {
    style = `${
      inverse ? 'border-white/50 text-white' : 'border-black/45 text-black'
    } border`;
  } else {
    style = inverse ? 'text-white' : 'text-black';
  }

  return (
    <a href="#" aria-label={label} className={`${base} ${sizeCls} ${style}`}>
      <Icon className="h-[25px] w-[25px]" />
    </a>
  );
}

const DotsSep = () => (
  <div
    aria-hidden
    className="h-16 w-full bg-[radial-gradient(rgba(0,0,0,0.28)_1px,transparent_1px)] [background-size:10px_10px]"
    style={{ backgroundColor: '#fdfbea' }}
  />
);

export default function CoreAI() {
  const parallaxBg = useParallax(12);
  const parallaxSlow = useParallax(18);
  const parallaxMed = useParallax(32);
  const parallaxFast = useParallax(48);
  const parallaxProblemsImg = useParallax(22);

  return (
    <div className="min-h-screen bg-[#e7dfcc] text-[#0e0f0f]">
      {/* ================= HEADER ================= */}

      <header
        role="banner"
        className="relative border-b border-black"
        style={{ '--split': '68%' }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#fef3b0_0_calc(var(--split)_-_0.5px),#000_calc(var(--split)_-_0.5px)_calc(var(--split)_+_0.5px),#9fd7e5_calc(var(--split)_+_0.5px)_100%)]" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-2 px-5 py-3.5 md:grid-cols-[150px_1fr_340px] md:items-center">
          <aside className="font-mono text-base lowercase leading-tight">
            <p>
              humans <br className="hidden sm:block" />
              working <br className="hidden sm:block" />
              side-by-side <br className="hidden sm:block" />
              with <br className="hidden sm:block" />
              ai agents
            </p>
          </aside>

          <a href="#top" aria-label="CoreAI Home" className="flex items-center">
            <h1 className="font-mono text-[64px] leading-none tracking-tight -ml-4">
              /CoreAI
            </h1>
          </a>

          <aside>
            <p className="text-[15px] leading-snug text-black/90">
              Copenhagen-based consultancy specializing in advanced Generative
              AI and Agentic AI solutions.
            </p>
            <nav aria-label="Social media" className="mt-3 flex gap-3">
              <SocialLink
                Icon={FaFacebookF}
                label="Facebook"
                filled
                size={11}
              />
              <SocialLink
                Icon={FaInstagram}
                label="Instagram"
                filled
                size={11}
              />
              <SocialLink
                Icon={FaLinkedinIn}
                label="LinkedIn"
                filled
                size={11}
              />
              <SocialLink Icon={FaTwitter} label="Twitter" filled size={11} />
            </nav>
          </aside>
        </div>
      </header>

      {/* ================= SERVICES ================= */}

      <section id="services" className="relative py-10">
        {/* горошок */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/4 bg-[#fdfbea] bg-[radial-gradient(rgba(0,0,0,0.28)_1px,transparent_1px)] [background-size:10px_10px]" />

        <motion.div
          className="pointer-events-none absolute left-0 top-0 h-full w-3/4 bg-cover bg-center opacity-30 blur-[2px]"
          style={{ backgroundImage: 'url(img/afenticAi2.png)', y: parallaxBg }}
        />

        <div className="relative mx-auto max-w-7xl px-5">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {[
              {
                img: 'img/header1.png',
                alt: 'Process Automation',
                tag: 'Process Automation',
                pill: 'bg-[#9fd7ff]',
              },
              {
                img: 'img/header2.png',
                alt: 'Digital Coworkers',
                tag: 'Digital Coworkers',
                pill: 'bg-[#ffe59a]',
              },
              {
                img: 'img/header3.png',
                alt: 'Agentic AI Strategy',
                tag: 'Agentic AI Strategy',
                pill: 'bg-[#e6e6e6]',
              },
            ].map((s, i) => {
              const y =
                i === 0 ? parallaxSlow : i === 1 ? parallaxMed : parallaxFast;
              return (
                <motion.figure
                  key={s.tag}
                  className="relative"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <motion.img
                    src={s.img}
                    alt={s.alt}
                    className="block aspect-[16/9] w-full object-cover"
                    loading="lazy"
                    style={{ y }}
                  />
                  <figcaption className="pointer-events-none absolute -right-3 bottom-5 md:bottom-6">
                    <span
                      className={`inline-block rounded-full border border-black px-7 py-[6px] text-sm shadow-[4px_4px_0_rgba(0,0,0,0.85)] ${s.pill}`}
                    >
                      {s.tag}
                    </span>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>

          <div className="relative mt-10 flex w-full items-center justify-center">
            <motion.form
              className="relative w-full max-w-[650px] rounded-[22px] border border-black bg-gradient-to-b from-[#eceef3] to-[#e6e8ed] p-4 shadow"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <label htmlFor="prompt" className="sr-only">
                Ask about CoreAI
              </label>
              <textarea
                id="prompt"
                rows={5}
                placeholder="Ask about CoreAI: Services, Prices, how does it work?"
                className="w-full resize-none rounded-[14px] bg-transparent p-3 outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                className="absolute bottom-3 right-3 grid h-12 w-12 place-items-center rounded-full border-2 border-black bg-[#ffe59a] shadow-[0_2px_0_rgba(0,0,0,0.35)]"
              >
                <span className="translate-x-[1px] text-[20px] leading-none text-black">
                  ▶
                </span>
              </button>
            </motion.form>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-end pr-5">
              <img
                src="img/aws.png"
                alt="AWS Partner"
                className="w-[140px] rounded-md bg-white p-2 shadow"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROBLEMS ================= */}

      <section id="problems" className="bg-black text-white">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-[0.4fr_0.6fr]">
          <motion.div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: "url('img/afenticAi.png')",
              y: parallaxProblemsImg,
            }}
            role="img"
            aria-label="Agents collage"
          />

          <div className="px-5 py-6 md:px-6">
            <header className="mb-4">
              <h2 className="font-mono text-[clamp(28px,4.8vw,40px)] tracking-tight border border-white px-4 py-2">
                &lt;Problems that we solve/&gt;
              </h2>
            </header>

            <ul className="grid gap-3">
              {[
                'Manual workflows that slow us down.',
                'Internal knowledge is buried across tools and teams.',
                'Data stored, but no one knows how to extract useful insights.',
                "Internal tools don't talk to each other (copy-paste nightmare).",
                'High Administrative Overhead',
              ].map(p => (
                <li key={p} className="border border-white px-5 py-3">
                  “{p}”
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <DotsSep />

      {/* ================= WHY AGENTIC ================= */}

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
                <strong>Market Size:</strong> The AI Agents market is projected
                to grow from <span className="font-semibold">$10B</span> in 2024
                to roughly <span className="font-semibold">$196.6B</span> by
                2030.
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
                <div className="text-sm text-black/70">
                  Acceleration horizon
                </div>
              </div>
              <div>
                <span className="font-semibold">$196.6B</span>
                <div className="text-sm text-black/70">
                  Agent market by 2030
                </div>
              </div>
              <div>
                <span className="font-semibold">$232B+</span>
                <div className="text-sm text-black/70">
                  LLM + Agentic market
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <DotsSep />

      {/* ================= USE CASES ================= */}

      <section id="use-cases" className="bg-[#9fd7e5] py-12">
        <SectionContainer>
          <div className="mx-auto max-w-7xl px-5">
            <header className="mb-6 -mt-6">
              <h2 className="font-mono text-[clamp(28px,4vw,44px)] leading-tight tracking-tight relative z-10">
                &lt;Use Cases&gt;
              </h2>
            </header>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="grid gap-6">
                {[
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
                ].map(c => (
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
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{c.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-700">
                        {c.text}
                      </p>
                      <div className="mt-3">
                        <button className="font-mono text-sm rounded-full bg-[#ffe59a] px-8 py-2 text-black shadow-[4px_4px_0_rgba(0,0,0,0.85)]">
                          More Information
                        </button>
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
                    bureaucratic complexity — fast and reliably..
                  </p>

                  <section>
                    <h4 className="font-semibold">Problem</h4>
                    <p className="mb-4 font-mono leading-relaxed text-sm text-[#1b5c6b]">
                      Language barriers, limited immediate help, long request
                      cycles, and unfamiliarity with public systems create
                      delays and poor outcomes.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold">Solution</h4>
                    <p className="mb-4 font-mono leading-relaxed text-sm text-[#1b5c6b]">
                      One ecosystem with 100-language accessibility, real-time
                      verified legal/public sources, and step-by-step guidance.
                      Context-aware suggestions, personal use-case analysis, and
                      recommendations. Now civilguide helps ~10M people across
                      Europe.
                    </p>
                  </section>

                  <button className="rounded-full border border-black bg-[#e4e5e7] px-8 py-2 text-black font-mono">
                    Read more cases
                  </button>
                </div>
              </article>
            </div>
          </div>
        </SectionContainer>
      </section>

      <DotsSep />

      <section className="bg-black h-[500px]">
        <SectionContainer />
      </section>

      <DotsSep />

      {/* ================= FOOTER ================= */}

      <footer className="bg-black py-12 text-white">
        <SectionContainer>
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-5 md:grid-cols-3">
            <nav aria-label="Footer menu" className="flex flex-col gap-2">
              {[
                { href: '#top', label: 'Home' },
                { href: '#use-cases', label: 'Read More Cases' },
                { href: '#', label: 'Blog' },
                { href: '#use-cases', label: 'Cases' },
                { href: '#', label: 'Agentic AI Statistics' },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="inline-block transition will-change-transform hover:scale-[1.03] hover:bg-gradient-to-r hover:from-[#9fd7ff] hover:to-[#f8d364] hover:bg-clip-text hover:text-transparent"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col items-center mt-8 md:mt-12">
              <p className="font-mono text-[clamp(36px,4.5vw,56px)] text-[#9fd7ff] leading-none">
                /CoreAI
              </p>
              <p className="mt-3 text-xs opacity-80">
                All rights reserved CoreAI 2025
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <SocialLink Icon={FaFacebookF} label="Facebook" outline inverse />
              <SocialLink
                Icon={FaInstagram}
                label="Instagram"
                outline
                inverse
              />
              <SocialLink
                Icon={FaLinkedinIn}
                label="LinkedIn"
                outline
                inverse
              />
              <SocialLink Icon={FaTwitter} label="Twitter" outline inverse />
            </div>
          </div>
        </SectionContainer>
      </footer>
    </div>
  );
}
