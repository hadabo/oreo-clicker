export const ACHIEVEMENTS = [
  {
    id: 'first_click',
    name: 'First Bite',
    description: 'Click your first Oreo',
    condition: (state) => state.clicks >= 1,
    icon: '🍪'
  },
  {
    id: 'hundred_oreos',
    name: 'Cookie Collector',
    description: 'Collect 100 Oreos',
    condition: (state) => state.oreos >= 100,
    icon: '💯'
  },
  {
    id: 'first_gadget',
    name: 'Automation Begins',
    description: 'Buy your first gadget',
    condition: (state) => state.gadgetsCount >= 1,
    icon: '🤖'
  },
  {
    id: 'thousand_oreos',
    name: 'Oreo Hoarder',
    description: 'Collect 1,000 Oreos',
    condition: (state) => state.oreos >= 1000,
    icon: '🏆'
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Reach 10 Oreos per second',
    condition: (state) => state.speed >= 10,
    icon: '⚡'
  },
  {
    id: 'click_master',
    name: 'Click Master',
    description: 'Click 500 times',
    condition: (state) => state.clicks >= 500,
    icon: '👆'
  }
]

export function checkAchievements(state, previousAchievements = []) {
  const newAchievements = []
  
  ACHIEVEMENTS.forEach(achievement => {
    const alreadyUnlocked = previousAchievements.includes(achievement.id)
    const conditionMet = achievement.condition(state)
    
    if (!alreadyUnlocked && conditionMet) {
      newAchievements.push(achievement.id)
    }
  })
  
  return newAchievements
}
