import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { APP_STORE_URL } from '@/lib/site';

/** "Milo in frame": the dot inside a camera viewfinder (assets/brand in the app). */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" aria-hidden>
      <path
        d="M212 362V212H362M812 362V212H662M212 662V812H362M812 662V812H662"
        fill="none"
        stroke="currentColor"
        strokeWidth={78}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={512} cy={512} r={128} fill="currentColor" />
    </svg>
  );
}

/**
 * The main call to action: "Coming soon" until APP_STORE_URL is set, then a
 * link to the App Store.
 */
export function GetMilo({ className = '' }: { className?: string }) {
  if (!APP_STORE_URL) {
    return (
      <span
        aria-disabled
        className={`inline-flex h-13 items-center gap-2.5 rounded-full bg-accent px-7 text-[16px] font-extrabold text-on-accent ${className}`}
      >
        <span className="h-2 w-2 rounded-full bg-on-accent/60" />
        Coming soon to the App Store
      </span>
    );
  }
  return (
    <a
      href={APP_STORE_URL}
      className={`group inline-flex h-13 items-center gap-2 rounded-full bg-accent px-7 text-[16px] font-extrabold text-on-accent transition-transform hover:scale-[1.03] active:scale-[0.98] ${className}`}
    >
      Get Milo on the App Store
      <ArrowRight size={18} strokeWidth={2.6} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[13px] font-extrabold uppercase tracking-[1.6px] text-ink-faint">{children}</p>;
}

/** Headline with the second line in the soft grey, like the app's headlines. */
export function Headline({ first, second, className = '' }: { first: string; second?: string; className?: string }) {
  return (
    <h2 className={`font-display text-[36px] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[48px] ${className}`}>
      {first}
      {second && (
        <>
          <br />
          <span className="text-accent-soft">{second}</span>
        </>
      )}
    </h2>
  );
}
