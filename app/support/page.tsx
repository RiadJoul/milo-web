import type { Metadata } from 'next';
import { LegalPage, LegalText } from '@/components/site/LegalPage';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = { title: 'Support · Milo' };

// The App Store's support URL: how to reach us, and the answers people ask for most.
const SUPPORT = `Questions, problems, or something Milo said that wasn't right? Email ${SUPPORT_EMAIL} and we'll get back to you. In the app you can also use Settings → Contact support, or the flag on anything Milo says to report it.

### Cancel a subscription

Subscriptions are billed by Apple. Cancel in Settings → your name → Subscriptions → Milo, or in Milo under Settings → Manage subscription. You keep Milo Pro until the end of the period you paid for.

### Get a refund

Refunds are handled by Apple: go to reportaproblem.apple.com and pick the purchase.

### Restore a purchase

On the paywall, tap Restore purchases while signed in to the same Apple ID you paid with.

### Delete your account

In Milo, Settings → Delete account. Everything is erased straight away. Deleting your account doesn't cancel the subscription: cancel it in your Apple ID settings too.`;

export default function SupportPage() {
  return (
    <LegalPage title="Support">
      <LegalText text={SUPPORT} />
    </LegalPage>
  );
}
