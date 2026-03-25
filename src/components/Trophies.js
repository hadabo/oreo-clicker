import React, { useState, useEffect } from 'react'
import { ACHIEVEMENTS } from '../utils/achievements'
import Confetti from './Confetti'
import { useSettings } from '../context/SettingsContext'

export default function Trophies({ state, unlockedAchievements = [] }) {
  const { settings } = useSettings()
  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const [previousCount, setPreviousCount] = useState(0)
  
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
    return null
  }
  
  return (
    <div className="trophies-center">
      <h2 className="oreo-font">Trophies ({unlockedTrophies.length}/{ACHIEVEMENTS.length})</h2>
      {settings.animationsEnabled && <Confetti trigger={confettiTrigger} />}
      <ul className="trophies-list">
        {unlockedTrophies.map((trophy) => (
          <li className="trophy-item" key={trophy.id}>
            <div className="trophy-display">
              <i className={`trophy-icon trophy-${trophy.id}`}>
                {trophy.icon}
              </i>
              <span className="trophy-name">{trophy.name}</span>
              <div className="trophy-desc">
                <small>{trophy.description}</small>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
