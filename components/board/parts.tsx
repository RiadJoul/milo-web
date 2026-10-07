'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/**
 * Building blocks for the page's live boards. They look like the app's board
 * (graph paper, Chalkboard handwriting) but are plain elements, scripted by
 * useTimeline. Ported from the app's components/onboarding/board.tsx.
 */

type Enter = 'fade' | 'up' | 'down' | 'left' | 'zoom';

/** Mounts its children with an entrance once `show` is true. */
export function Appear({
  show,
  from = 'fade',
  delay = 0,
  className = '',
  style,
  children,
}: {
  show: boolean;
  from?: Enter;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  if (!show) return null;
  return (
    <div className={`anim-${from} ${className}`} style={{ animationDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/**
 * Handwriting that writes itself word by word, the way Milo writes on the
 * real board. `who` picks the pen: Milo's ink, or the student's grey.
 */
export function Write({
  text,
  show,
  size = 17,
  bold,
  color,
  who = 'milo',
  wordMs = 110,
  delay = 0,
  className = '',
  style,
}: {
  text: string;
  show: boolean;
  size?: number;
  bold?: boolean;
  color?: string;
  who?: 'milo' | 'student';
  wordMs?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  if (!show) return null;
  const words = text.split(' ');
  return (
    <p
      className={`font-hand ${className}`}
      style={{
        fontSize: size,
        lineHeight: 1.35,
        fontWeight: bold ? 700 : 400,
        color: color ?? (who === 'student' ? 'var(--ink-muted)' : 'var(--ink)'),
        transform: who === 'student' ? 'rotate(-1deg)' : undefined,
        transformOrigin: 'left',
        ...style,
      }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="anim-word" style={{ animationDelay: `${delay + i * wordMs}ms` }}>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}

/**
 * A loop drawn around something: the student circling a word, or Milo
 * circling a mistake (red, the one colour that means "look here").
 * Absolutely positioned: give it the box to circle.
 */
export function DrawnCircle({
  show,
  x,
  y,
  w,
  h,
  color = 'var(--ink)',
  durationMs = 650,
}: {
  show: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  durationMs?: number;
}) {
  if (!show) return null;
  const pad = 6;
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute overflow-visible"
      width={w + pad * 2}
      height={h + pad * 2}
      style={{ left: x - pad, top: y - pad, transform: 'rotate(-3deg)' }}
    >
      <ellipse
        className="anim-draw"
        pathLength={1}
        cx={w / 2 + pad}
        cy={h / 2 + pad}
        rx={w / 2}
        ry={h / 2}
        fill="none"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        style={{ '--draw-ms': `${durationMs}ms` } as CSSProperties}
      />
    </svg>
  );
}

/** What Milo is saying, as the session screen's subtitle bar shows it. */
export function Subtitle({ text, className = '' }: { text: string | null; className?: string }) {
  if (!text) return null;
  return (
    <div key={text} className={`anim-up absolute rounded-2xl bg-black/75 px-4 pb-3 pt-2 backdrop-blur ${className}`}>
      <div className="mx-auto mb-1.5 h-1 w-7 rounded-full bg-white/25" />
      <p className="text-center text-[14px] font-semibold leading-5 text-white">{text}</p>
    </div>
  );
}

/** A key term in `**…**` shown on the highlighter, like the app's key notes. */
export function KeyNoteText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith('**') ? (
          <mark key={i} className="rounded-[3px] bg-highlight px-0.5 font-bold text-on-highlight">
            {part.slice(2, -2)}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/**
 * Draws a fixed-size design (`width` × `height`) scaled to fit its parent's
 * width, so a whole device screen can be laid out in real pixels once.
 */
export function Scaled({
  width,
  height,
  className = '',
  children,
}: {
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);
  return (
    <div ref={ref} className={`relative w-full ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
