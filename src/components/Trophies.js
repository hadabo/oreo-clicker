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
  
  return (
    unlockedTrophies.length > 0 && (
      <div className="trophies-center">
        <h2 className="oreo-font">Trophies Center</h2>
        {settings.animationsEnabled && <Confetti trigger={confettiTrigger} />}
        <div className="trophies">
          {unlockedTrophies.map((trophy) => (
            <div
              className={`trophy trophy-${trophy.id}`}
              key={trophy.id}
              data-hint={trophy.description}
            >
              <span className="trophy-emoji-icon">{trophy.icon}</span>
              <span>{trophy.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  )
}
