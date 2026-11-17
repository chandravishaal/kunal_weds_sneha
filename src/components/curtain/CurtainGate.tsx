// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ChevronRight } from "lucide-react";
// import { simpleMode } from "@/lib/motion";
// import durbar from "@/assets/scenes/durbar.webp";

// const OPEN_KEY = "ks-curtain-open";
// const THREAD_BASE = 30; // vh

// /**
//  * Four-layer royal velvet curtain over a painted durbar backdrop.
//  * Opens via slide-to-open knob, tap on the tassel, or the TAP TO OPEN button.
//  */
// export default function CurtainGate({ onOpened }: { onOpened: () => void }) {
//   const rootRef = useRef<HTMLDivElement>(null);
//   const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
//   const durbarRef = useRef<HTMLImageElement>(null);
//   const threadWrapRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const valanceRef = useRef<HTMLDivElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);
//   const knobRef = useRef<HTMLButtonElement>(null);
//   const fillRef = useRef<HTMLDivElement>(null);
//   const state = useRef({ target: 0, current: 0, done: false });
//   const simple = useRef(simpleMode()).current;

//   const render = () => {
//     const p = state.current.current;
//     layerRefs.current.forEach((el, i) => {
//       if (!el) return;
//       const start = (3 - i) * 0.06;
//       const pi = Math.min(1, Math.max(0, (p - start) / (1 - start)));
//       const e = 1 - Math.pow(1 - pi, 3);
//       el.style.transform = `translate3d(0, ${-108 * e}vh, 0)`;
//     });
//     if (contentRef.current) contentRef.current.style.opacity = String(Math.max(0, 1 - p * 2.4));
//   };

//   useEffect(() => {
//     let raf = 0;
//     const loop = () => {
//       const s = state.current;
//       s.current += (s.target - s.current) * 0.16;
//       if (Math.abs(s.target - s.current) < 0.0015) s.current = s.target;
//       render();
//       raf = requestAnimationFrame(loop);
//     };
//     raf = requestAnimationFrame(loop);
//     return () => cancelAnimationFrame(raf);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const finish = () => {
//     if (state.current.done) return;
//     state.current.done = true;
//     sessionStorage.setItem(OPEN_KEY, "1");
//     onOpened();
//   };

//   const complete = () => {
//     const s = state.current;
//     if (s.done) return;
//     const tl = gsap.timeline({ onComplete: finish });
//     tl.to(s, { target: 1, duration: simple ? 0.5 : 2.1, ease: "power2.inOut" }, 0)
//       .to(contentRef.current, { opacity: 0, duration: simple ? 0.2 : 0.45, ease: "power1.out" }, 0)
//       .to(threadWrapRef.current, { yPercent: -140, duration: simple ? 0.4 : 1.0, ease: "power2.in" }, simple ? 0 : 0.7)
//       .to(valanceRef.current, { yPercent: -115, duration: simple ? 0.4 : 1.3, ease: "power3.in" }, simple ? 0.05 : 0.95)
//       .to(durbarRef.current, { opacity: 0, scale: 1.06, duration: simple ? 0.4 : 1.1, ease: "power2.inOut" }, simple ? 0.1 : 1.25);
//   };

//   const onKnobDown = (e: React.PointerEvent<HTMLButtonElement>) => {
//     if (state.current.done) return;
//     const track = trackRef.current;
//     const knob = knobRef.current;
//     if (!track || !knob) return;
//     const startX = e.clientX;
//     const max = Math.max(40, track.clientWidth - knob.clientWidth - 8);
//     let completed = false;

//     const cleanup = () => {
//       window.removeEventListener("pointermove", move);
//       window.removeEventListener("pointerup", up);
//       window.removeEventListener("pointercancel", up);
//     };
//     const move = (ev: PointerEvent) => {
//       ev.preventDefault();
//       const dx = Math.max(0, Math.min(max, ev.clientX - startX));
//       gsap.set(knob, { x: dx });
//       if (fillRef.current) {
//         fillRef.current.style.width = `${((dx + knob.clientWidth) / track.clientWidth) * 100}%`;
//       }
//       if (dx >= max * 0.72 && !completed) {
//         completed = true;
//         cleanup();
//         if (fillRef.current) gsap.to(fillRef.current, { width: "100%", duration: 0.3 });
//         complete();
//       }
//     };
//     const up = () => {
//       cleanup();
//       if (!completed) {
//         gsap.to(knob, { x: 0, duration: 0.55, ease: "back.out(1.6)" });
//         if (fillRef.current) gsap.to(fillRef.current, { width: "0%", duration: 0.4, ease: "power2.out" });
//       }
//     };
//     window.addEventListener("pointermove", move, { passive: false });
//     window.addEventListener("pointerup", up);
//     window.addEventListener("pointercancel", up);
//   };

//   useEffect(() => {
//     const el = rootRef.current;
//     if (!el) return undefined;
//     const stop = (e: Event) => e.preventDefault();
//     el.addEventListener("contextmenu", stop);
//     return () => el.removeEventListener("contextmenu", stop);
//   }, []);

//   return (
//     <div
//       ref={rootRef}
//       role="dialog"
//       aria-modal="true"
//       aria-label="Royal wedding invitation — slide or tap to open"
//       className="fixed inset-0 z-[100] overflow-hidden bg-plum"
//       data-testid="curtain-gate"
//     >
//       {/* Painted royal durbar backdrop — revealed as the fabrics lift */}
//       <img
//         ref={durbarRef}
//         src={durbar}
//         alt=""
//         aria-hidden="true"
//         className="absolute inset-0 h-full w-full object-cover"
//       />

//       {/* Layer 4 — golden organza (innermost, leads the lift) */}
//       <div ref={(el) => { layerRefs.current[3] = el; }} className="curtain-layer l-organza" data-testid="curtain-layer-organza" />
//       {/* Layer 3 — champagne sheer */}
//       <div ref={(el) => { layerRefs.current[2] = el; }} className="curtain-layer l-champagne" data-testid="curtain-layer-champagne" />
//       {/* Layer 2 — plum drapes */}
//       <div ref={(el) => { layerRefs.current[1] = el; }} className="curtain-layer l-plum">
//         <div className="hem" />
//       </div>
//       {/* Layer 1 — outer royal velvet (topmost) */}
//       <div ref={(el) => { layerRefs.current[0] = el; }} className="curtain-layer l-velvet" data-testid="curtain-layer-velvet">
//         <div className="hem" />
//       </div>

//       {/* Title block */}
//       <div
//         ref={contentRef}
//         className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-start px-6 pt-[12vh] text-center"
//       >
//         <p className="font-hindi text-[13px] font-medium tracking-[0.34em] text-gold sm:text-sm">
//           || शुभ विवाह निमंत्रण ||
//         </p>
//         <h1 className="gold-text mt-5 font-display text-[13vw] font-semibold leading-[1.02] sm:text-7xl lg:text-8xl">
//           Kunal <span className="font-normal italic text-rose">weds</span> Sneha
//         </h1>
//         <p className="mt-3 text-xs font-medium uppercase tracking-[0.42em] text-ivory/75 sm:text-sm">
//           A November Wedding Story
//         </p>

//         {/* Slide-to-open + tap controls */}
//         <div className="absolute inset-x-0 bottom-7 flex flex-col items-center px-6">
//           <p className="font-hindi text-lg font-semibold text-ivory sm:text-xl">स्लाइड या टैप करके पर्दा खोलें</p>
//           <p className="mt-1 text-[10px] font-extrabold tracking-[0.36em] text-ivory/75 sm:text-[11px]">
//             SLIDE TO OPEN
//           </p>

//           <div
//             ref={trackRef}
//             className="pointer-events-auto relative mt-4 h-16 w-[290px] rounded-full border border-gold/40 bg-plum/60 shadow-[inset_0_2px_12px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:w-[330px]"
//           >
//             <div
//               ref={fillRef}
//               className="absolute inset-y-1 left-1 w-0 rounded-full bg-gradient-to-r from-gold/20 to-gold/50"
//               aria-hidden="true"
//             />
//             <div className="absolute inset-0 flex items-center justify-center gap-0.5 text-gold/75" aria-hidden="true">
//               <ChevronRight className="chev-flow h-5 w-5" strokeWidth={2.4} />
//               <ChevronRight className="chev-flow h-5 w-5 [animation-delay:0.15s]" strokeWidth={2.4} />
//               <ChevronRight className="chev-flow h-5 w-5 [animation-delay:0.3s]" strokeWidth={2.4} />
//             </div>
//             <button
//               ref={knobRef}
//               type="button"
//               onPointerDown={onKnobDown}
//               onClick={complete}
//               data-testid="curtain-slider"
//               aria-label="Slide right to open the invitation"
//               className="tassel-hit absolute left-1 top-1 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#f2ddab] via-gold to-[#9a7b45] text-plum shadow-gold-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-ivory"
//             >
//               <ChevronRight className="h-7 w-7" strokeWidth={2.8} />
//             </button>
//           </div>

//           <button
//             type="button"
//             onClick={complete}
//             data-testid="curtain-open-button"
//             className="btn-outline pointer-events-auto mt-4 px-7 py-2.5 text-[11px] tracking-[0.26em]"
//           >
//             TAP TO OPEN <span className="font-hindi tracking-normal">• बस एक बार टैप करें</span>
//           </button>
//         </div>
//       </div>

//       {/* Golden thread + tassel (tap to open) */}
//       <div ref={threadWrapRef} className="absolute left-1/2 z-30 -translate-x-1/2" style={{ top: "12vh" }}>
//         <div className="flex flex-col items-center">
//           <div className="bead" />
//           <div className="thread" style={{ height: `${THREAD_BASE}vh` }} />
//           <button
//             type="button"
//             aria-label="Tap the golden tassel to open the invitation"
//             data-testid="curtain-tassel"
//             className="tassel-hit group relative mt-[-2px] flex flex-col items-center rounded-full p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
//             onClick={complete}
//           >
//             <span className="absolute inset-2 rounded-full bg-gold/25 animate-pulse-ring" aria-hidden="true" />
//             <span className="bead mb-1.5" aria-hidden="true" />
//             <span className="mb-1 text-gold" aria-hidden="true">
//               <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
//                 <circle cx="8" cy="3.2" r="1.7" />
//                 <circle cx="3.4" cy="8" r="1.7" />
//                 <circle cx="12.6" cy="8" r="1.7" />
//                 <circle cx="8" cy="12.8" r="1.7" />
//               </svg>
//             </span>
//             <span className="bob-anim flex flex-col items-center" aria-hidden="true">
//               <span className="tassel-head" />
//               <span className="tassel-skirt" />
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Ornamental top valance with hanging wisteria */}
//       <div ref={valanceRef} className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[13vh] min-h-[92px] will-change-transform">

//         <svg viewBox="0 0 1440 130" preserveAspectRatio="none" className="h-full w-full drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
//           <defs>
//             <linearGradient id="vMaroon" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0" stopColor="#5c2542" />
//               <stop offset="0.55" stopColor="#4b1d35" />
//               <stop offset="1" stopColor="#331224" />
//             </linearGradient>
//             <linearGradient id="vPlum" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0" stopColor="#3a2c58" />
//               <stop offset="1" stopColor="#221939" />
//             </linearGradient>
//           </defs>
//           <path
//             d="M0 0 H1440 V20 C1310 92 1190 92 1050 36 C990 12 945 12 895 32 C765 98 675 98 545 32 C495 12 450 12 390 36 C250 92 130 92 0 20 Z"
//             fill="url(#vMaroon)"
//           />
//           <path
//             d="M0 0 H1440 V8 C1320 58 1205 58 1062 20 C992 2 935 2 885 18 C765 60 675 60 555 18 C505 2 448 2 378 20 C238 58 120 58 0 8 Z"
//             fill="url(#vPlum)"
//             opacity="0.9"
//           />
//           <path
//             d="M0 0 H1440 V20 C1310 92 1190 92 1050 36 C990 12 945 12 895 32 C765 98 675 98 545 32 C495 12 450 12 390 36 C250 92 130 92 0 20 Z"
//             fill="none"
//             stroke="#C5A16A"
//             strokeWidth="2"
//             opacity="0.85"
//           />
//           <g fill="#C5A16A">
//             <circle cx="1050" cy="38" r="4.5" />
//             <circle cx="545" cy="34" r="4.5" />
//             <rect x="1046" y="44" width="8" height="16" rx="3" fill="#B08F52" />
//             <rect x="541" y="40" width="8" height="16" rx="3" fill="#B08F52" />
//           </g>
//         </svg>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { simpleMode } from "@/lib/motion";
// import durbar from "@/assets/scenes/durbar.webp";

// const OPEN_KEY = "ks-curtain-open";
// const BASE_THREAD_PX = 135; // Initial visible cord length
// const MAX_PULL_PX = 180; // Mobile-friendly downward drag distance
// const TRIGGER_RATIO = 0.75; // 75% drag threshold to auto-complete

// interface Petal {
//   id: number;
//   left: string;
//   size: number;
//   delay: number;
//   duration: number;
//   drift: number;
//   isGold: boolean;
// }

// export default function CurtainGate({ onOpened }: { onOpened: () => void }) {
//   const rootRef = useRef<HTMLDivElement>(null);
//   const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
//   const durbarRef = useRef<HTMLImageElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const valanceRef = useRef<HTMLDivElement>(null);

//   // GPU-composited thread & tassel refs (zero layout thrashing)
//   const threadLineRef = useRef<HTMLDivElement>(null);
//   const tasselBtnRef = useRef<HTMLButtonElement>(null);
//   const promptRef = useRef<HTMLDivElement>(null);

//   const [showPetals, setShowPetals] = useState(false);
//   const [isOpening, setIsOpening] = useState(false);

//   const simple = useRef(simpleMode()).current;
//   const state = useRef({
//     pullY: 0,
//     targetPullY: 0,
//     isDragging: false,
//     progress: 0, // 0 = closed, 1 = fully open
//     done: false,
//   });

//   // Lightweight 18-petal burst for low-end mobile smoothness
//   const petals = useRef<Petal[]>(
//     Array.from({ length: 18 }, (_, i) => ({
//       id: i,
//       left: `${6 + ((i * 5.2) % 88)}%`,
//       size: 7 + (i % 4) * 2,
//       delay: (i % 5) * 0.1,
//       duration: 1.9 + (i % 3) * 0.35,
//       drift: (i % 2 === 0 ? 1 : -1) * (25 + (i % 4) * 15),
//       isGold: i % 2 === 0,
//     }))
//   ).current;

//   // Lock background scroll while curtain is closed
//   useEffect(() => {
//     const prevOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = prevOverflow;
//     };
//   }, []);

//   // Ultra-lightweight 60fps transform loop
//   useEffect(() => {
//     let raf = 0;

//     const tick = () => {
//       const s = state.current;
//       const ease = s.isDragging ? 0.35 : 0.16;
//       s.pullY += (s.targetPullY - s.pullY) * ease;
//       if (Math.abs(s.targetPullY - s.pullY) < 0.15) s.pullY = s.targetPullY;

//       // 1. Stretch thread cleanly via GPU scaleY (no SVG path parsing)
//       if (threadLineRef.current) {
//         const scale = Math.max(0.1, (BASE_THREAD_PX + s.pullY) / BASE_THREAD_PX);
//         threadLineRef.current.style.transform = `scaleY(${scale})`;
//       }

//       // 2. Move tassel & prompt smoothly with the pull
//       if (tasselBtnRef.current) {
//         tasselBtnRef.current.style.transform = `translate3d(0, ${s.pullY}px, 0)`;
//       }
//       if (promptRef.current && !isOpening) {
//         promptRef.current.style.transform = `translate3d(0, ${s.pullY * 0.85}px, 0)`;
//       }

//       // 3. Live curtain lift tied directly to how far the user pulls the thread!
//       const pullRatio = Math.max(0, Math.min(1, s.pullY / MAX_PULL_PX));
//       // Pulling 100% lifts the curtains up to 34% live before auto-completing
//       const liveDragLift = isOpening || s.done ? 0 : pullRatio * 0.34;
//       const masterProgress = Math.max(s.progress, liveDragLift);

//       // Staggered 4-layer lift: Outer Midnight Velvet (0) -> Violet (1) -> Champagne (2) -> Organza (3)
//       layerRefs.current.forEach((el, i) => {
//         if (!el) return;
//         const startOffset = i * 0.09;
//         const localP = Math.min(
//           1,
//           Math.max(0, (masterProgress - startOffset) / (1 - startOffset))
//         );
//         // Smooth cubic ease
//         const eased =
//           localP < 0.5
//             ? 2 * localP * localP
//             : 1 - Math.pow(-2 * localP + 2, 2) / 2;

//         el.style.transform = `translate3d(0, ${-105 * eased}vh, 0)`;
//       });

//       if (contentRef.current && !isOpening) {
//         contentRef.current.style.opacity = String(Math.max(0.15, 1 - pullRatio * 0.85));
//       }

//       raf = requestAnimationFrame(tick);
//     };

//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, [isOpening]);

//   const finish = () => {
//     if (state.current.done) return;
//     state.current.done = true;
//     sessionStorage.setItem(OPEN_KEY, "1");
//     onOpened();
//   };

//   const completeOpening = () => {
//     if (isOpening || state.current.done) return;
//     setIsOpening(true);
//     state.current.isDragging = false;

//     if (simple) {
//       gsap.to(rootRef.current, {
//         opacity: 0,
//         duration: 0.4,
//         ease: "power2.out",
//         onComplete: finish,
//       });
//       return;
//     }

//     setTimeout(() => setShowPetals(true), 950);

//     const tl = gsap.timeline({
//       onComplete: () => {
//         gsap.to(rootRef.current, {
//           opacity: 0,
//           duration: 0.45,
//           onComplete: finish,
//         });
//       },
//     });

//     tl.to(
//       [contentRef.current, promptRef.current],
//       { opacity: 0, duration: 0.35, ease: "power1.out" },
//       0
//     )
//       // Retract thread & tassel smoothly upward
//       .to(
//         state.current,
//         { targetPullY: -BASE_THREAD_PX - 60, duration: 0.55, ease: "power2.in" },
//         0
//       )
//       // Lift all 4 fabric layers sequentially
//       .to(
//         state.current,
//         { progress: 1, duration: 1.95, ease: "power2.inOut" },
//         0.05
//       )
//       // Lift top valance
//       .to(
//         valanceRef.current,
//         { yPercent: -115, duration: 0.9, ease: "power3.in" },
//         0.95
//       )
//       // Dissolve durbar backdrop into the live wedding page
//       .to(
//         durbarRef.current,
//         { opacity: 0, duration: 0.9, ease: "power2.inOut" },
//         1.3
//       );
//   };

//   const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
//     if (isOpening || state.current.done) return;
//     e.currentTarget.setPointerCapture(e.pointerId);

//     const startY = e.clientY;
//     const initialPull = state.current.pullY;
//     let dragged = false;
//     state.current.isDragging = true;

//     const onMove = (ev: PointerEvent) => {
//       const dy = ev.clientY - startY;
//       if (Math.abs(dy) > 6) dragged = true;

//       const nextPull = Math.max(0, Math.min(MAX_PULL_PX, initialPull + dy));
//       state.current.targetPullY = nextPull;

//       if (nextPull >= MAX_PULL_PX * TRIGGER_RATIO) {
//         cleanup();
//         completeOpening();
//       }
//     };

//     const onUp = () => {
//       cleanup();
//       state.current.isDragging = false;
//       if (!dragged) {
//         // Single tap on tassel also opens smoothly
//         completeOpening();
//       } else if (state.current.targetPullY < MAX_PULL_PX * TRIGGER_RATIO) {
//         // Spring back down & re-close curtains if released early
//         state.current.targetPullY = 0;
//       }
//     };

//     const cleanup = () => {
//       window.removeEventListener("pointermove", onMove);
//       window.removeEventListener("pointerup", onUp);
//       window.removeEventListener("pointercancel", onUp);
//     };

//     window.addEventListener("pointermove", onMove);
//     window.addEventListener("pointerup", onUp);
//     window.addEventListener("pointercancel", onUp);
//   };

//   return (
//     <div
//       ref={rootRef}
//       role="dialog"
//       aria-modal="true"
//       aria-label="Royal wedding invitation — pull down the golden tassel or tap to open"
//       className="fixed inset-0 z-[100] select-none overflow-hidden bg-[#1a1c2e]"
//       data-testid="curtain-gate"
//     >
//       {/* Painted Royal Durbar Backdrop */}
//       <img
//         ref={durbarRef}
//         src={durbar}
//         alt=""
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 h-full w-full object-cover"
//       />

//       {/* Layer 4 (Innermost) — Golden Organza */}
//       <div
//         ref={(el) => {
//           layerRefs.current[3] = el;
//         }}
//         className="curtain-layer layer-organza"
//         data-testid="curtain-layer-organza"
//       />

//       {/* Layer 3 — Champagne Sheer */}
//       <div
//         ref={(el) => {
//           layerRefs.current[2] = el;
//         }}
//         className="curtain-layer layer-champagne"
//         data-testid="curtain-layer-champagne"
//       />

//       {/* Layer 2 — Twilight Violet */}
//       <div
//         ref={(el) => {
//           layerRefs.current[1] = el;
//         }}
//         className="curtain-layer layer-violet"
//         data-testid="curtain-layer-violet"
//       >
//         <div className="curtain-gold-hem" />
//       </div>

//       {/* Layer 1 (Outermost) — Midnight Velvet */}
//       <div
//         ref={(el) => {
//           layerRefs.current[0] = el;
//         }}
//         className="curtain-layer layer-velvet"
//         data-testid="curtain-layer-velvet"
//       >
//         <div className="curtain-gold-hem" />
//       </div>

//       {/* Header Typography (Positioned cleanly above the thread on mobile & desktop) */}
//       <div
//         ref={contentRef}
//         className="pointer-events-none absolute inset-x-0 top-[11vh] z-20 flex flex-col items-center px-5 text-center sm:top-[13vh]"
//       >
//         <p className="font-hindi text-xs font-medium tracking-[0.32em] text-[#F2D694] sm:text-sm">
//           || शुभ विवाह निमंत्रण ||
//         </p>
//         <h1 className="gold-text mt-3 font-display text-[11.5vw] font-semibold leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] sm:text-7xl">
//           Kunal <span className="font-normal italic text-[#F4EBDD]">weds</span> Sneha
//         </h1>
//         <p className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.38em] text-[#F4EBDD]/85 sm:text-xs">
//           A Royal November Celebration
//         </p>
//       </div>

//       {/* Prominent Braided Gold Thread + Large Ornamental Tassel */}
//       <div className="pointer-events-none absolute inset-x-0 top-[29vh] z-30 flex flex-col items-center sm:top-[32vh]">
//         {/* Top Ornamental Gold Anchor Rosette */}
//         <div
//           className="h-3.5 w-3.5 rounded-full border border-[#FFF4D2] bg-gradient-to-br from-[#FCE8B2] to-[#9E7630] shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
//           aria-hidden="true"
//         />

//         {/* Thick, High-Contrast Braided Golden Cord (GPU scaleY stretched) */}
//         <div
//           ref={threadLineRef}
//           style={{ height: `${BASE_THREAD_PX}px` }}
//           className="gold-cord origin-top will-change-transform"
//           aria-hidden="true"
//         />

//         {/* Large Mobile-Friendly Interactive Tassel */}
//         <button
//           ref={tasselBtnRef}
//           type="button"
//           onPointerDown={handlePointerDown}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" || e.key === " ") {
//               e.preventDefault();
//               completeOpening();
//             }
//           }}
//           style={{ top: `${BASE_THREAD_PX - 4}px` }}
//           aria-label="Pull down or tap the golden tassel to open the invitation"
//           data-testid="curtain-tassel"
//           className="pointer-events-auto absolute flex cursor-grab touch-none flex-col items-center px-6 py-3 active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FCE8B2] focus-visible:rounded-full"
//         >
//           {/* Soft glowing halo for clear visual affordance */}
//           <span
//             className="tassel-glow pointer-events-none absolute top-2 h-24 w-24 rounded-full"
//             aria-hidden="true"
//           />

//           <span className="tassel-sway relative flex flex-col items-center" aria-hidden="true">
//             {/* Gold Filigree Bead */}
//             <span className="h-3.5 w-3.5 rounded-full border border-[#FFF7DF] bg-gradient-to-br from-[#FFF0C2] via-[#D8B268] to-[#8C6625] shadow-md" />
//             {/* Ornamental Royal Cap (Jhumka Crown) */}
//             <span className="mt-0.5 h-5 w-7 rounded-t-full border-b-2 border-[#6B4C18] bg-gradient-to-r from-[#A67D35] via-[#FCE7B2] to-[#966E29] shadow-md" />
//             {/* Lush Gold Silk Tassel Skirt */}
//             <span className="tassel-skirt-large" />
//           </span>
//         </button>

//         {/* Clear Bilingual Instructions & Fallback Button */}
//         <div
//           ref={promptRef}
//           style={{ marginTop: "118px" }}
//           className="pointer-events-auto flex flex-col items-center px-4 text-center will-change-transform"
//         >
//           <p className="font-hindi text-lg font-semibold tracking-wide text-[#FFF9EE] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] sm:text-xl">
//             खींचकर पर्दा खोलें
//           </p>
//           <p className="mt-0.5 text-[11px] font-bold tracking-[0.32em] text-[#F5D996] drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]">
//             PULL DOWN TO OPEN
//           </p>

//           <button
//             type="button"
//             onClick={completeOpening}
//             data-testid="curtain-open-button"
//             className="mt-4 rounded-full border border-[#F2D694]/50 bg-[#252840]/85 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F4EBDD] shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2D694]"
//           >
//             Open Invitation
//           </button>
//         </div>
//       </div>

//       {/* Ornamental Top Valance */}
//       <div
//         ref={valanceRef}
//         className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[10vh] min-h-[72px] will-change-transform"
//       >
//         <svg
//           viewBox="0 0 1440 130"
//           preserveAspectRatio="none"
//           className="h-full w-full drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]"
//         >
//           <defs>
//             <linearGradient id="valanceMidnight" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0" stopColor="#191B2E" />
//               <stop offset="1" stopColor="#252840" />
//             </linearGradient>
//             <linearGradient id="valanceViolet" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0" stopColor="#62577F" />
//               <stop offset="1" stopColor="#3B3352" />
//             </linearGradient>
//           </defs>
//           <path
//             d="M0 0 H1440 V20 C1310 92 1190 92 1050 36 C990 12 945 12 895 32 C765 98 675 98 545 32 C495 12 450 12 390 36 C250 92 130 92 0 20 Z"
//             fill="url(#valanceMidnight)"
//           />
//           <path
//             d="M0 0 H1440 V8 C1320 58 1205 58 1062 20 C992 2 935 2 885 18 C765 60 675 60 555 18 C505 2 448 2 378 20 C238 58 120 58 0 8 Z"
//             fill="url(#valanceViolet)"
//             opacity="0.85"
//           />
//           <path
//             d="M0 0 H1440 V20 C1310 92 1190 92 1050 36 C990 12 945 12 895 32 C765 98 675 98 545 32 C495 12 450 12 390 36 C250 92 130 92 0 20 Z"
//             fill="none"
//             stroke="#DFC080"
//             strokeWidth="2.5"
//           />
//         </svg>
//       </div>

//       {/* Brief Celebratory Petal Shower */}
//       {showPetals && !simple && (
//         <div
//           className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
//           aria-hidden="true"
//         >
//           {petals.map((p) => (
//             <span
//               key={p.id}
//               className="celebration-petal"
//               style={
//                 {
//                   left: p.left,
//                   width: `${p.size}px`,
//                   height: `${p.size * 0.65}px`,
//                   animationDelay: `${p.delay}s`,
//                   animationDuration: `${p.duration}s`,
//                   "--drift": `${p.drift}px`,
//                   backgroundColor: p.isGold ? "#E8C77D" : "#F9F3E8",
//                 } as React.CSSProperties
//               }
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { simpleMode } from "@/lib/motion";

const OPEN_KEY = "ks-curtain-open";

export default function CurtainGate({ onOpened }: { onOpened: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const simple = useRef(simpleMode()).current;
  const doneRef = useRef(false);

  // Lock background scroll while curtain is closed
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    sessionStorage.setItem(OPEN_KEY, "1");
    onOpened();
  };

  const triggerOpen = () => {
    if (isOpen || doneRef.current) return;
    setIsOpen(true);
    setTimeout(finish, simple ? 350 : 1200);
  };

  const panelTransition = simple
    ? "transform 0.35s ease-out"
    : "transform 1.15s cubic-bezier(0.76, 0, 0.24, 1)";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Royal wedding invitation — tap anywhere to open"
      onClick={triggerOpen}
      className={`fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden ${
        isOpen ? "pointer-events-none" : "pointer-events-auto"
      }`}
      data-testid="curtain-gate"
    >
      {/* LEFT CURTAIN PANEL */}
      <div
        data-testid="curtain-left"
        style={{
          transform: isOpen ? "translate3d(-102%, 0, 0)" : "translate3d(0, 0, 0)",
          transition: panelTransition,
        }}
        className="royal-curtain-panel left-0 border-r-[3px] border-[#E3C17A]/80"
      >
        <div className="curtain-inner-sheer right-0" />
      </div>

      {/* RIGHT CURTAIN PANEL */}
      <div
        data-testid="curtain-right"
        style={{
          transform: isOpen ? "translate3d(102%, 0, 0)" : "translate3d(0, 0, 0)",
          transition: panelTransition,
        }}
        className="royal-curtain-panel right-0 border-l-[3px] border-[#E3C17A]/80"
      >
        <div className="curtain-inner-sheer left-0" />
      </div>

      {/* CENTER INVITATION & TAP ACTION */}
      <div
        style={{
          opacity: isOpen ? 0 : 1,
          transition: "opacity 0.35s ease",
        }}
        className="relative z-20 flex h-full flex-col items-center justify-between px-6 py-[12vh] text-center"
      >
        {/* Top Monogram & Couple Title */}
        <div>
          <p className="font-hindi text-xs font-medium tracking-[0.34em] text-[#F2D694] sm:text-sm">
            || शुभ विवाह निमंत्रण ||
          </p>
          <h1 className="gold-text mt-3 font-display text-[11vw] font-semibold leading-[1.06] drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)] sm:text-6xl">
            Kunal <span className="font-normal italic text-[#F4EBDD]">weds</span> Sneha
          </h1>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.38em] text-[#F4EBDD]/80 sm:text-xs">
            Wedding Invitation
          </p>
        </div>

        {/* Center Decorative Gold Tassel (Tap Target) */}
        <div className="flex flex-col items-center">
          <div
            className="h-3 w-3 rounded-full border border-[#FFF4D2] bg-gradient-to-br from-[#FCE8B2] to-[#9E7630] shadow-md"
            aria-hidden="true"
          />
          <div className="gold-cord h-24" aria-hidden="true" />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerOpen();
            }}
            aria-label="Tap to open the wedding invitation"
            data-testid="curtain-tassel"
            className="-mt-1 flex cursor-pointer flex-col items-center px-8 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FCE8B2] focus-visible:rounded-full"
          >
            <span className="tassel-sway flex flex-col items-center" aria-hidden="true">
              <span className="h-3.5 w-3.5 rounded-full border border-[#FFF7DF] bg-gradient-to-br from-[#FFF0C2] via-[#D8B268] to-[#8C6625] shadow-md" />
              <span className="mt-0.5 h-4 w-6 rounded-t-full border-b-2 border-[#6B4C18] bg-gradient-to-r from-[#A67D35] via-[#FCE7B2] to-[#966E29] shadow-md" />
              <span className="tassel-skirt-large" />
            </span>
          </button>

          <p className="mt-3 font-hindi text-base font-semibold tracking-wide text-[#FFF9EE] drop-shadow sm:text-lg">
           टैप करें
          </p>
          <p className="mt-0.5 text-[10px] font-bold tracking-[0.32em] text-[#F5D996]">
            TAP TO OPEN
          </p>
        </div>

        {/* Clean Bottom Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            triggerOpen();
          }}
          data-testid="curtain-open-button"
          className="rounded-full border border-[#F2D694]/50 bg-[#1B1E32]/85 px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#F4EBDD] shadow-lg transition hover:border-[#F2D694] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2D694]"
        >
          Open Invitation
        </button>
      </div>
    </div>
  );
}