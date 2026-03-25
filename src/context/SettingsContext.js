import React, { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext(null)

const DEFAULT_SETTINGS = {
  soundEnabled: true,
  animationsEnabled: true,
  autoSaveInterval: 10,
}

const SETTINGS_STORAGE_KEY = 'oreo-clicker-settings'

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
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

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
    localStorage.removeItem(SETTINGS_STORAGE_KEY)
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
