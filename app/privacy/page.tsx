import type { Metadata } from 'next';
import { LegalPage, LegalText } from '@/components/site/LegalPage';
import { PRIVACY } from '@/lib/legal-text';

export const metadata: Metadata = { title: 'Privacy policy · Milo' };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <LegalText text={PRIVACY} />
    </LegalPage>
  );
}
