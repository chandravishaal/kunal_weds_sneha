import { useEffect, useState } from "react";
import "@/index.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import CurtainGate from "@/components/curtain/CurtainGate";
import ParticleShower from "@/components/curtain/ParticleShower";
import Story from "@/components/Story";
import WhatsAppButton from "@/components/WhatsAppButton";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const OPEN_KEY = "ks-curtain-open";

function App() {
  const [open, setOpen] = useState(() => sessionStorage.getItem(OPEN_KEY) === "1");
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("curtain-locked", !open);
    return () => document.documentElement.classList.remove("curtain-locked");
  }, [open]);

  useEffect(() => {
    if (!open || prefersReducedMotion()) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
  }, [open]);

  const handleOpened = () => {
    setOpen(true);
    setCelebrate(true);
  };

  return (
    <div className="min-h-screen bg-plum text-ivory">
      <div className="grain-overlay" aria-hidden="true" />
      {!open && <CurtainGate onOpened={handleOpened} />}
      <Story revealed={open} />
      {open && <WhatsAppButton />}
      {celebrate && <ParticleShower onDone={() => setCelebrate(false)} />}
    </div>
  );
}

export default App;
