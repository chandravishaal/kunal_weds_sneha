import { Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { EVENTS } from "@/config/site";
import tilak from "@/assets/scenes/tilak.webp";
import mehendi from "@/assets/scenes/mehendi.webp";
import kalyani from "@/assets/scenes/kalyani.webp";
import baraat from "@/assets/scenes/baraat.webp";
import journey from "@/assets/scenes/journey.webp";
import floralBed from "@/assets/decor/floral-bed.webp";

const IMAGES: Record<string, { src: string; alt: string; pos?: string }> = {
  tilak: { src: tilak, alt: "Tilak ceremony with a decorated thali, marigolds and lanterns", pos: "object-[50%_28%]" },
  mehendi: { src: mehendi, alt: "Sneha showing her decorated mehendi hands while Kunal smiles playfully", pos: "object-[50%_28%]" },
  kalyani: { src: kalyani, alt: "Decorated kalash and mandap preparation with marigolds and brass lamps" },
  wedding: { src: baraat, alt: "Kunal as the groom with a decorated white horse during the baraat", pos: "object-[62%_center]" },
};

export default function Timeline() {
  return (
    <section
      id="timeline"
      data-testid="scene-timeline"
      className="relative bg-gradient-to-b from-plum/60 via-velvet/40 to-plum/60 px-5 py-28 sm:py-36"
    >
      <div className="aurora aurora-b" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal tilt>
          <div className="relative overflow-hidden rounded-[2rem] shadow-gold-soft ring-1 ring-gold/30">
            <img
              src={journey}
              alt="Kunal and Sneha standing together in the lantern-lit wedding garden"
              loading="lazy"
              className="h-60 w-full object-cover object-[50%_30%] sm:h-80"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/85 via-transparent to-plum/30"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-ivory/10"
              aria-hidden="true"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <div className="flex items-center justify-center gap-3 text-gold" aria-hidden="true">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/70" />
            <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
              <path d="M7 0 L8.6 5.4 L14 7 L8.6 8.6 L7 14 L5.4 8.6 L0 7 L5.4 5.4 Z" />
            </svg>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/70" />
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ivory sm:text-5xl">
            The Four-Day <span className="gold-text">Story</span>
          </h2>
          <p className="mt-3 font-hindi text-lg font-medium text-rose">प्रेम और रस्मों के चार दिन</p>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto mt-20 max-w-3xl sm:mt-24">
        <div className="tl-line" aria-hidden="true" />
        <div className="tl-dots" aria-hidden="true" />
        <span className="travel-orb" aria-hidden="true" />

        {EVENTS.map((ev, idx) => (
          <Reveal key={ev.id} tilt className="relative mb-14 last:mb-0 sm:mb-20">
            <span className="absolute left-6 top-9 z-10 -translate-x-1/2 sm:left-1/2" aria-hidden="true">
              <span className="block h-3.5 w-3.5 rotate-45 rounded-[3px] bg-gold shadow-gold-glow ring-4 ring-plum" />
              <span className="node-ping" />
            </span>
            <article
              data-testid={`timeline-event-${idx + 1}`}
              className={`ml-12 sm:ml-0 sm:w-[calc(50%-3rem)] ${
                idx % 2 === 1 ? "sm:ml-auto" : ""
              } rounded-[2rem] shadow-gold-soft ring-1 ring-gold/25`}
            >
              <div className="relative h-52 overflow-hidden rounded-t-[2rem] sm:h-60">
                <img
                  src={IMAGES[ev.id].src}
                  alt={IMAGES[ev.id].alt}
                  loading="lazy"
                  width={1264}
                  height={848}
                  className={`h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04] ${IMAGES[ev.id].pos ?? ""}`}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="relative z-10 mx-3 -mt-14 mb-3 rounded-3xl bg-plum/45 p-5 ring-1 ring-gold/30 backdrop-blur-xl sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="chip">
                    {ev.day} • {ev.weekday}
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.2em] text-ivory/70">{ev.date}</span>
                </div>
                <h3 className="mt-3 font-hindi text-xl font-semibold leading-snug text-ivory sm:text-2xl">
                  {ev.titleHi}
                </h3>
                <p className="mt-1 font-display text-lg font-medium italic text-rose sm:text-xl">{ev.titleEn}</p>
                {ev.time && (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold/10 px-3.5 py-1.5 text-xs font-bold text-gold">
                    <Clock className="h-3.5 w-3.5" strokeWidth={2.4} />
                    {ev.time}
                  </p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <img
        src={floralBed}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full opacity-60 mix-blend-screen"
      />
    </section>
  );
}
