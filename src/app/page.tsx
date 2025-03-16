'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuthContext } from '../contexts/AuthContext';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

export default function Home() {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Oearnfy</h1>
      <p className="text-center text-gray-600">Auto deployment test - Live Update Working!</p>
    </div>
  );
}
