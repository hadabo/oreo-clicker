import React from 'react'
import { formatNumber } from '../utils/formatNumber'
import numeral from 'numeral'

export default function Stats({ state }) {
  const { ticks, clicks, gadgetsCount, prestige, goldenOreosCollected, maxCombo } = state
  
  const stats = [
    { icon: '⏱️', label: 'Time Played', value: numeral(ticks).format('00:00:00'), type: 'time' },
    { icon: '👆', label: 'Total Clicks', value: formatNumber(clicks), type: 'clicks' },
    { icon: '🤖', label: 'Gadgets', value: formatNumber(gadgetsCount), type: 'gadgets' },
  ]
  
  // Add prestige stats if available
  if (prestige && prestige.level > 0) {
    stats.push(
      { icon: '⭐', label: 'Prestige Level', value: prestige.level, type: 'prestige-level' },
      { icon: '✨', label: 'Prestige Points', value: prestige.points, type: 'prestige-points' }
    )
  }
  
  // Add combo stats if available
  if (maxCombo > 0) {
    stats.push({ icon: '🔥', label: 'Best Combo', value: formatNumber(maxCombo), type: 'combo' })
  }
  
  // Add golden oreos if collected
  if (goldenOreosCollected > 0) {
    stats.push({ icon: '🥇', label: 'Golden Oreos', value: formatNumber(goldenOreosCollected), type: 'golden' })
  }
  
  return (
    <div>
      <h2 className="oreo-font">Statistics</h2>
      <ul className="stats-list">
        {stats.map((stat, index) => (
          <li className="stat-item" key={index}>
            <div className="stat-display">
              <i className={`stat-icon stat-${stat.type}`}>
                {stat.icon}
              </i>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
