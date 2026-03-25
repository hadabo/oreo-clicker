import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

const THEMES = {
  classic: {
    name: 'Classic',
    primary: '#01ffff',
    secondary: '#011ca7',
    background: '#282c34',
    text: '#ffffff',
    accent: '#0068b5',
  },
  dark: {
    name: 'Dark Mode',
    primary: '#bb86fc',
    secondary: '#1a1a2e',
    background: '#0f0f1e',
    text: '#e8e8e8',
    accent: '#6200ee',
  },
  mint: {
    name: 'Mint Cream',
    primary: '#00d9a3',
    secondary: '#005f73',
    background: '#001219',
    text: '#e8f9fd',
    accent: '#00b894',
  },
  strawberry: {
    name: 'Strawberry',
    primary: '#ff6b9d',
    secondary: '#a01a58',
    background: '#2b1520',
    text: '#ffe5f0',
    accent: '#c73866',
  },
}

const THEME_STORAGE_KEY = 'oreo-theme'

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    return saved && THEMES[saved] ? saved : 'classic'
  })

  useEffect(() => {
    const theme = THEMES[currentTheme]
    const root = document.documentElement

    // Apply CSS variables
    root.style.setProperty('--color-primary', theme.primary)
    root.style.setProperty('--color-secondary', theme.secondary)
    root.style.setProperty('--color-background', theme.background)
    root.style.setProperty('--color-text', theme.text)
    root.style.setProperty('--color-accent', theme.accent)

    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme)
  }, [currentTheme])

  const changeTheme = (themeName) => {
    if (THEMES[themeName]) {
      setCurrentTheme(themeName)
    }
  }

  const value = {
    currentTheme,
    theme: THEMES[currentTheme],
    themes: THEMES,
    changeTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
