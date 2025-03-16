'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

export default function AdminPage() {
  const { settings, updateLogo, updateWelcomeMessage } = useSiteSettings();
  const [message, setMessage] = useState(settings.welcomeMessage);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    try {
      setIsUpdating(true);
      await updateLogo(e.target.files[0]);
      alert('Logo updated successfully!');
    } catch (error) {
      console.error('Error updating logo:', error);
      alert('Failed to update logo. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMessageUpdate = async () => {
    try {
      setIsUpdating(true);
      await updateWelcomeMessage(message);
      alert('Welcome message updated successfully!');
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Failed to update welcome message. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
            
            {/* Logo Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Site Logo</h2>
              <div className="flex items-center space-x-4">
                {settings.logoUrl ? (
                  <Image
                    src={settings.logoUrl}
                    alt="Current Logo"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">No Logo</span>
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Update Logo'}
                  </button>
                </div>
              </div>
            </div>

            {/* Welcome Message Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Welcome Message</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isUpdating}
              />
              <button
                onClick={handleMessageUpdate}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 