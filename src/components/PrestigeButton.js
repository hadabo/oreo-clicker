import React, { useState } from 'react'
import { getPrestigeInfo } from '../utils/prestige'

function PrestigeButton({ state, onPrestige }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const { oreos, prestige = { level: 0, points: 0, totalEarned: 0, multiplier: 1.0 } } = state
  
  const prestigeInfo = getPrestigeInfo(oreos + prestige.totalEarned, prestige.points)
  
  if (!prestigeInfo.canPrestige) {
    return null
  }

  const handlePrestige = () => {
    onPrestige()
    setShowConfirm(false)
  }

  if (showConfirm) {
    return (
      <div className="prestige-confirm">
        <div className="prestige-confirm-content">
          <h3>⭐ Prestige Confirmation</h3>
          <p className="prestige-warning">
            You will reset your Oreos and gadgets, but gain:
          </p>
          <div className="prestige-rewards">
            <div className="prestige-reward">
              <span className="reward-icon">🌟</span>
              <span className="reward-text">
                +{prestigeInfo.newPoints} Prestige Point{prestigeInfo.newPoints !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="prestige-reward">
              <span className="reward-icon">📈</span>
              <span className="reward-text">
                {prestigeInfo.currentMultiplier.toFixed(1)}x → {prestigeInfo.nextMultiplier.toFixed(1)}x Multiplier
              </span>
            </div>
          </div>
          <div className="prestige-actions">
            <button className="prestige-cancel" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button className="prestige-accept" onClick={handlePrestige}>
              ⭐ Prestige!
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="prestige-button-container">
      <button className="prestige-button" onClick={() => setShowConfirm(true)}>
        <div className="prestige-icon">⭐</div>
        <div className="prestige-info">
          <div className="prestige-title">Prestige Available!</div>
          <div className="prestige-details">
            +{prestigeInfo.newPoints} point{prestigeInfo.newPoints !== 1 ? 's' : ''} 
            ({prestigeInfo.currentMultiplier.toFixed(1)}x → {prestigeInfo.nextMultiplier.toFixed(1)}x)
          </div>
        </div>
      </button>
      {prestige.level > 0 && (
        <div className="prestige-stats">
          Prestige Level: {prestige.level} | 
          Multiplier: {prestige.multiplier.toFixed(1)}x | 
          Points: {prestige.points}
        </div>
      )}
    </div>
  )
}

export default PrestigeButton
