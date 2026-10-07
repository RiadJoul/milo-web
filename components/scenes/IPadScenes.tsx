'use client';

import { Hand, Lightbulb, Mic } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { ApplePencil, DockButton, IPadSession, KeyNotesPanel, ProgressPanel, type Outcome } from '../board/devices';
import { Appear, DrawnCircle, Write } from '../board/parts';
import { useInView, useTimeline } from '../board/timeline';

/** Plays its scene only while it's on screen. */
function useScene(cues: number[], loopMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.3);
  return { ref, ...useTimeline(inView, cues, loopMs) };
}

/** The board's content, in a centred column, faded out before the loop restarts. */
function Page({ ending, children, className = 'left-[80px] w-[600px]' }: { ending: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={`absolute top-10 transition-opacity duration-500 ${className}`} style={{ opacity: ending ? 0 : 1 }}>
      {children}
    </div>
  );
}

/** Maths: the student works an equation with Apple Pencil, Milo circles the slip and gives a hint, not the answer. */
export function EquationScene() {
  const { ref, step, cycle, ending } = useScene([0, 700, 2000, 3200, 3700, 6300, 7400, 8200], 11500);
  const solved = step >= 7;
  const subtitle = solved
    ? "That's it: you isolated x. Nice work."
    : step >= 4
      ? "Close! You added the 3 instead of taking it away. What's 9 − 3?"
      : null;
  const questions: { label: string; outcome: Outcome }[] = [
    { label: 'x + 5 = 12', outcome: 'done' },
    { label: '2x + 3 = 9', outcome: solved ? 'done' : 'current' },
    { label: '3x − 4 = 11', outcome: 'todo' },
    { label: '5x + 2 = 3x + 10', outcome: 'todo' },
    { label: '4(x − 1) = 2x + 6', outcome: 'todo' },
    { label: 'x/3 + 2 = 2x − 3', outcome: 'todo' },
  ];
  return (
    <div ref={ref}>
      <IPadSession
        title="Linear equations"
        kind="Exercises · question 2 of 6"
        subtitle={subtitle}
        panel={<ProgressPanel score={solved ? '2 / 6' : '1 / 6'} scoreLabel="solved" questions={questions} />}
        dock={
          <>
            <DockButton primary>Check my work</DockButton>
            <DockButton>
              <Lightbulb size={16} /> Hint
            </DockButton>
            <DockButton>Skip</DockButton>
          </>
        }
      >
        <Page key={cycle} ending={ending}>
          <Write text="Solve for x" show={step >= 0} size={36} bold />
          <Write text="2x + 3 = 9" show={step >= 1} size={42} className="mt-8" />
          <div className="mt-4 flex items-center gap-8">
            <div className="relative w-fit">
              <Write text="2x = 12" show={step >= 2} size={42} who="student" />
              <ApplePencil show={step === 2} />
              <DrawnCircle show={step >= 3} x={-14} y={-6} w={176} h={66} color="var(--berry)" />
            </div>
            <Appear show={step >= 3 && step < 5}>
              <p className="font-hand text-[22px] text-berry">← check this step</p>
            </Appear>
          </div>
          <div className="relative mt-4 w-fit">
            <Write text="2x = 6" show={step >= 5} size={42} who="student" />
            <ApplePencil show={step === 5} />
          </div>
          <div className="mt-4 flex items-center gap-6">
            <div className="relative w-fit">
              <Write text="x = 3" show={step >= 6} size={42} who="student" />
              <ApplePencil show={step === 6} />
            </div>
            <Appear show={solved} from="zoom">
              <span className="font-hand text-[44px] font-bold text-leaf">✓</span>
            </Appear>
          </div>
        </Page>
      </IPadSession>
    </div>
  );
}

function AnswerLine({ text, show, writing, marked }: { text: string; show: boolean; writing: boolean; marked: boolean }) {
  return (
    <div className="mt-3 flex min-h-10 items-center justify-between gap-4">
      <div className="relative w-fit">
        <Write text={text} show={show} size={24} who="student" wordMs={80} />
        <ApplePencil show={writing} />
      </div>
      <Appear show={marked} from="zoom">
        <span className="font-hand text-[24px] font-bold text-leaf">✓ +1</span>
      </Appear>
    </div>
  );
}

/** Science exam prep: an exam-style question, marked like an examiner would. */
export function ExamScene() {
  const { ref, step, cycle, ending } = useScene([0, 600, 1600, 2300, 3000, 4000, 4400, 4800, 5500, 6300, 6900], 12500);
  const marked = step >= 9;
  const questions: { label: string; outcome: Outcome; marks?: string }[] = [
    { label: 'Label the parts of a leaf', outcome: 'done', marks: '3/3' },
    { label: 'What is chlorophyll?', outcome: 'done', marks: '2/2' },
    { label: 'How a leaf makes glucose', outcome: marked ? 'done' : 'current', marks: marked ? '3/4' : undefined },
    { label: 'Limiting factors', outcome: 'todo' },
    { label: 'Testing a leaf for starch', outcome: 'todo' },
    { label: 'Photosynthesis vs respiration', outcome: 'todo' },
  ];
  return (
    <div ref={ref}>
      <IPadSession
        title="Photosynthesis"
        kind="Exam prep · question 3 of 6"
        subtitle={step >= 10 ? "3 out of 4, a strong answer. The last mark is for saying it's stored as starch." : null}
        panel={<ProgressPanel score={marked ? '8 / 9' : '5 / 5'} scoreLabel="marks this round" questions={questions} />}
        dock={<DockButton primary>Mark my answer</DockButton>}
      >
        <Page key={cycle} ending={ending}>
          <Appear show={step >= 0}>
            <span className="inline-block rounded-full bg-subtle px-3 py-1.5 text-[13px] font-extrabold uppercase tracking-[1.2px] text-ink-muted">
              Exam question · 4 marks
            </span>
          </Appear>
          <Write text="Explain how a leaf makes glucose." show={step >= 1} size={30} bold className="mt-4" />
          <div className="my-4 h-px bg-line" />
          <AnswerLine text="The leaf takes in light energy" show={step >= 2} writing={step === 2} marked={step >= 5} />
          <AnswerLine text="chlorophyll traps the light" show={step >= 3} writing={step === 3} marked={step >= 6} />
          <AnswerLine text="water + CO₂ are made into glucose" show={step >= 4} writing={step === 4} marked={step >= 7} />
          <Appear show={step >= 8} from="left" className="mt-4">
            <p className="font-hand text-[21px] text-berry">✗ missed: what the plant does with the glucose</p>
          </Appear>
          <div className="mr-6 mt-6 flex items-center justify-end gap-8">
            <Appear show={marked}>
              <span className="font-hand text-[21px] text-ink-muted">Score</span>
            </Appear>
            <div className="relative">
              <Appear show={marked} from="zoom">
                <span className="font-hand text-[40px] font-bold text-ink">3/4</span>
              </Appear>
              <DrawnCircle show={marked} x={-14} y={-2} w={96} h={62} />
            </div>
          </div>
        </Page>
      </IPadSession>
    </div>
  );
}

/** Literature: circle a phrase, ask about it, and the answer lands in a side note beside the lesson. */
export function AskScene() {
  const { ref, step, cycle, ending } = useScene([0, 1300, 2300, 3000, 4800, 5400, 7000], 12000);
  const asking = step === 3;
  const notes = [
    [0, '**The Prologue** is a sonnet that tells the whole plot first.'],
    [6, '**Star-crossed**: doomed by fate, as if the stars were against them.'],
  ] as const;
  return (
    <div ref={ref}>
      <IPadSession
        title="Romeo and Juliet"
        kind="Lesson · idea 1 of 7"
        subtitle={step >= 6 ? 'Shakespeare tells you the ending first. The drama is watching them get there.' : null}
        panel={<KeyNotesPanel key={cycle} notes={notes} step={step} />}
        dock={
          asking ? (
            <div key="ask" className="anim-up flex w-[520px] items-center gap-2">
              <div className="flex h-12 flex-1 items-center rounded-full border border-line bg-surface px-5">
                <Write text="What does star-crossed mean?" show size={17} wordMs={150} />
              </div>
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-berry text-white">
                <span className="pulse-ring absolute inset-0 rounded-full bg-berry" />
                <Mic size={18} className="relative" />
              </span>
            </div>
          ) : (
            <DockButton key="btn" primary className={`transition-transform ${step === 2 ? 'scale-95' : ''}`}>
              <Hand size={17} strokeWidth={2.4} /> {step >= 4 ? 'Continue lesson' : 'I have a question'}
            </DockButton>
          )
        }
      >
        <Page key={cycle} ending={ending} className="left-[44px] right-[44px]">
          <div className="flex items-start gap-8">
            {/* The lesson's own column. */}
            <div className="w-[350px] shrink-0">
              <Write text="Romeo and Juliet" show={step >= 0} size={34} bold wordMs={0} />
              <div className="mt-4 flex items-center gap-4">
                <Appear show={step >= 0} className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element -- a board picture, sized by the scene */}
                  <img
                    src="/images/shakespeare.jpg"
                    alt="The Chandos portrait of William Shakespeare"
                    className="h-[130px] w-[102px] rounded-lg border border-line object-cover"
                  />
                </Appear>
                <div className="min-w-0 flex-1">
                  <Write text="In the Prologue they're" show={step >= 0} size={20} wordMs={0} />
                  <div className="relative my-1 w-fit">
                    <Write text="“star-cross'd lovers”" show={step >= 0} size={22} bold wordMs={0} />
                    <DrawnCircle show={step >= 1} x={-10} y={-4} w={218} h={40} color="var(--ink-muted)" />
                  </div>
                  <Write text="(line 6)" show={step >= 0} size={17} color="var(--ink-muted)" wordMs={0} />
                </div>
              </div>
              <Write text="The Prologue is a sonnet: 14 lines that give away the whole plot." show={step >= 0} size={20} wordMs={0} className="mt-6" />
            </div>

            {/* The answer, in its own framed side note beside the lesson, like the real board on a wide iPad. */}
            <Appear show={step >= 4} from="left" className="mt-16 flex-1">
              <div className="rounded-2xl border-[1.5px] border-ink/80 bg-surface px-5 pb-5 pt-4">
                <p className="text-[12px] font-extrabold uppercase tracking-[1.2px] text-ink-faint">You asked</p>
                <p className="mt-1 font-hand text-[21px] font-bold text-ink">What does star-crossed mean?</p>
                <div className="my-3 h-px bg-line" />
                <Write text="Doomed by fate: people thought the stars ruled your life." show={step >= 5} size={19} wordMs={90} />
                <Write text="So we know from the start it ends badly." show={step >= 5} size={19} wordMs={90} delay={700} className="mt-2" />
              </div>
            </Appear>
          </div>
        </Page>
      </IPadSession>
    </div>
  );
}
