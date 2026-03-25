import React, { useEffect, useState } from 'react'
import { getGoldenSpawnMultiplier } from '../utils/prestigeUpgrades'

const BASE_SPAWN_INTERVAL = 120000 // 2 minutes
const GOLDEN_DURATION = 10000 // 10 seconds to click
const MIN_BONUS_MULTIPLIER = 10
const MAX_BONUS_MULTIPLIER = 100

function GoldenOreo({ state, onCollect }) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [bonusMultiplier, setBonusMultiplier] = useState(50)

  useEffect(() => {
    const spawnMultiplier = getGoldenSpawnMultiplier(state.prestigeUpgrades || [])
    const spawnInterval = BASE_SPAWN_INTERVAL / spawnMultiplier

    const spawnTimer = setInterval(() => {
      // Only spawn if player has automation (at least 10 Oreos/s)
      if (state.speed >= 10 && !isVisible) {
        // Random position (20% to 80% of screen)
        const x = 20 + Math.random() * 60
        const y = 20 + Math.random() * 60
        const bonus = MIN_BONUS_MULTIPLIER + Math.floor(Math.random() * (MAX_BONUS_MULTIPLIER - MIN_BONUS_MULTIPLIER))
        
        setPosition({ x, y })
        setBonusMultiplier(bonus)
        setIsVisible(true)

        // Auto-hide after duration
        setTimeout(() => {
          setIsVisible(false)
        }, GOLDEN_DURATION)
      }
    }, spawnInterval)

    return () => clearInterval(spawnTimer)
  }, [state.speed, state.prestigeUpgrades, isVisible])

  const handleClick = () => {
    if (!isVisible) return
    
    const bonus = Math.floor(state.speed * bonusMultiplier)
    onCollect(bonus)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div 
      className="golden-oreo"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
      aria-label={`Golden Oreo! Click for ${bonusMultiplier}x bonus`}
    >
      <div className="golden-oreo-icon">🥇</div>
      <div className="golden-oreo-multiplier">×{bonusMultiplier}</div>
    </div>
  )
}

export default GoldenOreo
