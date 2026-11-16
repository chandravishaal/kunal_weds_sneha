import { MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import { SITE } from "@/config/site";
import { useCountdown } from "@/hooks/useCountdown";
import baraat from "@/assets/scenes/baraat.webp";

export default function BaraatRoute() {
  const { days } = useCountdown();

  return (
    <section
      id="scene-05"
      data-testid="scene-baraat"
      className="relative overflow-hidden px-5 py-28 sm:py-36"
    >
      {/* blurred baraat artwork as the section backdrop */}
      <img
        src={baraat}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-40 blur-[6px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-velvet via-plum/70 to-velvet" aria-hidden="true" />
      <div className="aurora aurora-c" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3 text-gold" aria-hidden="true">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/70" />
            <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
              <path d="M7 0 L8.6 5.4 L14 7 L8.6 8.6 L7 14 L5.4 8.6 L0 7 L5.4 5.4 Z" />
            </svg>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/70" />
          </div>
          <h2 className="mt-4 font-hindi text-4xl font-semibold text-ivory sm:text-5xl">बारात प्रस्थान</h2>
          <p className="gold-text mt-4 font-display text-3xl font-semibold tracking-wide sm:text-4xl">
            21 NOVEMBER 2026
          </p>
          <p className="mt-1.5 text-lg font-bold tracking-[0.3em] text-gold">4:00 PM</p>
        </Reveal>

        <Reveal delay={0.12} tilt className="mt-12">
          <div className="relative rounded-[2rem] bg-plum/35 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)] ring-1 ring-gold/30 backdrop-blur-xl sm:p-10">
            <p
              className="text-center font-hindi text-base font-medium italic text-rose sm:text-lg"
              data-testid="baraat-bubble"
            >
              <span className="mr-1 font-display text-2xl not-italic text-gold/70">"</span>
              कुनाल की बारात 4 बजे निकलेगी, देर मत करना!
              <span className="ml-1 font-display text-2xl not-italic text-gold/70">"</span>
            </p>

            <svg viewBox="0 0 600 190" className="mt-6 w-full" role="img" aria-label="Baraat route from Hesmi More, Mandar to Jharkhand Police Club, Ranchi">
              <defs>
                <radialGradient id="glowGold" cx="0.5" cy="0.4" r="0.9">
                  <stop offset="0" stopColor="#E9CE96" />
                  <stop offset="1" stopColor="#C5A16A" />
                </radialGradient>
              </defs>
              <path
                id="baraat-route-path"
                d="M70 110 C 180 30, 300 190, 400 90 C 450 45, 500 55, 530 78"
                fill="none"
                stroke="#C5A16A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="2 13"
                className="animate-dashflow"
              />
              <g>
                <circle cx="70" cy="110" r="13" fill="#2B2144" stroke="#F7EFE7" strokeWidth="2.5" />
                <circle cx="70" cy="110" r="4.5" fill="#F7EFE7" />
              </g>
              <g>
                <path
                  d="M530 40 c 15 0 26 11 26 25 c 0 18 -26 45 -26 45 c 0 0 -26 -27 -26 -45 c 0 -14 11 -25 26 -25 z"
                  fill="url(#glowGold)"
                />
                <circle cx="530" cy="66" r="9" fill="#2B2144" />
              </g>
            </svg>

            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold tracking-[0.28em] text-ivory/70">STARTING POINT</p>
                <p className="mt-1.5 font-hindi text-base font-medium text-ivory sm:text-lg">{SITE.baraat.start}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[10px] font-bold tracking-[0.28em] text-gold">DESTINATION • विवाह स्थल</p>
                <p className="mt-1.5 text-base font-semibold text-ivory sm:text-lg">{SITE.baraat.destination}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p
                className="inline-flex items-center gap-2 rounded-full border border-marigold/40 bg-marigold/10 px-4 py-2 text-sm font-bold text-marigold"
                data-testid="baraat-countdown-chip"
              >
                {`अभी ${days} दिन बाकी • ${days} ${days === 1 ? "day" : "days"} to go`}
              </p>
              <a
                href={SITE.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="baraat-directions-btn"
                className="btn-gold"
              >
                <MapPin className="h-4 w-4" strokeWidth={2.4} />
                Get Directions <span className="font-hindi font-semibold">रास्ता देखें</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
