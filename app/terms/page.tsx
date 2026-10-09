import type { Metadata } from 'next';
import { LegalPage, LegalText } from '@/components/site/LegalPage';
import { TERMS } from '@/lib/legal-text';

export const metadata: Metadata = { title: 'Terms of use · Milo' };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use">
      <LegalText text={TERMS} />
    </LegalPage>
  );
}
