'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

interface SiteSettings {
  logoUrl: string;
  welcomeMessage: string;
}

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  updateLogo: (file: File) => Promise<void>;
  updateWelcomeMessage: (message: string) => Promise<void>;
}

const defaultSettings: SiteSettings = {
  logoUrl: '',
  welcomeMessage: '🌟 Welcome🌟 We sincerely congratulate you for joining our program where you can enjoy entertainment and earning together InshaAllah. Watch the video, have fun and take the opportunity to earn and start a new experience with us on a joyful and profitable journey.'
};

const SiteSettingsContext = createContext<SiteSettingsContextType | null>(null);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsDoc = await getDoc(doc(db, 'settings', 'site'));
        if (settingsDoc.exists()) {
          setSettings(settingsDoc.data() as SiteSettings);
        } else {
          // Initialize with default settings if not exists
          await setDoc(doc(db, 'settings', 'site'), defaultSettings);
          setSettings(defaultSettings);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateLogo = async (file: File) => {
    try {
      const storageRef = ref(storage, 'site/logo');
      await uploadBytes(storageRef, file);
      const logoUrl = await getDownloadURL(storageRef);
      
      await setDoc(doc(db, 'settings', 'site'), {
        ...settings,
        logoUrl
      });
      
      setSettings(prev => ({ ...prev, logoUrl }));
    } catch (error) {
      console.error('Error updating logo:', error);
      throw error;
    }
  };

  const updateWelcomeMessage = async (message: string) => {
    try {
      await setDoc(doc(db, 'settings', 'site'), {
        ...settings,
        welcomeMessage: message
      });
      
      setSettings(prev => ({ ...prev, welcomeMessage: message }));
    } catch (error) {
      console.error('Error updating welcome message:', error);
      throw error;
    }
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, updateLogo, updateWelcomeMessage }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}; 