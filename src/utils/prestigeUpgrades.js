/**
 * Calculate total click multiplier from prestige upgrades
 */
export function getClickMultiplier(prestigeUpgrades = []) {
  let multiplier = 1
  
  if (prestigeUpgrades.includes('click_power_1')) {
    multiplier *= 2
  }
  if (prestigeUpgrades.includes('click_power_2')) {
    multiplier *= 5
  }
  
  return multiplier
}

/**
 * Calculate total production boost from prestige upgrades
 */
export function getProductionBoost(prestigeUpgrades = []) {
  let boost = 1
  
  if (prestigeUpgrades.includes('production_1')) {
    boost *= 1.25
  }
  if (prestigeUpgrades.includes('production_2')) {
    boost *= 1.5
  }
  
  return boost
}

/**
 * Get starting Oreos after prestige
 */
export function getStartingOreos(prestigeUpgrades = []) {
  if (prestigeUpgrades.includes('starting_boost')) {
    return 1000
  }
  return 0
}

/**
 * Get golden oreo spawn rate multiplier
 */
export function getGoldenSpawnMultiplier(prestigeUpgrades = []) {
  if (prestigeUpgrades.includes('golden_luck')) {
    return 2
  }
  return 1
}

/**
 * Apply all prestige upgrade effects to a value
 */
export function applyPrestigeUpgrades(state, type) {
  const upgrades = state.prestigeUpgrades || []
  
  switch (type) {
    case 'click':
      return getClickMultiplier(upgrades)
    case 'production':
      return getProductionBoost(upgrades)
    case 'starting_oreos':
      return getStartingOreos(upgrades)
    case 'golden_spawn':
      return getGoldenSpawnMultiplier(upgrades)
    default:
      return 1
  }
}
