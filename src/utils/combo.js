/**
 * Calculate combo multiplier based on combo count
 */
export function calculateComboMultiplier(comboCount) {
  if (comboCount < 5) return 1
  if (comboCount < 10) return 2
  if (comboCount < 20) return 3
  if (comboCount < 50) return 4
  return 5
}

/**
 * Get combo tier name
 */
export function getComboTier(comboCount) {
  if (comboCount < 5) return 'Normal'
  if (comboCount < 10) return 'Good'
  if (comboCount < 20) return 'Great'
  if (comboCount < 50) return 'Excellent'
  return 'Legendary'
}

/**
 * Get combo tier color
 */
export function getComboColor(comboCount) {
  if (comboCount < 5) return '#666'
  if (comboCount < 10) return '#4caf50'
  if (comboCount < 20) return '#2196f3'
  if (comboCount < 50) return '#9c27b0'
  return '#ff9800'
}
