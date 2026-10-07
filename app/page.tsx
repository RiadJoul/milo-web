import { Check, Flag, Globe, ImageIcon, Mic, PenLine, ShieldCheck } from 'lucide-react';
import { GraphScene, MindMapScene, NotesToPlanScene } from '@/components/scenes/BoardScenes';
import { HeroLesson } from '@/components/scenes/HeroLesson';
import { AskScene, EquationScene, ExamScene } from '@/components/scenes/IPadScenes';
import { Reveal } from '@/components/site/Reveal';
import { Eyebrow, GetMilo, Headline, Logo } from '@/components/site/ui';
import { APP_STORE_URL, PRICES, PRIVACY_URL, SUPPORT_EMAIL, TERMS_URL } from '@/lib/site';

const TOPICS = [
  'The Moon Landing',
  'Photosynthesis',
  'Quadratic equations',
  'The causes of WW1',
  'Romeo and Juliet',
  'Supply and demand',
  'Cell division',
  'The French Revolution',
  'Derivatives',
  'The water cycle',
  'Newton’s laws',
  'The Cold War',
];

const FEATURES = [
  {
    scene: <EquationScene />,
    eyebrow: 'Exercises',
    first: 'Stuck on a step?',
    second: 'Milo spots it.',
    body: 'Work it out on the board with Apple Pencil, like on paper. Milo reads every line you write, finds the exact step that slipped, and gives you a hint, not the answer.',
    points: ['Easy to hard, one question at a time', 'Hints when you want them', 'Every mistake becomes a note to revise'],
  },
  {
    scene: <ExamScene />,
    eyebrow: 'Exam prep',
    first: 'Practise like it’s',
    second: 'the real exam.',
    body: 'Exam-style questions on everything the lesson covered, marked the way an examiner would: where you earned marks, where you lost them, and what to review next.',
    points: ['Partial marks, line by line', 'A report on your strengths and weak spots', 'The next round aims at what you missed'],
  },
  {
    scene: <AskScene />,
    eyebrow: 'Questions',
    first: 'Interrupt him.',
    second: 'He loves it.',
    body: 'Tap “I have a question”, ask out loud, or just circle a line with your Pencil. Milo answers in a side note right beside the lesson, then carries on where he left off.',
    points: ['Speak or type', 'Point at anything on the board', 'Ask again and he explains it another way'],
  },
];

const FAQ = [
  {
    q: 'What can Milo teach?',
    a: 'Any high school or college topic: maths, sciences, history, literature, languages, economics and more. Type a topic, upload a PDF or photos of your notes, or paste text, and Milo plans a full lesson on it.',
  },
  {
    q: 'How long is a lesson?',
    a: 'As long as the topic needs. Milo plans the whole chapter first (between 3 and 12 ideas) and teaches it to the end, finishing with a mind map recap. You can stop, ask questions, or practise at any point.',
  },
  {
    q: 'Which devices does it run on?',
    a: 'Milo is made for iPad, in portrait or landscape. Apple Pencil works like a real pen: pressure, palm rejection, and one finger to scroll the board. You can also write with your finger.',
  },
  {
    q: 'What languages does Milo speak?',
    a: 'English, Spanish and French. Milo teaches, writes and talks in the language you pick.',
  },
  {
    q: 'Who is Milo for?',
    a: 'Students aged 13 and up, from high school to college.',
  },
  {
    q: 'Can I cancel?',
    a: 'Any time, in your App Store subscription settings. You keep Pro until the end of the period you paid for.',
  },
];

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Nav />

      {/* Hero */}
      <header className="mx-auto max-w-6xl px-4 pb-10 pt-14 text-center sm:px-6 sm:pt-20">
        <Reveal>
          <h1 className="font-display text-[44px] font-extrabold leading-[1] tracking-[-0.03em] text-ink sm:text-[72px]">
            A tutor who teaches
            <br />
            <span className="text-accent-soft">on the board.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[18px] leading-7 text-ink-muted sm:text-[20px] sm:leading-8">
            Pick any topic or upload your notes. Milo explains it out loud, writes the notes as he goes, brings in real
            pictures, and checks your work.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GetMilo />
            <a href="#how" className="inline-flex h-13 items-center rounded-full px-6 text-[16px] font-extrabold text-ink hover:bg-subtle">
              See how it works
            </a>
          </div>
          <p className="mt-4 text-[13px] font-semibold text-ink-faint">Made for iPad and Apple Pencil</p>
        </Reveal>
      </header>

      <Reveal delay={150} className="mx-auto max-w-6xl px-4 sm:px-6">
        <HeroLesson />
      </Reveal>

      {/* Topics marquee */}
      <section aria-label="Example topics" className="mt-20 border-y border-line py-5">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee flex w-max gap-3">
            {[...TOPICS, ...TOPICS].map((topic, i) => (
              <span
                key={i}
                aria-hidden={i >= TOPICS.length}
                className="whitespace-nowrap rounded-full bg-subtle px-4 py-2 font-hand text-[17px] text-ink"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How a lesson works */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <Headline first="Like your study buddy," second="made just for you." className="mt-3" />
          <p className="mt-5 text-[18px] leading-7 text-ink-muted">
            Milo talks you through the topic while he writes it out, pulls in real photos, draws diagrams, and moves the
            camera across the board as the story goes. The key points are saved for you to revise.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Mic, 'He talks', 'A natural voice with subtitles, phrase by phrase.'],
            [PenLine, 'He writes', 'Notes in his own handwriting, word by word.'],
            [ImageIcon, 'He shows', 'Real photos and drawings: timelines, mind maps, graphs.'],
            [Check, 'He checks', 'Write on the board with Apple Pencil and he reads your working.'],
          ].map(([Icon, title, body], i) => {
            const I = Icon as typeof Mic;
            return (
              <Reveal key={title as string} delay={i * 80}>
                <div className="h-full rounded-[22px] bg-subtle p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-on-accent">
                    <I size={19} strokeWidth={2.3} />
                  </span>
                  <p className="mt-5 font-display text-[20px] font-extrabold text-ink">{title as string}</p>
                  <p className="mt-1.5 text-[15px] leading-6 text-ink-muted">{body as string}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Bring your notes */}
      <section className="bg-subtle">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Your notes, taught</Eyebrow>
            <Headline first="Upload a PDF." second="Get a whole lesson." className="mt-3" />
            <p className="mt-5 text-[18px] leading-7 text-ink-muted">
              Bring class notes, a textbook chapter, or photos of the whiteboard. Milo reads it, plans the topic the way a
              textbook chapter would, and teaches it from start to finish, from your material.
            </p>
            <p className="mt-4 text-[15px] leading-6 text-ink-muted">
              Keep files in folders in your library and Milo teaches from the whole folder.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <NotesToPlanScene />
          </Reveal>
        </div>
      </section>

      {/* Features, each on an iPad */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {FEATURES.map((feature) => (
          <div key={feature.eyebrow} className="py-16">
            <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <Eyebrow>{feature.eyebrow}</Eyebrow>
                <Headline first={feature.first} second={feature.second} className="mt-3" />
              </Reveal>
              <Reveal delay={100}>
                <p className="text-[18px] leading-7 text-ink-muted">{feature.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 rounded-full bg-subtle px-3.5 py-2 text-[14px] font-bold text-ink">
                      <Check size={14} strokeWidth={3} />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={150} className="mx-auto mt-12 max-w-5xl">
              {feature.scene}
            </Reveal>
          </div>
        ))}
      </section>

      {/* Diagrams */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Diagrams</Eyebrow>
            <Headline first="He draws it out." second="Stroke by stroke." className="mt-3" />
            <p className="mt-5 text-[18px] leading-7 text-ink-muted">
              Timelines, flows, cycles, comparisons, graphs and charts, drawn live on the board where they help most.
              Ask for one and he draws it. Every lesson ends with a mind map of what you learned.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <MindMapScene />
              <p className="mt-3 text-[14px] font-semibold text-ink-muted">The recap: a mind map of the lesson.</p>
            </Reveal>
            <Reveal delay={120}>
              <GraphScene />
              <p className="mt-3 text-[14px] font-semibold text-ink-muted">“Plot y = x² − 4”</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Built for students</Eyebrow>
            <Headline first="Safe by design." second="Focused on learning." className="mt-3" />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              [ShieldCheck, 'Checked, every time', 'Every reply and every picture is safety-checked before it reaches the board.'],
              [Flag, 'Report any line', 'Something feels off? Flag it in one tap and it goes straight to our team.'],
              [Globe, 'Three languages', 'Milo teaches in English, Spanish or French. No ads, and your data is never sold.'],
            ].map(([Icon, title, body], i) => {
              const I = Icon as typeof Mic;
              return (
                <Reveal key={title as string} delay={i * 80}>
                  <div className="h-full rounded-[22px] bg-surface p-6">
                    <I size={22} strokeWidth={2} className="text-ink" />
                    <p className="mt-4 font-display text-[20px] font-extrabold text-ink">{title as string}</p>
                    <p className="mt-1.5 text-[15px] leading-6 text-ink-muted">{body as string}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
          <Reveal className="text-center">
            <Eyebrow>Pricing</Eyebrow>
            <Headline first="One plan." second="Two ways to pay." className="mt-3" />
            <p className="mx-auto mt-5 max-w-lg text-[18px] leading-7 text-ink-muted">
              Milo Pro unlocks every lesson, exercise and exam prep session.
            </p>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2">
            <Reveal>
              <PriceCard name="Weekly" price={PRICES.weekly} period="per week" />
            </Reveal>
            <Reveal delay={100}>
              <PriceCard
                name="Yearly"
                price={PRICES.yearly}
                period="per year"
                note={`Just ${PRICES.yearlyPerWeek} a week`}
                badge={PRICES.yearlySaving}
                featured
              />
            </Reveal>
          </div>
          <p className="mt-6 text-center text-[13px] text-ink-faint">
            Billed through the App Store. Cancel any time in your subscription settings.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 bg-subtle">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <Headline first="Questions." className="mt-3" />
          </Reveal>
          <div className="mt-10 divide-y divide-line rounded-[22px] bg-surface">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold text-ink">
                  {q}
                  <span className="text-[22px] font-normal leading-none text-ink-faint transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[16px] leading-7 text-ink-muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call */}
      <section className="mx-auto max-w-6xl px-4 py-28 text-center sm:px-6">
        <Reveal>
          <span className="inline-flex text-ink">
            <Logo size={56} />
          </span>
          <h2 className="mt-6 font-display text-[40px] font-extrabold leading-[1.02] tracking-[-0.02em] text-ink sm:text-[60px]">
            Learn anything,
            <br />
            <span className="text-accent-soft">on the board.</span>
          </h2>
          <div className="mt-9">
            <GetMilo />
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line/70 bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5 text-ink">
          <Logo />
          <span className="font-display text-[22px] font-extrabold tracking-[-0.02em]">Milo</span>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <a href="#how" className="hidden rounded-full px-4 py-2 text-[15px] font-bold text-ink-muted hover:text-ink sm:block">
            How it works
          </a>
          <a href="#pricing" className="hidden rounded-full px-4 py-2 text-[15px] font-bold text-ink-muted hover:text-ink sm:block">
            Pricing
          </a>
          <a href="#faq" className="hidden rounded-full px-4 py-2 text-[15px] font-bold text-ink-muted hover:text-ink md:block">
            FAQ
          </a>
          <a
            href={APP_STORE_URL || '#pricing'}
            className="ml-2 rounded-full bg-accent px-4 py-2 text-[15px] font-extrabold text-on-accent transition-transform hover:scale-[1.03]"
          >
            Get Milo
          </a>
        </div>
      </div>
    </nav>
  );
}

function PriceCard({
  name,
  price,
  period,
  note,
  badge,
  featured,
}: {
  name: string;
  price: string;
  period: string;
  note?: string;
  badge?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative h-full rounded-[26px] p-7 ${
        featured ? 'bg-accent text-on-accent' : 'border border-line bg-surface text-ink'
      }`}
    >
      {badge && (
        <span className="absolute right-6 top-6 rounded-full bg-highlight px-3 py-1 text-[12px] font-extrabold text-on-highlight">
          {badge}
        </span>
      )}
      <p className="text-[15px] font-extrabold uppercase tracking-[1.4px] opacity-60">{name}</p>
      <p className="mt-4 font-display text-[48px] font-extrabold leading-none tracking-[-0.02em]">{price}</p>
      <p className="mt-2 text-[15px] font-semibold opacity-60">{period}</p>
      <p className="mt-1 min-h-6 text-[15px] font-bold">{note}</p>
      <ul className="mt-6 space-y-2.5 text-[15px] font-semibold">
        {['7 new lessons every week', 'Full lessons on any topic', 'Lessons from your own notes and PDFs', 'Exercises and exam prep', 'Voice, subtitles, diagrams'].map(
          (item) => (
            <li key={item} className="flex items-center gap-2.5">
              <Check size={16} strokeWidth={3} className="shrink-0 opacity-70" />
              {item}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

function Footer() {
  const links = [
    ['Privacy', PRIVACY_URL],
    ['Terms', TERMS_URL],
    ['Support', SUPPORT_EMAIL && `mailto:${SUPPORT_EMAIL}`],
  ].filter(([, href]) => href);
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-[14px] text-ink-faint sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-ink">
          <Logo size={20} />
          <span className="font-display text-[17px] font-extrabold">Milo</span>
        </div>
        <div className="flex items-center gap-6">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="font-semibold hover:text-ink">
              {label}
            </a>
          ))}
          <span>© 2026 Milo</span>
        </div>
      </div>
    </footer>
  );
}
