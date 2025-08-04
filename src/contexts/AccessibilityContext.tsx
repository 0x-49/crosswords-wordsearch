import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  largeText: boolean;
  reducedMotion: boolean;
  largePrintPuzzles: boolean;
  theme: 'light' | 'dark' | 'auto';
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetSettings: () => void;
  isSettingsPanelOpen: boolean;
  setIsSettingsPanelOpen: (open: boolean) => void;
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  fontSize: 'medium',
  largeText: false,
  reducedMotion: false,
  largePrintPuzzles: false,
  theme: 'auto',
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Failed to parse accessibility settings:', error);
      }
    }

    // Check for system preferences
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

    setSettings(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion || prev.reducedMotion,
      highContrast: prefersHighContrast || prev.highContrast,
      theme: prev.theme === 'auto' ? (prefersDark ? 'dark' : 'light') : prev.theme,
    }));
  }, []);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Apply theme
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply high contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply large text
    if (settings.largeText) {
      body.classList.add('large-text');
    } else {
      body.classList.remove('large-text');
    }

    // Apply font size
    body.classList.remove('font-size-small', 'font-size-medium', 'font-size-large', 'font-size-extra-large');
    body.classList.add(`font-size-${settings.fontSize}`);

    // Apply reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
      root.style.setProperty('--transition-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }

    // Save settings to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('accessibility-settings');
  };

  const value: AccessibilityContextType = {
    settings,
    updateSetting,
    resetSettings,
    isSettingsPanelOpen,
    setIsSettingsPanelOpen,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};