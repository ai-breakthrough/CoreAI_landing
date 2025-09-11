export default function Problems() {
  return (
    <section id="problems" className="bg-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr]">
        <div
          className="hidden lg:block h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('img/afenticAi.png')" }}
          role="img"
          aria-label="Agents collage"
        />

        <div className="px-5 py-6 md:px-6">
          <header className="mb-4">
            <h2
              className="
                font-mono tracking-tight border border-white px-4 py-2 leading-none
                whitespace-nowrap      
                text-[clamp(18px,6vw,22px)]
                sm:text-[clamp(20px,5vw,26px)]
                md:text-[clamp(22px,4.2vw,30px)]
                lg:text-[clamp(24px,3.6vw,34px)]
                xl:text-[clamp(26px,3vw,40px)]
              "
            >
              &lt;Problems that we solve/&gt;
            </h2>
          </header>

          <ul className="font-mono grid gap-3">
            {[
              'Manual workflows that slow us down.',
              'Internal knowledge is buried across tools and teams.',
              'Data stored, but no one knows how to extract useful insights.',
              "Internal tools don't talk to each other. (copy-paste nightmare)",
              'High Administrative Overhead.',
            ].map(p => (
              <li key={p} className="border border-white px-5 py-3">
                {p.startsWith("Internal tools don't talk to each other.") ? (
                  <>
                    &ldquo;Internal tools don't talk to each other.{'" '}
                    <span className="font-mono text-white/80">
                      (copy-paste nightmare)
                    </span>
                  </>
                ) : (
                  <>“{p}”</>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
