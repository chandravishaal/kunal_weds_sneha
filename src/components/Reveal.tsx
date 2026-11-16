import { ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  tilt?: boolean;
}

export const Reveal = ({ children, className = "", delay = 0, y = 30, tilt = false }: RevealProps) => (
  <motion.div
    className={className}
    initial={tilt ? { opacity: 0, y, rotateX: 10, transformPerspective: 900 } : { opacity: 0, y }}
    whileInView={tilt ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
    transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default Reveal;
