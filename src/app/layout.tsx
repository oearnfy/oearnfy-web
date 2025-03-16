'use client';

import { Inter } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import { SiteSettingsProvider } from '../contexts/SiteSettingsContext';
import { Header } from '../components/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-gray-50 to-gray-100`}>
        <AuthProvider>
          <SiteSettingsProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </SiteSettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
