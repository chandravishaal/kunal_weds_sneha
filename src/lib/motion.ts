export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isLowPower = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const mem = nav.deviceMemory;
  const cores = nav.hardwareConcurrency;
  const lowMem = typeof mem === 'number' && mem > 0 && mem <= 2;
  const lowCores = typeof cores === 'number' && cores > 0 && cores <= 2;
  return lowMem || lowCores;
};

export const simpleMode = (): boolean => prefersReducedMotion() || isLowPower();
