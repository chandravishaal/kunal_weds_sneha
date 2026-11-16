import Reveal from "@/components/Reveal";
import dance from "@/assets/characters/dance.webp";

export default function MeetCouple() {
  return (
    <section
      id="scene-02"
      data-testid="scene-couple"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      <div className="aurora aurora-a" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-6 px-6 sm:grid-cols-2 sm:gap-14">
        <Reveal>
          <div className="flex items-center gap-3 text-gold" aria-hidden="true">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/70" />
            <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
              <path d="M7 0 L8.6 5.4 L14 7 L8.6 8.6 L7 14 L5.4 8.6 L0 7 L5.4 5.4 Z" />
            </svg>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/70" />
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ivory sm:text-5xl">
            Meet <span className="gold-text">Kunal &amp; Sneha</span>
          </h2>
          <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-ivory/90 sm:text-lg">
            Two families. Countless memories. One beautiful beginning.
          </p>
          <p className="mt-4 max-w-md font-hindi text-base font-medium leading-relaxed text-rose sm:text-lg">
            दो परिवारों का मिलन, एक खूबसूरत नई शुरुआत।
          </p>
          <div className="mt-8 flex items-center gap-4" aria-hidden="true">
            <span className="h-2 w-2 animate-twinkle rounded-full bg-gold" />
            <span className="h-1.5 w-1.5 animate-twinkle rounded-full bg-rose [animation-delay:0.7s]" />
            <span className="h-2.5 w-2.5 animate-twinkle rounded-full bg-marigold [animation-delay:1.4s]" />
          </div>
        </Reveal>

        <Reveal delay={0.15} tilt className="flex justify-center sm:justify-end">
          <div className="relative flex items-center justify-center py-2" data-testid="couple-portraits">
            {/* soft golden glow — no ring */}
            <div
              className="absolute h-72 w-72 rounded-full opacity-70 blur-2xl sm:h-96 sm:w-96"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 55%, rgba(197,161,106,0.34), rgba(93,72,144,0.2) 46%, transparent 72%)",
              }}
              aria-hidden="true"
            />
            {/* floor glow */}
            <div
              className="absolute bottom-0 h-12 w-56 rounded-[50%] blur-md sm:w-64"
              style={{ background: "radial-gradient(ellipse, rgba(197,161,106,0.42), transparent 70%)" }}
              aria-hidden="true"
            />
            <img
              src={dance}
              alt="Kunal twirling Sneha in celebration"
              loading="lazy"
              className="animate-floaty relative z-10 h-60 w-auto drop-shadow-[0_24px_36px_rgba(0,0,0,0.55)] sm:h-72"
            />
            <span className="absolute bottom-12 left-8 h-1.5 w-1.5 animate-twinkle rounded-full bg-gold" aria-hidden="true" />
            <span className="absolute bottom-6 right-10 h-2 w-2 animate-twinkle rounded-full bg-rose [animation-delay:0.9s]" aria-hidden="true" />
            <span className="absolute bottom-14 right-3 h-1 w-1 animate-twinkle rounded-full bg-marigold [animation-delay:1.6s]" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
