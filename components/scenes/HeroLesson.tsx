'use client';

import { Hand } from 'lucide-react';
import { useRef, type CSSProperties } from 'react';
import { BOARD, DockButton, IPadSession, KeyNotesPanel } from '../board/devices';
import { Appear, DrawnCircle, Write } from '../board/parts';
import { useInView, useTimeline } from '../board/timeline';

/**
 * The hero: a whole lesson screen on an iPad. Milo writes the Moon landing
 * notes, brings in the photo, saves a key note, then the camera pans to the
 * next lane and he draws the Space Race as a timeline.
 */

// Each lane is 600 wide, one board width apart, so the camera pans a whole screen.
const LANE = BOARD.w;
const LANE_LEFT = (BOARD.w - 600) / 2;

const CUES = [0, 1300, 3100, 5000, 5800, 8200, 9800, 11200, 12600, 13600, 15200, 16800, 18600];
const LOOP = 23500;

const SUBTITLES: [number, string][] = [
  [1, 'July 1969. Three astronauts, one very small spacecraft.'],
  [2, 'Armstrong and Aldrin walk on the Moon while Collins stays in orbit.'],
  [4, "That's Buzz Aldrin. Look at his visor: that's Armstrong, taking the photo."],
  [6, "But why the rush? Let's go back twelve years."],
  [9, '1957: the Soviet Union launches Sputnik, the first satellite.'],
  [10, '1961: Yuri Gagarin becomes the first person in space.'],
  [11, 'Eight years later, Apollo 11 lands. That’s the race won.'],
];

const NOTES = [
  [5, '**Apollo 11** landed on the Moon on 20 July 1969.'],
  [12, 'The **Space Race**: the US and the USSR competing to lead in space.'],
] as const;

const EVENTS = [
  { x: 70, year: '1957', label: 'Sputnik 1, the first satellite', step: 9 },
  { x: 300, year: '1961', label: 'Gagarin, first person in space', step: 10 },
  { x: 530, year: '1969', label: 'Apollo 11 lands on the Moon', step: 11 },
];

export function HeroLesson() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.2);
  const { step, cycle, ending } = useTimeline(inView, CUES, LOOP);
  const subtitle = [...SUBTITLES].reverse().find(([at]) => step >= at)?.[1] ?? null;
  const panned = step >= 6;

  return (
    <div ref={ref}>
      <IPadSession
        title="The Moon Landing"
        kind={`Lesson · idea ${panned ? 2 : 1} of 6`}
        panel={<KeyNotesPanel key={cycle} notes={NOTES} step={step} />}
        subtitle={subtitle}
        dock={
          <>
            <DockButton primary>
              <Hand size={17} strokeWidth={2.4} /> I have a question
            </DockButton>
            <DockButton>Practise</DockButton>
          </>
        }
      >
        <div
          key={cycle}
          className="absolute inset-0 transition-[transform,opacity] ease-in-out"
          style={{
            transitionDuration: ending ? '450ms' : '1800ms',
            opacity: ending ? 0 : 1,
            transform: `translateX(${panned ? -LANE : 0}px) scale(${step >= 3 && !panned ? 1.03 : 1})`,
            transformOrigin: '30% 20%',
          }}
        >
          <section className="absolute top-10" style={{ left: LANE_LEFT, width: 600 }}>
            <Write text="The Moon Landing" show={step >= 0} size={36} bold />
            <Appear show={step >= 0}>
              <div className="anim-grow-x mb-4 mt-1 h-[3px] w-64 rounded-full bg-ink" style={{ animationDelay: '300ms' }} />
            </Appear>
            <Write text="20 July 1969: Apollo 11 lands on the Moon." show={step >= 1} size={21} />
            <Write
              text="Armstrong & Aldrin walk, Collins orbits"
              show={step >= 2}
              size={21}
              bold
              className="mt-2"
            />
            <Appear show={step >= 3} from="zoom" className="mt-5 w-[300px]">
              {/* eslint-disable-next-line @next/next/no-img-element -- a board picture, sized by the scene */}
              <img
                src="/images/moon.jpg"
                alt="Buzz Aldrin on the Moon, photographed by Neil Armstrong"
                className="h-[250px] w-[300px] rounded-xl border border-line object-cover"
              />
            </Appear>
            <Appear show={step >= 4}>
              <p className="mt-2 font-hand text-[15px] text-ink-muted">↑ Buzz Aldrin, photographed by Neil Armstrong</p>
            </Appear>
          </section>

          <section className="absolute top-10" style={{ left: LANE + LANE_LEFT, width: 600 }}>
            <Write text="The Space Race" show={step >= 7} size={36} bold />
            <Appear show={step >= 7}>
              <div className="anim-grow-x mt-1 h-[3px] w-56 rounded-full bg-ink" style={{ animationDelay: '300ms' }} />
            </Appear>
            <div className="relative mt-16 h-[260px]">
              {step >= 8 && (
                <svg className="absolute left-0 top-[70px] overflow-visible" width={600} height={20} aria-hidden>
                  <path
                    className="anim-draw"
                    pathLength={1}
                    d="M10 10 H590 M576 2 L590 10 L576 18"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ '--draw-ms': '900ms' } as CSSProperties}
                  />
                </svg>
              )}
              {EVENTS.map((event) => (
                <Appear
                  key={event.year}
                  show={step >= event.step}
                  from="zoom"
                  className="absolute top-0 w-[170px] text-center"
                  style={{ left: event.x - 85 }}
                >
                  <p className="font-hand text-[26px] font-bold text-ink">{event.year}</p>
                  <span className="mx-auto mt-[35px] block h-5 w-5 rounded-full border-[3px] border-ink bg-surface" />
                  <Write text={event.label} show size={17} wordMs={90} delay={250} className="mt-3" />
                </Appear>
              ))}
              <DrawnCircle show={step >= 11} x={530 - 52} y={-4} w={104} h={50} durationMs={700} />
            </div>
          </section>
        </div>
      </IPadSession>
    </div>
  );
}
