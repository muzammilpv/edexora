import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '../components/providers/AppProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EDEXORA — Modern Online Tuition Platform (Class 1 to 10)',
  description: 'Online tuition and learning platform for students from Class 1 to Class 10 covering Kerala State and CBSE curricula with video learning, live classes, quizzes, and package unlocking.',
  keywords: [
    'Edexora',
    'Online Tuition',
    'Class 1 to 10',
    'CBSE Tuition',
    'Kerala State Tuition',
    'Video Learning',
    'Live Classes',
  ],
  icons: {
    icon: '/edexora-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-[#FFD200] selection:text-slate-950">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
