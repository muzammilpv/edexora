import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'InspireGO — Premium International Travel & Spiritual Experiences',
  description: 'Experience world-class scrollytelling travel with InspireGO. Specializing in luxury international holidays, VIP Umrah pilgrimages, Jordan, Palestine, and Middle Eastern cultural escapes.',
  keywords: ['InspireGO', 'Luxury Travel', 'VIP Umrah', 'Jordan Tours', 'Palestine Pilgrimage', 'Middle East Travel', 'Bespoke Holidays'],
  authors: [{ name: 'InspireGO Creative Design' }],
  openGraph: {
    title: 'InspireGO — Premium International Travel Experience',
    description: 'Go beyond the ordinary. Discover cinematic travel experiences curated for the discerning international traveler.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="bg-[#050505] text-[#rgba(255,255,255,0.62)] antialiased selection:bg-[#D4AF37]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
