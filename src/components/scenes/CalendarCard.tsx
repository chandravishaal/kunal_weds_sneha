import { CalendarPlus, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { GCAL_URL } from "@/lib/calendar";
import { SITE } from "@/config/site";

export default function CalendarCard() {
  return (
    <section id="scene-07" data-testid="scene-calendar" className="relative px-5 py-28 sm:py-32">
      <div className="aurora aurora-d" aria-hidden="true" />

      <Reveal tilt className="relative z-10 mx-auto max-w-2xl">
        <div className="relative rounded-[2rem] bg-ivory/[0.07] p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-gold/35 backdrop-blur-xl sm:p-10">
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-[0.34em] text-gold">कैलेंडर रिमाइंडर</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ivory sm:text-4xl">
              We'll be <span className="gold-text italic">waiting</span> for you
            </h2>
            <p className="mt-2 font-hindi text-base font-medium text-rose">हम आपका इंतज़ार करेंगे!</p>
          </div>

          <div className="mt-7 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-gold/25 sm:p-6">
            <p className="font-display text-xl font-semibold text-ivory sm:text-2xl">
              Baraat Departure — Kunal &amp; Sneha
            </p>
            <p className="mt-2 text-sm font-semibold text-ivory/85 sm:text-base">
              Saturday, 21 November 2026 • 4:00 PM IST
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/75">
              Starting from <span className="font-semibold text-ivory">{SITE.baraat.start}</span>
              <br />
              Destination: <span className="font-semibold text-ivory">{SITE.venue.name}, Ranchi</span>
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold/15 px-3.5 py-1.5 text-xs font-bold text-gold">
              <Clock className="h-3.5 w-3.5" strokeWidth={2.4} />
              कृपया 3:45 PM तक पहुँचें • Please arrive by 3:45 PM
            </p>
          </div>

          <div className="mt-7 flex justify-center">
            <a
              href={GCAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="gcal-btn"
              className="btn-gold px-8"
            >
              <CalendarPlus className="h-4 w-4" strokeWidth={2.4} />
              Add to Google Calendar
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
