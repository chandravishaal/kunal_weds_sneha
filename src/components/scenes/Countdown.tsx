import plum from "@/assets/scenes/plum.webp";
import Reveal from "@/components/Reveal";
import { useCountdown } from "@/hooks/useCountdown";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  const t = useCountdown();

  const tiles = [
    { label: "DAYS", hi: "दिन", value: t.days, testid: "countdown-days" },
    { label: "HOURS", hi: "घंटे", value: t.hours, testid: "countdown-hours" },
    { label: "MINUTES", hi: "मिनट", value: t.mins, testid: "countdown-mins" },
    { label: "SECONDS", hi: "सेकंड", value: t.secs, testid: "countdown-secs" },
  ];

  return (
    <section
      id="scene-03"
      data-testid="scene-countdown"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <img
        src={plum}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-plum via-transparent to-plum" aria-hidden="true" />
      <div className="aurora aurora-b" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="chip">THE COUNTDOWN</p>
          <h2 className="mt-5 font-hindi text-2xl font-semibold text-ivory sm:text-3xl">
            बस कुछ दिन बाकी हैं!
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 grid grid-cols-4 gap-2.5 sm:gap-5" role="timer" aria-live="off">
            {tiles.map((tile) => (
              <div
                key={tile.label}
                data-testid={tile.testid}
                className="rounded-2xl border border-gold/25 bg-velvet/50 px-1 py-5 backdrop-blur-sm sm:rounded-3xl sm:px-4 sm:py-8"
              >
                <div className="gold-text font-display text-3xl font-semibold tabular-nums sm:text-6xl lg:text-7xl">
                  {pad(tile.value)}
                </div>
                <div className="mt-2 text-[9px] font-bold tracking-[0.24em] text-ivory/70 sm:text-xs">
                  {tile.label}
                </div>
                <div className="font-hindi text-[10px] text-rose/80 sm:text-xs">{tile.hi}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs font-semibold tracking-[0.28em] text-gold sm:text-sm">
            21 NOVEMBER 2026 • SATURDAY • 4:00 PM IST
          </p>
        </Reveal>
      </div>
    </section>
  );
}
