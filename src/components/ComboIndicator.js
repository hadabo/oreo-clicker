import React, { useEffect, useState } from 'react'
import { calculateComboMultiplier, getComboTier, getComboColor } from '../utils/combo'

const COMBO_TIMEOUT = 1000 // 1 second

function ComboIndicator({ comboCount, onComboBreak }) {
  const [lastClickTime, setLastClickTime] = useState(Date.now())
  const [isBreaking, setIsBreaking] = useState(false)

  useEffect(() => {
    if (comboCount === 0) return

    const checkTimeout = setInterval(() => {
      const timeSinceLastClick = Date.now() - lastClickTime
      if (timeSinceLastClick >= COMBO_TIMEOUT && comboCount > 0) {
        setIsBreaking(true)
        setTimeout(() => {
          onComboBreak()
          setIsBreaking(false)
        }, 300)
      }
    }, 100)

    return () => clearInterval(checkTimeout)
  }, [comboCount, lastClickTime, onComboBreak])

  useEffect(() => {
    if (comboCount > 0) {
      setLastClickTime(Date.now())
    }
  }, [comboCount])

  if (comboCount < 2) return null

  const multiplier = calculateComboMultiplier(comboCount)
  const tier = getComboTier(comboCount)
  const color = getComboColor(comboCount)

  return (
    <div className={`combo-indicator ${isBreaking ? 'breaking' : ''}`}>
      <div className="combo-content" style={{ borderColor: color }}>
        <div className="combo-count" style={{ color }}>
          {comboCount}
        </div>
        <div className="combo-label">COMBO</div>
        {multiplier > 1 && (
          <div className="combo-multiplier" style={{ background: color }}>
            ×{multiplier}
          </div>
        )}
        <div className="combo-tier" style={{ color }}>
          {tier}
        </div>
      </div>
    </div>
  )
}

export default ComboIndicator
