import React from 'react'
import { formatNumber } from '../utils/formatNumber'
import numeral from 'numeral'

export default function Stats({ state }) {
  const { ticks, clicks, gadgetsCount, prestige, goldenOreosCollected, maxCombo } = state
  
  const stats = [
    { icon: '⏱️', label: 'Time Played', value: numeral(ticks).format('00:00:00') },
    { icon: '👆', label: 'Total Clicks', value: formatNumber(clicks) },
    { icon: '🤖', label: 'Gadgets Owned', value: formatNumber(gadgetsCount) },
  ]
  
  // Add prestige stats if available
  if (prestige && prestige.level > 0) {
    stats.push(
      { icon: '⭐', label: 'Prestige Level', value: prestige.level },
      { icon: '✨', label: 'Prestige Points', value: prestige.points }
    )
  }
  
  // Add combo stats if available
  if (maxCombo > 0) {
    stats.push({ icon: '🔥', label: 'Best Combo', value: formatNumber(maxCombo) })
  }
  
  // Add golden oreos if collected
  if (goldenOreosCollected > 0) {
    stats.push({ icon: '🥇', label: 'Golden Oreos', value: formatNumber(goldenOreosCollected) })
  }
  
  return (
    <div className="stats">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
