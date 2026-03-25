import crepto from './helpers/crypto'
import { STORAGE_KEY, MAX_MESSAGES, OREO_CLICK_VALUE } from './constants'
import { calculatePrestigePoints, calculatePrestigeMultiplier } from './utils/prestige'
import { applyPrestigeUpgrades } from './utils/prestigeUpgrades'

function reducer(state, action) {
  switch (action.type) {
    case 'GET_OREO':
      const prestigeClickMultiplier = state.prestige?.multiplier || 1.0
      const upgradeClickMultiplier = applyPrestigeUpgrades(state, 'click')
      const clickValue = OREO_CLICK_VALUE * prestigeClickMultiplier * upgradeClickMultiplier
      return {
        ...state,
        oreos: state.oreos + clickValue,
        clicks: state.clicks + 1,
      }

    case 'BUY_GADGET':
      const baseSpeed = oreosPerSecond(action.newGadgets)
      const buyMultiplier = state.prestige?.multiplier || 1.0
      const productionBoost = applyPrestigeUpgrades(state, 'production')
      const speed = baseSpeed * buyMultiplier * productionBoost
      return {
        ...state,
        oreos: state.oreos - action.totalCost,
        gadgetsCount: state.gadgetsCount + 1,
        gadgets: action.newGadgets,
        speed,
      }

    case 'PUSH_MESSAGE':
      const lastThreeMessages = getMaxMessages(state.messages, MAX_MESSAGES)
      return {
        ...state,
        messages: [...lastThreeMessages, action.newMessage],
      }

    case 'TICK':
      const tickMultiplier = state.prestige?.multiplier || 1.0
      const tickProductionBoost = applyPrestigeUpgrades(state, 'production')
      const oreosPerTick = oreosPerSecond(state.gadgets) * tickMultiplier * tickProductionBoost
      const newMessages = getUpdatedMessages(state.messages)
      const elapsedTime = action.payload?.elapsedTime || 0
      
      return {
        ...state,
        ticks: elapsedTime,
        oreos: state.oreos + oreosPerTick,
        messages: newMessages,
        lastTickTime: Date.now(),
      }

    case 'SAVE_PROGRESS':
      // Save progress with current auto-save interval from settings
      const autoSaveInterval = action.payload?.autoSaveInterval || state.autoSaveTimeout || 10
      
      if (state.ticks % autoSaveInterval === 0) {
        saveProgress(state)
      }
      return state

    case 'PRESTIGE':
      const currentPrestige = state.prestige || { level: 0, points: 0, totalEarned: 0, multiplier: 1.0 }
      const newPrestigePoints = calculatePrestigePoints(state.oreos + currentPrestige.totalEarned)
      const pointsGained = newPrestigePoints - currentPrestige.points
      
      if (pointsGained <= 0) return state
      
      const newPrestigeState = {
        level: currentPrestige.level + 1,
        points: newPrestigePoints,
        totalEarned: currentPrestige.totalEarned + state.oreos,
        multiplier: calculatePrestigeMultiplier(newPrestigePoints)
      }
      
      // Reset to initial state but keep prestige and trophies
      const keptUpgrades = state.prestigeUpgrades || []
      const startingOreos = applyPrestigeUpgrades({ prestigeUpgrades: keptUpgrades }, 'starting_oreos')
      const resetState = {
        oreos: startingOreos,
        clicks: 0,
        gadgetsCount: 0,
        speed: 0,
        ticks: 0,
        gadgets: action.payload.initialGadgets,
        messages: [{
          type: 'info',
          text: `Prestiged! Now at ${newPrestigeState.multiplier.toFixed(1)}x multiplier!`,
          time: 10
        }],
        prestige: newPrestigeState,
        prestigeUpgrades: keptUpgrades,
        goldenOreosCollected: state.goldenOreosCollected || 0,
        trophies: state.trophies,
        autoSaveTimeout: state.autoSaveTimeout
      }
      
      saveProgress(resetState)
      return resetState

    case 'BUY_PRESTIGE_UPGRADE':
      const currentPoints = state.prestige?.points || 0
      const upgrade = action.payload.upgrade
      const alreadyOwned = (state.prestigeUpgrades || []).includes(upgrade.id)
      
      if (alreadyOwned || currentPoints < upgrade.cost) return state
      
      const updatedPrestige = {
        ...state.prestige,
        points: currentPoints - upgrade.cost
      }
      
      const updatedUpgrades = [...(state.prestigeUpgrades || []), upgrade.id]
      
      const stateWithUpgrade = {
        ...state,
        prestige: updatedPrestige,
        prestigeUpgrades: updatedUpgrades,
        messages: [...state.messages, {
          type: 'success',
          text: `Purchased ${upgrade.name}!`,
          time: 5
        }]
      }
      
      saveProgress(stateWithUpgrade)
      return stateWithUpgrade

    case 'COLLECT_GOLDEN_OREO':
      const goldenBonus = action.payload.bonus
      const stateWithBonus = {
        ...state,
        oreos: state.oreos + goldenBonus,
        goldenOreosCollected: (state.goldenOreosCollected || 0) + 1,
        messages: [...state.messages, {
          type: 'success',
          text: `Golden Oreo! +${goldenBonus} Oreos!`,
          time: 5
        }]
      }
      
      return stateWithBonus

    default:
      return state
  }
}

// Helper functions moved outside the reducer for better code organization
function getMaxMessages(messages, max) {
  if (messages.length >= max) {
    return [...messages.slice(1)]; // Create a new array without the first element
  }
  return [...messages]; // Return a copy of the array
}

function getUpdatedMessages(messages) {
  if (messages.length === 0) return [];
  
  return messages
    .map(message => ({
      ...message,
      time: message.time - 1
    }))
    .filter(message => message.time >= 0);
}

function oreosPerSecond(gadgets) {
  return gadgets.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue.speed * currentValue.count);
  }, 0);
}

function saveProgress(state) {
  const newMessage = {
    type: 'info',
    text: `Click on the big OREO biscuit to resume :)`,
    time: 0,
    id: Date.now()
  }
  
  const ticks = typeof state.ticks === 'number' ? state.ticks : 0;
  
  const stateToSave = { 
    ...state, 
    messages: [newMessage],
    ticks,
    lastTickTime: Date.now()
  }
  
  const progress = JSON.stringify(stateToSave)
  const encryptedProgress = crepto('encrypt', progress)

  window.localStorage.setItem(STORAGE_KEY, encryptedProgress)
}

export default reducer
