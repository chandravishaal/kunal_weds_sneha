import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/scenes/Hero";
import MeetCouple from "@/components/scenes/MeetCouple";
import Countdown from "@/components/scenes/Countdown";
import Timeline from "@/components/scenes/Timeline";
import BaraatRoute from "@/components/scenes/BaraatRoute";
// import Destination from "@/components/scenes/Destination";
import CalendarCard from "@/components/scenes/CalendarCard";
import FinalReveal from "@/components/scenes/FinalReveal";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = ["|| शुभ विवाह ||", "KUNAL & SNEHA", "21 · 11 · 2026", "RANCHI, JHARKHAND"];

function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-gradient-to-r from-velvet/70 via-plum/60 to-velvet/70 py-4" data-testid="marquee" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((half) => (
          <div key={half} aria-hidden={half === 1} className="flex items-center">
            {MARQUEE_ITEMS.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-10 whitespace-nowrap pr-10 font-display text-lg font-semibold tracking-[0.28em] text-ivory/85"
              >
                {item}
                <svg width="12" height="12" viewBox="0 0 14 14" fill="#C5A16A">
                  <path d="M7 0 L8.6 5.4 L14 7 L8.6 8.6 L7 14 L5.4 8.6 L0 7 L5.4 5.4 Z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Story({ revealed }: { revealed: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "10");
        gsap.fromTo(
          el,
          { yPercent: -speed / 2 },
          {
            yPercent: speed / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} aria-hidden={!revealed}>
      <Hero revealed={revealed} />
      <MeetCouple />
      <Countdown />
      <Marquee />
      <Timeline />
      <BaraatRoute />
      {/* <Destination /> */}
      <CalendarCard />
      <FinalReveal />
    </main>
  );
}
