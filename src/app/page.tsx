'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuthContext } from '../contexts/AuthContext';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

export default function HomePage() {
  const { user } = useAuthContext();
  const { settings, loading } = useSiteSettings();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-12 transform hover:scale-105 transition-transform duration-300">
              {settings.logoUrl ? (
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-sm"></div>
                  <Image
                    src={settings.logoUrl}
                    alt="Site Logo"
                    width={200}
                    height={200}
                    className="mx-auto rounded-full logo-animation relative z-10"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center logo-animation">
                  <span className="text-white/80">Logo</span>
                </div>
              )}
            </div>

            {/* Welcome Message */}
            <div className="max-w-3xl mx-auto mb-12 transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
                <p className="text-lg text-white leading-relaxed">
                  {settings.welcomeMessage}
                </p>
              </div>
            </div>

            {/* Connect Button */}
            <div className="space-y-4">
              <Link
                href={user ? "/dashboard" : "/login"}
                className="inline-block bg-white/20 backdrop-blur-sm text-white px-12 py-4 rounded-full hover:bg-white/30 text-lg font-semibold transition-all duration-300 transform hover:scale-105 pulse-animation"
              >
                CONNECT WITH US
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
