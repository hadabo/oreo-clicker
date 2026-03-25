// Validation utilities for game state
export function validateGameState(state) {
  if (!state || typeof state !== 'object') {
    return false
  }

  // Check required properties
  const requiredProps = ['oreos', 'speed', 'gadgets', 'clicks', 'ticks']
  for (const prop of requiredProps) {
    if (!(prop in state)) {
      return false
    }
  }

  // Validate types
  if (typeof state.oreos !== 'number' || state.oreos < 0) return false
  if (typeof state.speed !== 'number' || state.speed < 0) return false
  if (typeof state.clicks !== 'number' || state.clicks < 0) return false
  if (typeof state.ticks !== 'number' || state.ticks < 0) return false
  
  // Validate gadgets array
  if (!Array.isArray(state.gadgets)) return false
  
  for (const gadget of state.gadgets) {
    if (!gadget || typeof gadget !== 'object') return false
    if (typeof gadget.count !== 'number' || gadget.count < 0) return false
    if (typeof gadget.cost !== 'number' || gadget.cost <= 0) return false
    if (typeof gadget.speed !== 'number' || gadget.speed < 0) return false
  }

  return true
}

export function sanitizeGameState(state, fallback) {
  if (!validateGameState(state)) {
    console.warn('Invalid save data detected, using fallback state')
    return fallback
  }

  // Sanitize numbers to prevent NaN or Infinity
  return {
    ...state,
    oreos: Math.max(0, Math.floor(state.oreos) || 0),
    speed: Math.max(0, state.speed || 0),
    clicks: Math.max(0, Math.floor(state.clicks) || 0),
    ticks: Math.max(0, Math.floor(state.ticks) || 0),
    gadgets: state.gadgets.map(gadget => ({
      ...gadget,
      count: Math.max(0, Math.floor(gadget.count) || 0),
      cost: Math.max(1, Math.floor(gadget.cost) || 1),
      speed: Math.max(0, gadget.speed || 0)
    })),
    prestige: state.prestige ? {
      level: Math.max(0, Math.floor(state.prestige.level) || 0),
      points: Math.max(0, Math.floor(state.prestige.points) || 0),
      totalEarned: Math.max(0, Math.floor(state.prestige.totalEarned) || 0),
      multiplier: Math.max(1.0, state.prestige.multiplier || 1.0)
    } : { level: 0, points: 0, totalEarned: 0, multiplier: 1.0 },
    prestigeUpgrades: Array.isArray(state.prestigeUpgrades) ? state.prestigeUpgrades : []
  }
}
