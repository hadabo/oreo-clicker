import React, { useState, useEffect } from 'react'
import { ACHIEVEMENTS } from '../utils/achievements'
import Confetti from './Confetti'
import { useSettings } from '../context/SettingsContext'

export default function Trophies({ state, unlockedAchievements = [] }) {
  const { settings } = useSettings()
  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const [previousCount, setPreviousCount] = useState(0)
  const [expandedId, setExpandedId] = useState(null)
  
  const unlockedTrophies = ACHIEVEMENTS.filter(achievement => 
    unlockedAchievements.includes(achievement.id)
  )

  // Trigger confetti when new achievement unlocked
  useEffect(() => {
    if (unlockedTrophies.length > previousCount && previousCount > 0) {
      if (settings.animationsEnabled) {
        setConfettiTrigger(prev => prev + 1)
      }
    }
    setPreviousCount(unlockedTrophies.length)
  }, [unlockedTrophies.length, previousCount, settings.animationsEnabled])
  
  if (unlockedTrophies.length === 0) {
    return (
      <div className="trophies-center">
        <div className="trophies-empty">
          <div className="empty-icon">🏆</div>
          <p>No achievements unlocked yet!</p>
          <small>Start clicking to earn your first trophy</small>
        </div>
      </div>
    )
  }
  
  return (
    <div className="trophies-center">
      {settings.animationsEnabled && <Confetti trigger={confettiTrigger} />}
      
      <div className="trophies-header">
        <div className="trophies-count">
          <span className="count-number">{unlockedTrophies.length}</span>
          <span className="count-label">Achievement{unlockedTrophies.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="trophies-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(unlockedTrophies.length / ACHIEVEMENTS.length) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            {unlockedTrophies.length} / {ACHIEVEMENTS.length}
          </span>
        </div>
      </div>
      
      <div className="trophies-grid">
        {unlockedTrophies.map((trophy) => (
          <div
            className={`trophy-card ${expandedId === trophy.id ? 'expanded' : ''}`}
            key={trophy.id}
            onClick={() => setExpandedId(expandedId === trophy.id ? null : trophy.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setExpandedId(expandedId === trophy.id ? null : trophy.id)
              }
            }}
          >
            <div className="trophy-icon">{trophy.icon}</div>
            <div className="trophy-info">
              <div className="trophy-name">{trophy.name}</div>
              {expandedId === trophy.id && (
                <div className="trophy-description">{trophy.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
