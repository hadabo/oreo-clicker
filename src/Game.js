import React, { useEffect } from 'react'
// Import core components directly
import Header from './components/Header'
import OreoBiscuit from './components/OreoBiscuit'
import Counter from './components/Counter'
import Speed from './components/Speed'
import Notifications from './components/Notifications'
import ErrorBoundary from './components/ErrorBoundary'
import Settings from './components/Settings'
import ProgressIndicator from './components/ProgressIndicator'
import PrestigeButton from './components/PrestigeButton'

// Import lazy-loaded components
import { LazyGadgetsList, LazyTrophies, LazyStats } from './components/LazyLoadedComponents'

// Import hooks
import { useGameState, useTimer, useAnnouncement, useAchievements, useSound } from './hooks'
import { useSettings } from './context/SettingsContext'

import crepto from './helpers/crypto'
import initialState from './initialState.json'
import { STORAGE_KEY } from './constants'
import { sanitizeGameState } from './utils/validation'
import './assets/style/game.css'
import './assets/style/accessibility.css'

function getProgress() {
  if (window.localStorage.getItem(STORAGE_KEY)) {
    const encryptedProgress = window.localStorage.getItem(STORAGE_KEY)

    try {
      const decryptedData = crepto('decrypt', encryptedProgress)
      return sanitizeGameState(decryptedData, initialState)
    } catch (error) {
      console.error('Failed to load save data:', error)
      return initialState
    }
  }

  return null
}

function Oreo() {
  const { state, actions } = useGameState(getProgress() || initialState)
  const { oreos, speed, gadgets, messages, ticks } = state
  const { settings } = useSettings()

  const { initializeTimer, startAutomation } = useTimer(actions.tick)
  const announce = useAnnouncement()
  const achievements = useAchievements(state, () => playSound('achievement'))
  const { playSound } = useSound()

  useEffect(() => {
    initializeTimer(ticks)
  }, [initializeTimer, ticks])

  // Announce score milestones
  useEffect(() => {
    if (oreos > 0) {
      if (oreos === 1) {
        announce('You earned your first Oreo!')
      } else if (oreos % 100 === 0) {
        announce(`You now have ${oreos} Oreos!`)
      }
    }
  }, [oreos, announce])

  const handleOreoClick = () => {
    startAutomation()
    actions.getOreo()
    playSound('click')
  }

  const handleBuyGadget = (type) => {
    startAutomation()
    const success = actions.buyGadget(type)
    playSound(success ? 'purchase' : 'error')
    
    // Visual feedback
    if (settings.animationsEnabled) {
      if (success) {
        announce('Gadget purchased!')
        // Add success flash to gadgets side
        const gadgetsSide = document.querySelector('.gadgets-side')
        gadgetsSide?.classList.add('success-flash')
        setTimeout(() => gadgetsSide?.classList.remove('success-flash'), 400)
      } else {
        announce('Not enough Oreos!')
        // Add shake animation to oreo
        const biscuit = document.querySelector('.big-biscuit')
        biscuit?.classList.add('shake-animation')
        setTimeout(() => biscuit?.classList.remove('shake-animation'), 500)
      }
    } else {
      // Just announce without animation
      if (success) {
        announce('Gadget purchased!')
      } else {
        announce('Not enough Oreos!')
      }
    }
  }

  const handlePrestige = () => {
    actions.prestige(initialState.gadgets)
    playSound('achievement')
    announce('You have prestiged! Enjoy your multiplier boost!')
  }

  return (
    <ErrorBoundary>
      <div className={`oreo-clicker ${!settings.animationsEnabled ? 'animations-disabled' : ''}`}>
        <div className="oreo-bg">
          <div className="biscuit-side">
            <div>
              <Header />
              <OreoBiscuit getOreo={handleOreoClick} />
              <Counter oreos={oreos} />
              <Speed speed={speed} />
            </div>
          </div>
          <Notifications messages={messages} />
          <div className="gadgets-side">
            <Settings onImportSave={() => window.location.reload()} initialState={initialState} />
            <ErrorBoundary>
              <PrestigeButton state={state} onPrestige={handlePrestige} />
            </ErrorBoundary>
            <ErrorBoundary>
              <ProgressIndicator state={state} unlockedAchievements={achievements.unlockedAchievements} />
            </ErrorBoundary>
            <ErrorBoundary>
              <LazyStats state={state} />
            </ErrorBoundary>
            <ErrorBoundary>
              <LazyGadgetsList buyGadget={handleBuyGadget} gadgets={gadgets} />
            </ErrorBoundary>
            <ErrorBoundary>
              <LazyTrophies state={state} unlockedAchievements={achievements.unlockedAchievements} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default Oreo
