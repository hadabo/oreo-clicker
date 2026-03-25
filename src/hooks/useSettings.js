import { useState } from 'react'

const DEFAULT_SETTINGS = {
  soundEnabled: true,
  animationsEnabled: true,
  autoSaveInterval: 10,
  theme: 'default'
}

// Deprecated: Use SettingsContext instead
// This hook is kept for backward compatibility but should not be used
export function useSettings() {
  console.warn('useSettings hook is deprecated. Use SettingsContext instead.')
  
  const [settings, setSettings] = useState(() => {
    // Initialize settings from localStorage immediately
    const savedSettings = localStorage.getItem('oreo-clicker-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        return { ...DEFAULT_SETTINGS, ...parsed }
      } catch (error) {
        console.warn('Failed to load settings:', error)
      }
    }
    return DEFAULT_SETTINGS
  })

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem('oreo-clicker-settings', JSON.stringify(newSettings))
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
    localStorage.removeItem('oreo-clicker-settings')
  }

  return {
    settings,
    updateSetting,
    resetSettings
  }
}
