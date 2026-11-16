import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import { simpleMode } from "@/lib/motion";
import durbar from "@/assets/scenes/durbar.webp";
import vine from "@/assets/decor/floral-vine.webp";

const OPEN_KEY = "ks-curtain-open";
const THREAD_BASE = 30; // vh

/**
 * Four-layer royal velvet curtain over a painted durbar backdrop.
 * Opens via slide-to-open knob, tap on the tassel, or the TAP TO OPEN button.
 */
export default function CurtainGate({ onOpened }: { onOpened: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const durbarRef = useRef<HTMLImageElement>(null);
  const threadWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const valanceRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const state = useRef({ target: 0, current: 0, done: false });
  const simple = useRef(simpleMode()).current;

  const render = () => {
    const p = state.current.current;
    layerRefs.current.forEach((el, i) => {
      if (!el) return;
      const start = (3 - i) * 0.06;
      const pi = Math.min(1, Math.max(0, (p - start) / (1 - start)));
      const e = 1 - Math.pow(1 - pi, 3);
      el.style.transform = `translate3d(0, ${-108 * e}vh, 0)`;
    });
    if (contentRef.current) contentRef.current.style.opacity = String(Math.max(0, 1 - p * 2.4));
  };

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const s = state.current;
      s.current += (s.target - s.current) * 0.16;
      if (Math.abs(s.target - s.current) < 0.0015) s.current = s.target;
      render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    if (state.current.done) return;
    state.current.done = true;
    sessionStorage.setItem(OPEN_KEY, "1");
    onOpened();
  };

  const complete = () => {
    const s = state.current;
    if (s.done) return;
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(s, { target: 1, duration: simple ? 0.5 : 2.1, ease: "power2.inOut" }, 0)
      .to(contentRef.current, { opacity: 0, duration: simple ? 0.2 : 0.45, ease: "power1.out" }, 0)
      .to(threadWrapRef.current, { yPercent: -140, duration: simple ? 0.4 : 1.0, ease: "power2.in" }, simple ? 0 : 0.7)
      .to(valanceRef.current, { yPercent: -115, duration: simple ? 0.4 : 1.3, ease: "power3.in" }, simple ? 0.05 : 0.95)
      .to(durbarRef.current, { opacity: 0, scale: 1.06, duration: simple ? 0.4 : 1.1, ease: "power2.inOut" }, simple ? 0.1 : 1.25);
  };

  const onKnobDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (state.current.done) return;
    const track = trackRef.current;
    const knob = knobRef.current;
    if (!track || !knob) return;
    const startX = e.clientX;
    const max = Math.max(40, track.clientWidth - knob.clientWidth - 8);
    let completed = false;

    const cleanup = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    const move = (ev: PointerEvent) => {
      ev.preventDefault();
      const dx = Math.max(0, Math.min(max, ev.clientX - startX));
      gsap.set(knob, { x: dx });
      if (fillRef.current) {
        fillRef.current.style.width = `${((dx + knob.clientWidth) / track.clientWidth) * 100}%`;
      }
      if (dx >= max * 0.72 && !completed) {
        completed = true;
        cleanup();
        if (fillRef.current) gsap.to(fillRef.current, { width: "100%", duration: 0.3 });
        complete();
      }
    };
    const up = () => {
      cleanup();
      if (!completed) {
        gsap.to(knob, { x: 0, duration: 0.55, ease: "back.out(1.6)" });
        if (fillRef.current) gsap.to(fillRef.current, { width: "0%", duration: 0.4, ease: "power2.out" });
      }
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const stop = (e: Event) => e.preventDefault();
    el.addEventListener("contextmenu", stop);
    return () => el.removeEventListener("contextmenu", stop);
  }, []);

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Royal wedding invitation — slide or tap to open"
      className="fixed inset-0 z-[100] overflow-hidden bg-plum"
      data-testid="curtain-gate"
    >
      {/* Painted royal durbar backdrop — revealed as the fabrics lift */}
      <img
        ref={durbarRef}
        src={durbar}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Layer 4 — golden organza (innermost, leads the lift) */}
      <div ref={(el) => { layerRefs.current[3] = el; }} className="curtain-layer l-organza" data-testid="curtain-layer-organza" />
      {/* Layer 3 — champagne sheer */}
      <div ref={(el) => { layerRefs.current[2] = el; }} className="curtain-layer l-champagne" data-testid="curtain-layer-champagne" />
      {/* Layer 2 — plum drapes */}
      <div ref={(el) => { layerRefs.current[1] = el; }} className="curtain-layer l-plum">
        <div className="hem" />
      </div>
      {/* Layer 1 — outer royal velvet (topmost) */}
      <div ref={(el) => { layerRefs.current[0] = el; }} className="curtain-layer l-velvet" data-testid="curtain-layer-velvet">
        <div className="hem" />
      </div>

      {/* Title block */}
      <div
        ref={contentRef}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-start px-6 pt-[12vh] text-center"
      >
        <p className="font-hindi text-[13px] font-medium tracking-[0.34em] text-gold sm:text-sm">
          || शुभ विवाह निमंत्रण ||
        </p>
        <h1 className="gold-text mt-5 font-display text-[13vw] font-semibold leading-[1.02] sm:text-7xl lg:text-8xl">
          Kunal <span className="font-normal italic text-rose">weds</span> Sneha
        </h1>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.42em] text-ivory/75 sm:text-sm">
          A November Wedding Story
        </p>

        {/* Slide-to-open + tap controls */}
        <div className="absolute inset-x-0 bottom-7 flex flex-col items-center px-6">
          <p className="font-hindi text-lg font-semibold text-ivory sm:text-xl">स्लाइड या टैप करके पर्दा खोलें</p>
          <p className="mt-1 text-[10px] font-extrabold tracking-[0.36em] text-ivory/75 sm:text-[11px]">
            SLIDE TO OPEN
          </p>

          <div
            ref={trackRef}
            className="pointer-events-auto relative mt-4 h-16 w-[290px] rounded-full border border-gold/40 bg-plum/60 shadow-[inset_0_2px_12px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:w-[330px]"
          >
            <div
              ref={fillRef}
              className="absolute inset-y-1 left-1 w-0 rounded-full bg-gradient-to-r from-gold/20 to-gold/50"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-0.5 text-gold/75" aria-hidden="true">
              <ChevronRight className="chev-flow h-5 w-5" strokeWidth={2.4} />
              <ChevronRight className="chev-flow h-5 w-5 [animation-delay:0.15s]" strokeWidth={2.4} />
              <ChevronRight className="chev-flow h-5 w-5 [animation-delay:0.3s]" strokeWidth={2.4} />
            </div>
            <button
              ref={knobRef}
              type="button"
              onPointerDown={onKnobDown}
              onClick={complete}
              data-testid="curtain-slider"
              aria-label="Slide right to open the invitation"
              className="tassel-hit absolute left-1 top-1 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#f2ddab] via-gold to-[#9a7b45] text-plum shadow-gold-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-ivory"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={2.8} />
            </button>
          </div>

          <button
            type="button"
            onClick={complete}
            data-testid="curtain-open-button"
            className="btn-outline pointer-events-auto mt-4 px-7 py-2.5 text-[11px] tracking-[0.26em]"
          >
            TAP TO OPEN <span className="font-hindi tracking-normal">• बस एक बार टैप करें</span>
          </button>
        </div>
      </div>

      {/* Golden thread + tassel (tap to open) */}
      <div ref={threadWrapRef} className="absolute left-1/2 z-30 -translate-x-1/2" style={{ top: "12vh" }}>
        <div className="flex flex-col items-center">
          <div className="bead" />
          <div className="thread" style={{ height: `${THREAD_BASE}vh` }} />
          <button
            type="button"
            aria-label="Tap the golden tassel to open the invitation"
            data-testid="curtain-tassel"
            className="tassel-hit group relative mt-[-2px] flex flex-col items-center rounded-full p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            onClick={complete}
          >
            <span className="absolute inset-2 rounded-full bg-gold/25 animate-pulse-ring" aria-hidden="true" />
            <span className="bead mb-1.5" aria-hidden="true" />
            <span className="mb-1 text-gold" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="3.2" r="1.7" />
                <circle cx="3.4" cy="8" r="1.7" />
                <circle cx="12.6" cy="8" r="1.7" />
                <circle cx="8" cy="12.8" r="1.7" />
              </svg>
            </span>
            <span className="bob-anim flex flex-col items-center" aria-hidden="true">
              <span className="tassel-head" />
              <span className="tassel-skirt" />
            </span>
          </button>
        </div>
      </div>

      {/* Ornamental top valance with hanging wisteria */}
      <div ref={valanceRef} className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[13vh] min-h-[92px] will-change-transform">
        <img
          src={vine}
          alt=""
          aria-hidden="true"
          className="absolute left-1 top-[58%] w-20 mix-blend-screen sm:w-32"
        />
        <img
          src={vine}
          alt=""
          aria-hidden="true"
          className="absolute right-1 top-[58%] w-20 -scale-x-100 mix-blend-screen sm:w-32"
        />
        <svg viewBox="0 0 1440 130" preserveAspectRatio="none" className="h-full w-full drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
          <defs>
            <linearGradient id="vMaroon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5c2542" />
              <stop offset="0.55" stopColor="#4b1d35" />
              <stop offset="1" stopColor="#331224" />
            </linearGradient>
            <linearGradient id="vPlum" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a2c58" />
              <stop offset="1" stopColor="#221939" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 H1440 V20 C1310 92 1190 92 1050 36 C990 12 945 12 895 32 C765 98 675 98 545 32 C495 12 450 12 390 36 C250 92 130 92 0 20 Z"
            fill="url(#vMaroon)"
          />
          <path
            d="M0 0 H1440 V8 C1320 58 1205 58 1062 20 C992 2 935 2 885 18 C765 60 675 60 555 18 C505 2 448 2 378 20 C238 58 120 58 0 8 Z"
            fill="url(#vPlum)"
            opacity="0.9"
          />
          <path
            d="M0 0 H1440 V20 C1310 92 1190 92 1050 36 C990 12 945 12 895 32 C765 98 675 98 545 32 C495 12 450 12 390 36 C250 92 130 92 0 20 Z"
            fill="none"
            stroke="#C5A16A"
            strokeWidth="2"
            opacity="0.85"
          />
          <g fill="#C5A16A">
            <circle cx="1050" cy="38" r="4.5" />
            <circle cx="545" cy="34" r="4.5" />
            <rect x="1046" y="44" width="8" height="16" rx="3" fill="#B08F52" />
            <rect x="541" y="40" width="8" height="16" rx="3" fill="#B08F52" />
          </g>
        </svg>
      </div>
    </div>
  );
}
