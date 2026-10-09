import Link from 'next/link';
import type { ReactNode } from 'react';
import { Logo } from '@/components/site/ui';
import { SUPPORT_EMAIL } from '@/lib/site';

/** A plain text page (privacy, terms, support): the logo home, a title, then the text. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <nav className="border-b border-line/70">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 text-ink">
            <Logo />
            <span className="font-display text-[22px] font-extrabold tracking-[-0.02em]">Milo</span>
          </Link>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6">
        <h1 className="font-display text-[40px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">{title}</h1>
        <div className="mt-6">{children}</div>
      </main>
    </>
  );
}

/** The support address as a link wherever it appears in a line. */
function withEmail(line: string): ReactNode {
  if (!SUPPORT_EMAIL || !line.includes(SUPPORT_EMAIL)) return line;
  const [before, after] = line.split(SUPPORT_EMAIL);
  return (
    <>
      {before}
      <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-ink underline underline-offset-2">
        {SUPPORT_EMAIL}
      </a>
      {after}
    </>
  );
}

/** Renders lib/legal-text.ts: "### " headings, "- " lists, "_…_" the date line, the rest paragraphs. */
export function LegalText({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (!list.length) return;
    blocks.push(
      <ul key={blocks.length} className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-7 text-ink-muted">
        {list.map((item, i) => (
          <li key={i}>{withEmail(item)}</li>
        ))}
      </ul>
    );
    list = [];
  };
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('- ')) {
      list.push(line.slice(2));
      continue;
    }
    flush();
    if (!line) continue;
    if (line.startsWith('### ')) {
      blocks.push(
        <h2 key={blocks.length} className="mt-10 font-display text-[22px] font-extrabold text-ink">
          {line.slice(4)}
        </h2>
      );
    } else if (/^_.*_$/.test(line)) {
      blocks.push(
        <p key={blocks.length} className="text-[14px] font-semibold text-ink-faint">
          {line.slice(1, -1)}
        </p>
      );
    } else {
      blocks.push(
        <p key={blocks.length} className="mt-4 text-[16px] leading-7 text-ink-muted">
          {withEmail(line)}
        </p>
      );
    }
  }
  flush();
  return <>{blocks}</>;
}
