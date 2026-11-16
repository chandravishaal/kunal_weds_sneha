import finalImg from "@/assets/scenes/final.webp";
import finalM from "@/assets/scenes/final_m.webp";
// import floralBed from "@/assets/decor/floral-bed.webp";
import Reveal from "@/components/Reveal";

export default function FinalReveal() {
  return (
    <section
      id="scene-08"
      data-testid="scene-final"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <picture>
        <source media="(max-width: 639px)" srcSet={finalM} />
        <img
          src={finalImg}
          alt="Kunal and Sneha viewed from behind, looking towards a glowing wedding mandap in a twilight garden"
          loading="lazy"
          data-parallax="12"
          className="will-change-transform absolute inset-0 h-[116%] w-full object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-plum via-plum/55 to-plum" aria-hidden="true" />
      {/* <img
        src={floralBed}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] w-full opacity-90 mix-blend-screen"
      /> */}

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-32 pt-24 text-center sm:pb-16">
        <Reveal>
          <p className="font-display text-2xl italic leading-snug text-ivory/95 sm:text-3xl">
            "With love, we invite you to be part of our beginning."
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="gold-text mt-10 font-display text-5xl font-semibold tracking-wide [filter:drop-shadow(0_6px_26px_rgba(22,12,28,0.9))] sm:text-7xl" data-testid="final-names">
            KUNAL &amp; SNEHA
          </h2>
          <p className="mt-4 text-sm font-bold tracking-[0.42em] text-rose [text-shadow:0_2px_16px_rgba(22,12,28,0.9)] sm:text-base">
            21 NOVEMBER 2026
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mx-auto mt-12 flex max-w-xs items-center gap-3 text-gold/80" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/70" />
            <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
              <path d="M7 0 L8.6 5.4 L14 7 L8.6 8.6 L7 14 L5.4 8.6 L0 7 L5.4 5.4 Z" />
            </svg>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/70" />
          </div>
          <p className="mt-8 font-display text-lg italic text-ivory/90 sm:text-xl">Lovingly designed by</p>
          <p
            className="gold-text mt-1.5 font-display text-2xl font-semibold italic tracking-wide [filter:drop-shadow(0_3px_16px_rgba(197,161,106,0.5))] sm:text-3xl"
            data-testid="credit-line"
          >
            Dulha ka Bhai &amp; Dulhan ka Devar 🫶
          </p>
        </Reveal>
      </div>
    </section>
  );
}
