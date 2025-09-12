export default function Services() {
  const cards = [
    {
      img: 'img/header1.png',
      alt: 'Process Automation',
      tag: 'Process Automation',
      pill: 'bg-[#9fd7ff] font-mono',
    },
    {
      img: 'img/header2.png',
      alt: 'Digital Coworkers',
      tag: 'Digital Coworkers',
      pill: 'bg-[#ffe59a] font-mono',
    },
    {
      img: 'img/header3.png',
      alt: 'Agentic AI Strategy',
      tag: 'Agentic AI Strategy',
      pill: 'bg-[#e6e6e6] font-mono',
    },
  ];

  return (
    <section id="services" className="relative py-10">
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-3/4 bg-cover bg-center opacity-30 blur-[2px]"
        style={{ backgroundImage: "url('img/afenticAi2.png')" }}
      />

      <div className="absolute right-0 top-0 h-full w-1/4 bg-[#fdfbea] bg-[radial-gradient(rgba(0,0,0,0.28)_1px,transparent_1px)] [background-size:10px_10px] z-0" />

      <div className="absolute right-0 top-0 h-full w-1/4 hidden sm:flex items-end justify-center pb-6 z-10">
        <img
          src="img/aws.png"
          alt="AWS Partner"
          className="sm:w-[120px] md:w-[140px] lg:w-[140px] rounded-md bg-white mb-10 shadow"
          loading="lazy"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {cards.map(s => (
            <figure key={s.tag} className="relative">
              <img
                src={s.img}
                alt={s.alt}
                className="block aspect-[16/9] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="pointer-events-none absolute -right-3 bottom-5 md:bottom-6">
                <span
                  className={`inline-block rounded-full border border-black px-7 py-[6px] text-sm shadow-[4px_4px_0_rgba(0,0,0,0.85)] ${s.pill}`}
                >
                  {s.tag}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="relative mt-10 flex justify-center md:pr-[25%]">
          <form className="relative w-full max-w-[650px] rounded-[22px] border border-black bg-gradient-to-b from-[#eceef3] to-[#e6e8ed] p-4 shadow">
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
              className="absolute bottom-3 right-3 grid h-12 w-12 place-items-center rounded-full border-2 border-black bg-[#ffe59a] shadow-[0_2px_0_rgrgba(0,0,0,0.35)]"
            >
              <span className="translate-x-[1px] text-[20px] leading-none text-black">
                ▶
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
