import { useEffect, useRef } from "react";
import { simpleMode } from "@/lib/motion";

/** Brief celebratory shower: champagne-gold specks, ivory particles, marigold petals. */
export default function ParticleShower({ onDone }: { onDone: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const N = simpleMode() ? 16 : 54;
    const colors = ["#C5A16A", "#C5A16A", "#E9CE96", "#F7EFE7", "#D99538", "#D7A0A8"];
    const parts: HTMLElement[] = [];

    for (let i = 0; i < N; i += 1) {
      const el = document.createElement("div");
      const size = 3 + Math.random() * 6;
      const petal = Math.random() < 0.2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      el.style.cssText = `position:absolute;top:-5vh;left:${Math.random() * 100}%;width:${size}px;height:${
        petal ? size * 0.62 : size
      }px;border-radius:${petal ? "62% 38% 62% 38%" : "50%"};background:${color};opacity:0;will-change:transform,opacity;pointer-events:none;box-shadow:0 0 6px rgba(197,161,106,0.5);`;
      host.appendChild(el);
      parts.push(el);

      const drift = Math.random() * 150 - 75;
      const dur = 1600 + Math.random() * 1500;
      const delay = Math.random() * 750;
      const rot = Math.random() * 380 - 190;
      el.animate(
        [
          { transform: "translate3d(0,-5vh,0) rotate(0deg)", opacity: 0 },
          { opacity: 0.95, offset: 0.12 },
          {
            transform: `translate3d(${drift * 0.55}px,48vh,0) rotate(${rot * 0.55}deg)`,
            opacity: 0.85,
            offset: 0.55,
          },
          { transform: `translate3d(${drift}px,108vh,0) rotate(${rot}deg)`, opacity: 0 },
        ],
        { duration: dur, delay, easing: "cubic-bezier(0.2,0.6,0.35,1)", fill: "forwards" },
      );
    }

    const t = setTimeout(() => {
      parts.forEach((p) => p.remove());
      onDone();
    }, 3500);
    return () => {
      clearTimeout(t);
      parts.forEach((p) => p.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      data-testid="celebration-particles"
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
    />
  );
}
