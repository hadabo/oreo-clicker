// Prestige calculation utilities

/**
 * Calculate prestige points earned based on total Oreos
 * Formula: floor(sqrt(totalOreos / 1000000))
 * Requires 1M Oreos for first prestige point
 */
export function calculatePrestigePoints(totalOreos) {
  if (totalOreos < 1000000) return 0
  return Math.floor(Math.sqrt(totalOreos / 1000000))
}

/**
 * Calculate prestige multiplier from points
 * Formula: 1 + (points * 0.1)
 * Each point gives +10% to all production
 */
export function calculatePrestigeMultiplier(points) {
  return 1 + (points * 0.1)
}

/**
 * Check if player can prestige
 */
export function canPrestige(totalOreos) {
  return totalOreos >= 1000000
}

/**
 * Get prestige requirements for display
 */
export function getPrestigeInfo(totalOreos, currentPoints) {
  const potentialPoints = calculatePrestigePoints(totalOreos)
  const newPoints = potentialPoints > currentPoints ? potentialPoints - currentPoints : 0
  const currentMultiplier = calculatePrestigeMultiplier(currentPoints)
  const nextMultiplier = calculatePrestigeMultiplier(currentPoints + newPoints)
  
  return {
    canPrestige: canPrestige(totalOreos),
    potentialPoints,
    newPoints,
    currentMultiplier,
    nextMultiplier,
    required: 1000000
  }
}
