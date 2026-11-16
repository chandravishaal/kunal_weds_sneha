import hero from "@/assets/scenes/hero.webp";
import { motion, type Transition } from "framer-motion";
import { ChevronDown } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const scrollToNext = () => {
  const el = document.getElementById("scene-02");
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (el && lenis) lenis.scrollTo(el, { offset: -12 });
  else el?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero({ revealed }: { revealed: boolean }) {
  const anim = (delay: number): {
    initial: { opacity: number; y: number };
    animate: { opacity: number; y: number };
    transition: Transition;
  } => ({
    initial: { opacity: 0, y: 24 },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { delay, duration: 0.8, ease: EASE },
  });

  return (
    <section
      id="scene-01"
      data-testid="scene-hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-[64svh] overflow-hidden sm:inset-0 sm:h-auto">
        <img
          src={hero}
          alt="A twilight garden with a glowing pathway leading to a wedding mandap"
          fetchPriority="high"
          data-parallax="14"
          className="will-change-transform absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover object-center sm:top-0 sm:h-[118%]"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-b from-plum/90 via-plum/45 to-plum sm:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-plum/45 via-transparent to-velvet/25 sm:block" />
        <div
          className="absolute inset-x-0 bottom-0 hidden h-[58%] bg-gradient-to-t from-plum via-plum/70 to-transparent sm:block"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-plum/70 to-plum sm:hidden"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-28 sm:pb-24">
        <motion.p {...anim(0.3)} className="font-hindi text-xs font-medium tracking-[0.34em] text-gold [text-shadow:0_2px_14px_rgba(22,12,28,0.85)] sm:text-sm">
          || शुभ विवाह निमंत्रण ||
        </motion.p>

        <h1 className="mt-4 font-display font-semibold leading-[0.98] [filter:drop-shadow(0_6px_26px_rgba(22,12,28,0.9))]">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="gold-text block text-[15.5vw] sm:text-8xl lg:text-9xl"
              initial={{ y: "112%" }}
              animate={revealed ? { y: 0 } : { y: "112%" }}
              transition={{ delay: 0.45, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              data-testid="hero-names"
            >
              KUNAL &amp; SNEHA
            </motion.span>
          </span>
        </h1>

        <motion.p {...anim(0.85)} className="mt-4 text-sm font-semibold uppercase tracking-[0.4em] text-rose [text-shadow:0_2px_14px_rgba(22,12,28,0.8)] sm:text-lg">
          A November Wedding Story
        </motion.p>

        <motion.p {...anim(1.0)} className="mt-7 font-hindi text-xl font-semibold text-ivory sm:text-2xl">
          आप सादर आमंत्रित हैं
        </motion.p>
        <motion.p {...anim(1.1)} className="mt-1.5 max-w-md text-sm font-medium text-ivory/90 sm:text-base">
          You're invited to celebrate with us.
        </motion.p>

        <motion.button
          {...anim(1.3)}
          type="button"
          onClick={scrollToNext}
          data-testid="hero-scroll-cue"
          aria-label="Scroll down to explore the invitation"
          className="group mt-10 flex items-center gap-3 rounded-full border border-gold/35 bg-plum/30 px-5 py-2.5 text-[11px] font-bold tracking-[0.3em] text-gold backdrop-blur-sm transition-colors duration-300 hover:bg-gold/15"
        >
          <ChevronDown className="h-4 w-4 animate-chevron-down" strokeWidth={2.4} />
          SCROLL &amp; EXPLORE
          <span className="font-hindi text-[10px] tracking-normal text-ivory/70">नीचे स्क्रॉल करें</span>
        </motion.button>
      </div>
    </section>
  );
}
