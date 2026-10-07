'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react';

/** True while `ref` is on screen (at least `threshold` of it). */
export function useInView<T extends Element>(ref: RefObject<T | null>, threshold = 0.35) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

const REDUCED = '(prefers-reduced-motion: reduce)';

export function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED);
      query.addEventListener('change', onChange);
      return () => query.removeEventListener('change', onChange);
    },
    () => window.matchMedia(REDUCED).matches,
    () => false
  );
}

/**
 * Plays a scene's script while it's on screen, like the app's onboarding
 * boards: `step` walks through `cues` (ms from the start), `ending` turns on
 * near `loopMs` so the board can fade, and it starts over. Off screen it
 * resets; with reduced motion it just shows the finished board.
 */
export function useTimeline(active: boolean, cues: number[], loopMs: number) {
  const reduced = useReducedMotion();
  const [state, setState] = useState({ step: -1, cycle: 0, ending: false });
  const cuesRef = useRef(cues);
  useEffect(() => {
    cuesRef.current = cues;
  });

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
    if (!active) {
      later(() => setState((s) => ({ step: -1, cycle: s.cycle + 1, ending: false })), 0);
    } else if (reduced) {
      later(() => setState((s) => ({ step: cuesRef.current.length - 1, cycle: s.cycle, ending: false })), 0);
    } else {
      const run = () => {
        timers.forEach(clearTimeout);
        timers = [];
        setState((s) => ({ step: -1, cycle: s.cycle + 1, ending: false }));
        cuesRef.current.forEach((at, i) => later(() => setState((s) => ({ ...s, step: i })), at));
        later(() => setState((s) => ({ ...s, ending: true })), loopMs - 600);
        later(run, loopMs);
      };
      run();
    }
    return () => timers.forEach(clearTimeout);
  }, [active, loopMs, reduced]);

  return state;
}
