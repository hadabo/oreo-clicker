import React from 'react'
import { ACHIEVEMENTS } from '../utils/achievements'
import { formatNumber } from '../utils/formatNumber'

function ProgressIndicator({ state, unlockedAchievements = [] }) {
  // Find the next locked achievement
  const nextAchievement = ACHIEVEMENTS.find(achievement => {
    const isUnlocked = unlockedAchievements.includes(achievement.id)
    const conditionMet = achievement.condition(state)
    return !isUnlocked && !conditionMet
  })

  if (!nextAchievement) {
    return (
      <div className="progress-indicator">
        <div className="progress-message">
          🏆 All achievements unlocked! You're a master!
        </div>
      </div>
    )
  }

  // Extract numeric values from achievement for progress
  const getProgressData = (achievement) => {
    if (achievement.id === 'first_click' || achievement.id === 'click_master') {
      return { current: state.clicks, target: achievement.id === 'first_click' ? 1 : 500 }
    }
    if (achievement.id === 'hundred_oreos') {
      return { current: state.oreos, target: 100 }
    }
    if (achievement.id === 'thousand_oreos') {
      return { current: state.oreos, target: 1000 }
    }
    if (achievement.id === 'first_gadget') {
      return { current: state.gadgetsCount, target: 1 }
    }
    if (achievement.id === 'speed_demon') {
      return { current: state.speed, target: 10 }
    }
    return { current: 0, target: 1 }
  }

  const { current, target } = getProgressData(nextAchievement)
  const progress = Math.min((current / target) * 100, 100)

  return (
    <div className="progress-indicator">
      <div className="progress-header">
        <span className="progress-icon">{nextAchievement.icon}</span>
        <span className="progress-name">{nextAchievement.name}</span>
        <span className="progress-stats">
          {formatNumber(current)} / {formatNumber(target)}
        </span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="progress-description">{nextAchievement.description}</div>
    </div>
  )
}

export default ProgressIndicator
