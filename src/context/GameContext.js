import React, { createContext, useContext } from 'react'
import { useGameState } from '../hooks'

const GameContext = createContext()

export function GameProvider({ children, initialState }) {
  const gameState = useGameState(initialState)
  
  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
