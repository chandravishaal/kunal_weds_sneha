import { useEffect, useState } from 'react';
import { SITE } from '@/config/site';

const TARGET = new Date(SITE.wedding.dateISO).getTime();

export interface Countdown {
  days: number;
  hours: number;
  mins: number;
  secs: number;
  past: boolean;
}

function calc(): Countdown {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    mins: Math.floor(diff / 60_000) % 60,
    secs: Math.floor(diff / 1_000) % 60,
    past: diff <= 0,
  };
}

export function useCountdown(): Countdown {
  const [t, setT] = useState<Countdown>(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}
