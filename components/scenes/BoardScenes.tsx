'use client';

import { Check, FileText, Shapes } from 'lucide-react';
import { useRef, type CSSProperties } from 'react';
import { Appear } from '../board/parts';
import { useInView, useTimeline } from '../board/timeline';

function useScene(cues: number[], loopMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return { ref, ...useTimeline(inView, cues, loopMs) };
}

const draw = (ms: number, delay = 0) =>
  ({ '--draw-ms': `${ms}ms`, animationDelay: `${delay}ms` }) as CSSProperties;

/** A file goes in, a lesson plan comes out: the whole chapter, ideas tagged with the drawing that shows them best. */
const PLAN = [
  ['What a cell is', null],
  ['Animal vs plant cells', 'compare'],
  ['Organelles and their jobs', 'tree'],
  ['The cell membrane', null],
  ['Diffusion and osmosis', 'flow'],
  ['Cell division', 'cycle'],
] as const;

export function NotesToPlanScene() {
  const { ref, step, cycle, ending } = useScene([0, 400, 1900, 2500, 2900, 3300, 3700, 4100, 4500, 5600], 11000);
  return (
    <div ref={ref} className="rounded-[28px] border border-line bg-surface p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] sm:p-8">
      <div key={cycle} className="transition-opacity duration-500" style={{ opacity: ending ? 0 : 1 }}>
        <Appear show={step >= 0} from="up">
          <div className="flex items-center gap-3 rounded-2xl bg-subtle p-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-ink">
              <FileText size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold text-ink">cell-biology-notes.pdf</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
                {step >= 1 && <div className="anim-grow-x h-full rounded-full bg-ink" style={{ animationDuration: '1400ms' }} />}
              </div>
            </div>
            <span className="text-[13px] font-semibold text-ink-faint">{step >= 2 ? '14 pages' : 'Reading…'}</span>
          </div>
        </Appear>

        <p className="mb-3 mt-6 text-[12px] font-extrabold uppercase tracking-[1.2px] text-ink-faint">Lesson plan</p>
        <ol className="space-y-2">
          {PLAN.map(([idea, diagram], i) => (
            <li key={idea} className="min-h-10">
              <Appear show={step >= 3 + i} from="left" className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold ${
                    step >= 9 && i < 2 ? 'bg-accent text-on-accent' : 'bg-subtle text-ink-muted'
                  }`}
                >
                  {step >= 9 && i < 2 ? <Check size={13} strokeWidth={3} /> : i + 1}
                </span>
                <span className="flex-1 text-[15px] font-semibold text-ink">{idea}</span>
                {diagram && (
                  <span className="flex items-center gap-1 rounded-full bg-subtle px-2 py-0.5 text-[11px] font-bold text-ink-muted">
                    <Shapes size={11} /> {diagram}
                  </span>
                )}
              </Appear>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Milo's recap: a mind map of the main ideas, drawn box by box. */
const BRANCHES = [
  { x: 40, y: 40, label: 'Light energy' },
  { x: 330, y: 40, label: 'Chlorophyll' },
  { x: 40, y: 250, label: 'Water + CO₂' },
  { x: 330, y: 250, label: 'Glucose → starch' },
];

export function MindMapScene() {
  const { ref, step, cycle, ending } = useScene([0, 900, 1600, 2300, 3000], 10000);
  return (
    <div ref={ref} className="graph-paper relative aspect-[520/340] overflow-hidden rounded-[22px] border border-line">
      <svg key={cycle} viewBox="0 0 520 340" className="absolute inset-0 h-full w-full transition-opacity duration-500" style={{ opacity: ending ? 0 : 1 }}>
        {step >= 0 && (
          <g>
            <rect className="anim-draw" pathLength={1} x={170} y={145} width={180} height={50} rx={14} fill="none" stroke="var(--ink)" strokeWidth={2.6} style={draw(700)} />
            <text x={260} y={177} textAnchor="middle" className="anim-fade font-hand" style={{ animationDelay: '500ms' }} fontSize={20} fontWeight={700} fill="var(--ink)">
              Photosynthesis
            </text>
          </g>
        )}
        {BRANCHES.map((branch, i) => {
          if (step < i + 1) return null;
          const cx = branch.x + 75;
          const cy = branch.y + 22;
          const fromX = cx < 260 ? 170 : 350;
          return (
            <g key={branch.label}>
              <path
                className="anim-draw"
                pathLength={1}
                d={`M${fromX} 170 C ${(fromX + cx) / 2} 170, ${cx} ${(170 + cy) / 2}, ${cx} ${cy + (cy < 170 ? 22 : -22)}`}
                fill="none"
                stroke="var(--ink-muted)"
                strokeWidth={2}
                strokeLinecap="round"
                style={draw(500)}
              />
              <rect className="anim-draw" pathLength={1} x={branch.x} y={branch.y} width={150} height={44} rx={12} fill="var(--surface)" stroke="var(--ink)" strokeWidth={2} style={draw(500, 350)} />
              <text x={cx} y={cy + 6} textAnchor="middle" className="anim-fade font-hand" style={{ animationDelay: '700ms' }} fontSize={16} fill="var(--ink)">
                {branch.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** A graph, the curve traced left to right like BoardController.animateDiagram. */
export function GraphScene() {
  const { ref, step, cycle, ending } = useScene([0, 800, 1500, 3200], 9000);
  // y = x² − 4 for x in [-3, 3], on a 520 × 340 page; origin at (260, 230), 50px per unit x, 22px per unit y.
  const points = Array.from({ length: 61 }, (_, i) => {
    const x = -3 + i * 0.1;
    return `${260 + x * 50},${230 - (x * x - 4) * 22}`;
  });
  return (
    <div ref={ref} className="graph-paper relative aspect-[520/340] overflow-hidden rounded-[22px] border border-line">
      <svg key={cycle} viewBox="0 0 520 340" className="absolute inset-0 h-full w-full transition-opacity duration-500" style={{ opacity: ending ? 0 : 1 }}>
        {step >= 0 && (
          <path className="anim-draw" pathLength={1} d="M90 230 H430 M260 330 V30" fill="none" stroke="var(--ink-muted)" strokeWidth={2} strokeLinecap="round" style={draw(700)} />
        )}
        {step >= 0 && (
          <text x={30} y={48} className="anim-fade font-hand" fontSize={22} fontWeight={700} fill="var(--ink)">
            y = x² − 4
          </text>
        )}
        {step >= 1 && (
          <polyline className="anim-draw" pathLength={1} points={points.join(' ')} fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={draw(1500)} />
        )}
        {step >= 2 &&
          [160, 360].map((x, i) => (
            <g key={x} className="anim-zoom" style={{ animationDelay: `${600 + i * 250}ms`, transformOrigin: `${x}px 230px` }}>
              <circle cx={x} cy={230} r={6} fill="var(--ink)" />
              <text x={i ? x + 22 : x - 22} y={214} textAnchor={i ? "start" : "end"} className="font-hand" fontSize={16} fill="var(--ink)">
                {i ? '(2, 0)' : '(−2, 0)'}
              </text>
            </g>
          ))}
        {step >= 3 && (
          <text x={290} y={330} className="anim-fade font-hand" fontSize={15} fill="var(--ink-muted)">
            ← lowest point (0, −4)
          </text>
        )}
      </svg>
    </div>
  );
}
