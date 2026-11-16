import { MapPin, MoveDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { SITE } from "@/config/site";
import venue from "@/assets/scenes/venue.webp";
import vine from "@/assets/decor/floral-vine.webp";

export default function Destination() {
  return (
    <section
      id="scene-06"
      data-testid="scene-destination"
      className="relative flex min-h-[92svh] items-center overflow-hidden py-24"
    >
      <img
        src={venue}
        alt="A richly decorated wedding venue entrance glowing at twilight"
        loading="lazy"
        data-parallax="10"
        className="will-change-transform absolute inset-0 h-[116%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-plum via-plum/45 to-plum" aria-hidden="true" />
      <img
        src={vine}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -left-2 top-0 z-[5] w-24 mix-blend-screen opacity-80 sm:w-40"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        <Reveal>
          <div className="rounded-[2rem] border border-gold/25 bg-plum/55 p-7 text-center backdrop-blur-md sm:p-12">
            <p className="text-[11px] font-bold tracking-[0.36em] text-gold">THE WEDDING DESTINATION</p>
            <h2 className="mt-4 font-hindi text-4xl font-semibold text-ivory sm:text-5xl">
              {SITE.venue.nameHi}
            </h2>
            <p className="gold-text mt-2 font-display text-2xl font-semibold italic sm:text-3xl">
              {SITE.venue.name}
            </p>
            <p className="mt-4 text-sm text-ivory/85 sm:text-base">{SITE.venue.address}</p>

            <div className="mt-8 flex justify-center">
              <a
                href={SITE.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="venue-directions-btn"
                className="btn-gold px-8 py-3.5"
              >
                <MapPin className="h-4.5 w-4.5" strokeWidth={2.4} />
                Get Directions <span className="font-hindi font-semibold">मार्ग देखें</span>
              </a>
            </div>

            <div className="mt-8 flex justify-center" aria-hidden="true">
              <MoveDown className="h-5 w-5 animate-chevron-down text-gold" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
