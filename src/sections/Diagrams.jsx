import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState, useCallback } from 'react';
import SectionContainer from '@/components/SectionContainer';

export default function Diagrams() {
  const images = [
    { src: 'img/slide_1.png', alt: 'Diagram 1' },
    { src: 'img/slide_2.png', alt: 'Diagram 2' },
    { src: 'img/slide_3.png', alt: 'Diagram 3' },
    { src: 'img/slide_4.png', alt: 'Diagram 4' },
    { src: 'img/slide_5.png', alt: 'Diagram 5' },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const prev = () => emblaApi && emblaApi.scrollPrev();
  const next = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="bg-black py-10">
      <SectionContainer>
        <h2 className="font-mono text-white text-[clamp(28px,4vw,44px)] leading-tight tracking-tight relative z-10">
          &lt;AI Solutions&gt;
        </h2>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {images.map((img, i) => (
                <div key={i} className="min-w-0 flex-[0_0_100%]">
                  <div className="grid place-items-center h-[220px] sm:h-[300px] md:h-[380px] lg:h-[440px] xl:h-[520px]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      draggable={false}
                      className="max-h-full max-w-full object-contain select-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 md:left-5 top-1/2 -translate-y-1/2
                     rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                     grid place-items-center bg-white/15 hover:bg-white/25
                     text-white disabled:opacity-40 transition"
          >
            ◀
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 md:right-5 top-1/2 -translate-y-1/2
                     rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                     grid place-items-center bg-white/15 hover:bg-white/25
                     text-white disabled:opacity-40 transition"
          >
            ▶
          </button>
        </div>
      </SectionContainer>
    </section>
  );
}
