import { useState, useEffect } from 'react'
import { ACHIEVEMENTS, checkAchievements } from '../utils/achievements'

export function useAchievements(gameState, onNewAchievement) {
  const [unlockedAchievements, setUnlockedAchievements] = useState([])
  const [newAchievements, setNewAchievements] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('oreo-clicker-achievements')
    if (saved) {
      try {
        setUnlockedAchievements(JSON.parse(saved))
      } catch (error) {
        console.warn('Failed to load achievements:', error)
      }
    }
  }, [])

  useEffect(() => {
    const newlyUnlocked = checkAchievements(gameState, unlockedAchievements)
    
    if (newlyUnlocked.length > 0) {
      const updatedAchievements = [...unlockedAchievements, ...newlyUnlocked]
      setUnlockedAchievements(updatedAchievements)
      setNewAchievements(newlyUnlocked)
      localStorage.setItem('oreo-clicker-achievements', JSON.stringify(updatedAchievements))
      
      // Trigger sound effect for new achievements
      if (onNewAchievement) {
        onNewAchievement()
      }
      
      // Clear new achievements after showing them
      setTimeout(() => setNewAchievements([]), 3000)
    }
  }, [gameState, unlockedAchievements, onNewAchievement])

  const getAchievementData = (id) => ACHIEVEMENTS.find(a => a.id === id)

  return {
    unlockedAchievements,
    newAchievements,
    getAchievementData,
    totalAchievements: ACHIEVEMENTS.length
  }
}
