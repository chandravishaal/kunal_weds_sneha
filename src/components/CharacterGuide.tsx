import couple from "@/assets/characters/couple.webp";

interface CharacterGuideProps {
  bubble?: string;
  flip?: boolean;
  size?: number;
  className?: string;
  bubbleSide?: "left" | "right";
}

/** Kunal & Sneha cutout guide with optional speech bubble. */
export default function CharacterGuide({
  bubble,
  flip = false,
  size = 200,
  className = "",
  bubbleSide = "left",
}: CharacterGuideProps) {
  return (
    <div className={`relative flex flex-col items-center ${className}`} data-testid="character-guide">
      {bubble && (
        <div
          className={`bubble animate-none mb-4 max-w-[240px] font-hindi ${bubbleSide === "right" ? "bubble-right" : ""}`}
          data-testid="character-bubble"
        >
          {bubble}
        </div>
      )}
      <img
        src={couple}
        alt="Kunal and Sneha — animated characters welcoming you"
        width={720}
        height={1142}
        loading="lazy"
        className="animate-floaty w-auto drop-shadow-[0_18px_36px_rgba(0,0,0,0.5)]"
        style={{ width: size, height: "auto", transform: flip ? "scaleX(-1)" : undefined }}
      />
    </div>
  );
}
