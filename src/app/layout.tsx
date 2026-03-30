import type { Metadata } from 'next';
import { Heebo, Caveat } from 'next/font/google';
import './globals.css';

const heebo = Heebo({
  variable: '--font-heebo',
  subsets: ['hebrew', 'latin'],
  display: 'swap',
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'תרגיל האוף',
  description: 'תרגיל צוותי למיון תסכולים ומציאת פתרונות בבית הספר',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${caveat.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
