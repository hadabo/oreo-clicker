import React, { useState, useRef } from 'react'
import { useSettings } from '../context/SettingsContext'
import { useTheme } from '../context/ThemeContext'
import { useAnnouncement } from '../hooks/useAnnouncement'
import { exportSave, importSave } from '../utils/saveManager'

function Settings({ onImportSave, initialState }) {
  const { settings, updateSetting, resetSettings } = useSettings()
  const { currentTheme, themes, changeTheme } = useTheme()
  const announce = useAnnouncement()
  const [isOpen, setIsOpen] = useState(false)
  const fileInputRef = useRef(null)

  const handleExportSave = () => {
    try {
      exportSave()
      announce('Save exported successfully!')
    } catch (error) {
      announce('Failed to export: ' + error.message)
      console.error('Export error:', error)
    }
  }

  const handleImportSave = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      await importSave(file, initialState)
      announce('Save imported! Reloading...')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      announce('Import failed: ' + error.message)
      console.error('Import error:', error)
    }
    
    // Reset file input
    event.target.value = ''
  }

  if (!isOpen) {
    return (
      <button 
        className="settings-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Open settings"
        title="Settings"
      >
        <span className="settings-icon">⚙️</span>
      </button>
    )
  }

  return (
    <div className="settings-panel" role="dialog" aria-label="Game Settings">
      <div className="settings-header">
        <h3>⚙️ Settings</h3>
        <button 
          className="settings-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close settings"
        >
          ✕
        </button>
      </div>
      
      <div className="settings-content">
        {/* Theme Selector */}
        <div className="settings-section">
          <h4>🎨 Appearance</h4>
          <div className="theme-options">
            {Object.entries(themes).map(([key, theme]) => (
              <div
                key={key}
                className={`theme-option ${currentTheme === key ? 'active' : ''}`}
                onClick={() => changeTheme(key)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && changeTheme(key)}
                aria-label={`Select ${theme.name} theme`}
              >
                <div className="theme-preview">
                  <div 
                    className="theme-preview-color" 
                    style={{ backgroundColor: theme.primary }}
                    aria-hidden="true"
                  />
                  <div 
                    className="theme-preview-color" 
                    style={{ backgroundColor: theme.secondary }}
                    aria-hidden="true"
                  />
                  <div 
                    className="theme-preview-color" 
                    style={{ backgroundColor: theme.accent }}
                    aria-hidden="true"
                  />
                </div>
                <div className="theme-name">{theme.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Game Settings */}
        <div className="settings-section">
          <h4>🎮 Gameplay</h4>
          
          <div className="toggle-option">
            <label htmlFor="sound-toggle">
              <span className="toggle-icon">🔊</span>
              <span className="toggle-label">Sound Effects</span>
            </label>
            <button
              id="sound-toggle"
              className={`toggle-button ${settings.soundEnabled ? 'active' : ''}`}
              onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
              aria-label={`Sound effects ${settings.soundEnabled ? 'enabled' : 'disabled'}`}
              role="switch"
              aria-checked={settings.soundEnabled}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>

          <div className="toggle-option">
            <label htmlFor="animation-toggle">
              <span className="toggle-icon">✨</span>
              <span className="toggle-label">Visual Effects</span>
            </label>
            <button
              id="animation-toggle"
              className={`toggle-button ${settings.animationsEnabled ? 'active' : ''}`}
              onClick={() => updateSetting('animationsEnabled', !settings.animationsEnabled)}
              aria-label={`Visual effects ${settings.animationsEnabled ? 'enabled' : 'disabled'}`}
              role="switch"
              aria-checked={settings.animationsEnabled}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>

          <div className="settings-input-group">
            <label htmlFor="autosave-interval">
              <span className="toggle-icon">💾</span>
              <span className="toggle-label">Auto-save (seconds)</span>
            </label>
            <input
              id="autosave-interval"
              type="number"
              min="5"
              max="60"
              value={settings.autoSaveInterval}
              onChange={(e) => updateSetting('autoSaveInterval', parseInt(e.target.value) || 10)}
              className="number-input"
            />
          </div>
        </div>

        {/* Save Management */}
        <div className="settings-section">
          <h4>💾 Save Management</h4>
          <div className="button-group">
            <button className="settings-button export" onClick={handleExportSave}>
              <span>📥</span> Export
            </button>
            
            <button className="settings-button import" onClick={() => fileInputRef.current?.click()}>
              <span>📤</span> Import
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportSave}
              style={{ display: 'none' }}
              aria-label="Import save file"
            />
          </div>
        </div>

        {/* Reset */}
        <div className="settings-section">
          <button className="settings-button reset" onClick={resetSettings}>
            🔄 Reset Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Settings)
