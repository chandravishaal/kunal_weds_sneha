import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/config/site";

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const anchor = document.getElementById("scene-07");
      if (!anchor) return;
      setShow(window.scrollY + window.innerHeight * 0.5 >= anchor.offsetTop);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(
    "Hello! I need help with Kunal & Sneha's wedding invitation.",
  )}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="whatsapp-help"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Need Help? ${SITE.whatsapp.labelHi} — chat on WhatsApp`}
          data-testid="whatsapp-help-btn"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-[80] flex items-center gap-2.5 rounded-full bg-[#12804a] py-3 pl-4 pr-5 text-ivory shadow-[0_14px_38px_-10px_rgba(18,128,74,0.7)] ring-1 ring-gold/40 transition-transform duration-300 hover:-translate-y-1"
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-[#25D366]/50 animate-pulse-ring" aria-hidden="true" />
            <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
              <path d="M16 3C9.4 3 4 8.4 4 15c0 2.6.8 5 2.2 7L4.5 28l6.2-1.6c1.9 1 4 1.6 6.3 1.6h.5c6.1-.3 10.9-5.4 10.5-11.6C27.7 8.9 22.4 3 16 3zm0 22.7c-2 0-3.9-.6-5.5-1.6l-.4-.2-3.7 1 1-3.6-.3-.4C5.9 19.6 5.3 17.4 5.3 15 5.3 9.6 10.1 4.3 16 4.3c5.9 0 10.7 4.8 10.7 10.7 0 5.9-4.8 10.7-10.7 10.7zm5.9-8c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7-.1-.2-.8-1.8-1-2.5-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.4c.2.2 2.2 3.5 5.4 4.8.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.4.2-1.6-.1-.2-.3-.3-.6-.4z" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[13px] font-bold">{SITE.whatsapp.label}</span>
            <span className="font-hindi text-[11px] text-ivory/85">{SITE.whatsapp.labelHi}</span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
