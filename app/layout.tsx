import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Kalam, Nunito } from 'next/font/google';
import './globals.css';

// The app's fonts: Bricolage Grotesque for display, Nunito for body. Kalam stands in
// for the board's Chalkboard handwriting where Chalkboard SE isn't installed.
const bricolage = Bricolage_Grotesque({ variable: '--font-bricolage', subsets: ['latin'], weight: ['700', '800'] });
const nunito = Nunito({ variable: '--font-nunito', subsets: ['latin'], weight: ['400', '600', '700', '800'] });
const kalam = Kalam({ variable: '--font-kalam', subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Milo, the AI tutor who teaches on the board',
  description:
    'Pick a topic or upload your notes. Milo explains it out loud, writes the notes on a shared whiteboard, brings in real pictures, and checks your work. Made for iPad and Apple Pencil.',
  openGraph: {
    title: 'Milo, the AI tutor who teaches on the board',
    description: 'Lessons, exercises and exam prep on a shared whiteboard. Made for iPad.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${nunito.variable} ${kalam.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
