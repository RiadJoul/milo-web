'use client';

import { ChevronLeft, Eraser, Flag, Hand, Highlighter, Lasso, PanelLeftClose, Pen, Redo2, Captions, Type, Undo2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { Appear, KeyNoteText, Scaled, Subtitle } from './parts';

/** iPad Air in landscape: the screen is laid out at 1180 × 820, plus the bezel. */
export const IPAD = { w: 1180, h: 820, bezel: 16 };

/**
 * The board's visible size inside IPadSession (screen minus the side panel,
 * the rail, gutters, header and dock), for scenes that place things on it.
 */
export const BOARD = { w: 784, h: 644 };

export function IPadFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { w, h, bezel } = IPAD;
  return (
    <Scaled width={w + bezel * 2} height={h + bezel * 2} className={className}>
      <div
        className="rounded-[46px] bg-bezel shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/10"
        style={{ padding: bezel, width: w + bezel * 2, height: h + bezel * 2 }}
      >
        <div className="relative overflow-hidden rounded-[32px] bg-subtle" style={{ width: w, height: h }}>
          {children}
        </div>
      </div>
    </Scaled>
  );
}

/** The session header: back, the session's title and kind, report flag. */
function SessionHeader({ title, kind }: { title: string; kind: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink shadow-sm">
        <ChevronLeft size={20} strokeWidth={2.4} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-[19px] font-extrabold leading-6 text-ink">{title}</p>
        <p className="text-[12px] font-bold uppercase tracking-[1.1px] text-ink-faint">{kind}</p>
      </div>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink-muted shadow-sm">
        <Flag size={16} strokeWidth={2.2} />
      </span>
    </div>
  );
}

/** components/BoardToolRail.tsx: select, move, pen, highlighter, eraser, text · undo / redo · subtitles. */
function ToolRail() {
  const tools = [
    ['lasso', Lasso],
    ['hand', Hand],
    ['pen', Pen],
    ['highlighter', Highlighter],
    ['eraser', Eraser],
    ['text', Type],
  ] as const;
  return (
    <div className="flex flex-col items-center gap-1 rounded-[18px] border border-line bg-surface p-1.5 text-ink-muted shadow-sm">
      {tools.map(([name, Icon]) => (
        <span
          key={name}
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${name === 'pen' ? 'bg-accent text-on-accent' : ''}`}
        >
          <Icon size={19} strokeWidth={2} />
        </span>
      ))}
      <span className="my-1 h-px w-6 bg-line" />
      {[Undo2, Redo2, Captions].map((Icon, i) => (
        <span key={i} className="flex h-10 w-10 items-center justify-center">
          <Icon size={19} strokeWidth={2} />
        </span>
      ))}
    </div>
  );
}

/** A dock button: the black primary, or the quiet outlined one. */
export function DockButton({ children, primary, className = '' }: { children: ReactNode; primary?: boolean; className?: string }) {
  return (
    <span
      className={`flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-extrabold ${
        primary ? 'bg-accent text-on-accent' : 'border border-line bg-surface text-ink'
      } ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * The tutor screen on a landscape iPad: side panel left of the board (key
 * notes in a lesson, progress in practice), the board page, the tool rail,
 * and the dock below. Children are drawn on the board (BOARD.w × BOARD.h).
 */
export function IPadSession({
  title,
  kind,
  panel,
  dock,
  subtitle,
  children,
}: {
  title: string;
  kind: string;
  panel: ReactNode;
  dock: ReactNode;
  subtitle?: string | null;
  children: ReactNode;
}) {
  return (
    <IPadFrame>
      <div className="absolute inset-0 flex flex-col px-6 pb-4 pt-5">
        <div className="pl-[276px] pr-[72px]">
          <SessionHeader title={title} kind={kind} />
        </div>
        <div className="mt-4 flex min-h-0 flex-1 gap-4">
          <aside className="flex w-[260px] flex-col rounded-[22px] border border-line bg-surface p-5">{panel}</aside>
          <div className="graph-paper relative min-w-0 flex-1 overflow-hidden rounded-[22px] border border-line">
            {children}
            <Subtitle
              text={subtitle ?? null}
              className="bottom-6 left-1/2 w-[600px] -translate-x-1/2 [&_p]:text-[19px] [&_p]:leading-7"
            />
          </div>
          <div className="w-[56px]">
            <ToolRail />
          </div>
        </div>
        <div className="mt-4 flex h-12 justify-center gap-3 pl-[276px] pr-[72px]">{dock}</div>
      </div>
    </IPadFrame>
  );
}

function PanelTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[12px] font-extrabold uppercase tracking-[1.2px] text-ink-faint">{children}</p>
      <PanelLeftClose size={16} className="text-ink-faint" />
    </div>
  );
}

/** The lesson's side panel: key notes, each appearing when its step comes. */
export function KeyNotesPanel({ notes, step }: { notes: readonly (readonly [number, string])[]; step: number }) {
  return (
    <>
      <PanelTitle>Key notes</PanelTitle>
      <div className="mt-4 space-y-3">
        {notes.map(([at, text]) => (
          <Appear key={text} show={step >= at} from="left">
            <p className="rounded-2xl bg-subtle px-3.5 py-3 text-[14px] leading-[1.45] text-ink">
              <KeyNoteText text={text} />
            </p>
          </Appear>
        ))}
        {!notes.some(([at]) => step >= at) && (
          <p className="text-[13px] leading-5 text-ink-faint">Milo saves the main points here as he teaches.</p>
        )}
      </div>
    </>
  );
}

export type Outcome = 'done' | 'current' | 'todo';

/** Practice's side panel (PracticePanel in the app): the score and each question's outcome. */
export function ProgressPanel({
  score,
  scoreLabel = 'score this round',
  questions,
}: {
  score: string;
  scoreLabel?: string;
  questions: { label: string; outcome: Outcome; marks?: string }[];
}) {
  return (
    <>
      <PanelTitle>Progress</PanelTitle>
      <p key={score} className="anim-fade mt-4 font-display text-[34px] font-extrabold leading-none text-ink">
        {score}
      </p>
      <p className="mt-1 text-[13px] font-semibold text-ink-faint">{scoreLabel}</p>
      <div className="mt-5 space-y-1.5">
        {questions.map((q, i) => (
          <div
            key={q.label}
            className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[14px] ${
              q.outcome === 'current' ? 'bg-subtle font-bold text-ink' : 'text-ink-muted'
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${
                q.outcome === 'done'
                  ? 'bg-leaf-soft text-leaf'
                  : q.outcome === 'current'
                    ? 'bg-accent text-on-accent'
                    : 'bg-subtle text-ink-faint'
              }`}
            >
              {q.outcome === 'done' ? '✓' : i + 1}
            </span>
            <span className="flex-1 truncate">{q.label}</span>
            {q.marks && <span className="text-[13px] font-bold">{q.marks}</span>}
          </div>
        ))}
      </div>
    </>
  );
}

/**
 * An Apple Pencil writing: its tip sits on the bottom-left corner of this
 * element's box, so put it in a relative wrapper at the end of the line.
 */
export function ApplePencil({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <svg
      aria-hidden
      width={150}
      height={150}
      viewBox="0 0 150 150"
      className="anim-fade pointer-events-none absolute drop-shadow-[0_8px_10px_rgba(0,0,0,0.18)]"
      // The tip is at (28, 122) in the drawing: land it just after the text, near the baseline.
      style={{ left: 'calc(100% - 22px)', bottom: '6px', marginBottom: -28 }}
    >
      <g transform="rotate(135 75 75)">
        <rect x={14} y={67} width={112} height={16} rx={4} fill="#FFFFFF" stroke="#D4D4D4" />
        <path d="M126 67 L142 75 L126 83 Z" fill="#EDEDED" stroke="#D4D4D4" strokeLinejoin="round" />
        <path d="M137 72.5 L142 75 L137 77.5 Z" fill="#8C8C8C" />
        <rect x={22} y={67} width={3} height={16} fill="#E6E6E6" />
      </g>
    </svg>
  );
}
