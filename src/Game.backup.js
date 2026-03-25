import React, { useReducer, useRef, useEffect, useCallback } from 'react'
// Import core components directly
import Header from './components/Header'
import OreoBiscuit from './components/OreoBiscuit'
import Counter from './components/Counter'
import Speed from './components/Speed'
import Notifications from './components/Notifications'

// Import lazy-loaded components
import { LazyGadgetsList, LazyTrophies, LazyStats } from './components/LazyLoadedComponents'

// Import timer service
import { timerService } from './helpers/timerService'

import crepto from './helpers/crypto'
import numeral from 'numeral'
import initialState from './initialState.json'
import reducer from './reducer'
import './assets/style/game.css'

import { STORAGE_KEY } from './constants'

function getProgress() {
  if (window.localStorage.getItem(STORAGE_KEY)) {
    const encryptedProgress = window.localStorage.getItem(STORAGE_KEY)
    let progress = initialState

    try {
      progress = crepto('decrypt', encryptedProgress)
    } catch (error) {
      console.error(error)
    }

    return progress
  }

  return null
}

function Oreo() {
  const [state, dispatch] = useReducer(reducer, getProgress() || initialState)
  const { oreos, speed, gadgets, messages, ticks } = state

  // Track if timer is active
  const isTimerActive = useRef(false)
  // Track if game has been started by user interaction
  const gameStartedByUser = useRef(false)

  const tick = useCallback((elapsedTime) => {
    dispatch({ 
      type: 'TICK',
      payload: { elapsedTime }
    })
    // Only save progress at certain intervals to reduce storage operations
    if (elapsedTime && elapsedTime % 10 === 0) {
      dispatch({ type: 'SAVE_PROGRESS' })
    }
  }, [])

  // Initialize timer service but don't start ticking yet
  const initializeTimer = useCallback(() => {
    if (!isTimerActive.current) {
      // Initialize timerService with saved elapsed time
      if (ticks > 0) {
        timerService.initializeWithElapsedTime(ticks);
      }
      
      // Register tick callback with the timer service, passing elapsed time
      timerService.onTick((elapsed) => {
        tick(elapsed)
      })
      isTimerActive.current = true
    }
  }, [tick, ticks])

  // Start timer and automation
  const startAutomation = useCallback(() => {
    if (!gameStartedByUser.current) {
      // If timer isn't yet initialized, initialize it
      if (!isTimerActive.current) {
        initializeTimer();
      }
      
      // Start the timer
      timerService.startTimer();
      gameStartedByUser.current = true;
    }
  }, [initializeTimer])

  useEffect(() => {
    // Initialize timer service when component mounts but don't start ticking
    initializeTimer()
    
    // Clean up timer when component unmounts
    return () => {
      timerService.destroy()
      isTimerActive.current = false
      gameStartedByUser.current = false
    }
  }, [initializeTimer])

  function getOreo() {
    // On first click, start the automation
    if (!gameStartedByUser.current) {
      startAutomation();
    }
    dispatch({ type: 'GET_OREO' })
  }

  function buyGadget(type) {
    // Ensure automation is running if this is the first interaction
    if (!gameStartedByUser.current) {
      startAutomation();
    }

    const requestedGadgetIndex = gadgets.findIndex(
      (gadget) => gadget.type === type
    )

    const requestedGadget = gadgets[requestedGadgetIndex]

    let newGadgets = [...gadgets] // Create a new array to avoid direct state mutation
    let totalCost = requestedGadget.cost

    if (oreos >= totalCost) {
      newGadgets[requestedGadgetIndex] = {
        ...requestedGadget,
        count: requestedGadget.count + 1,
        cost: Math.ceil(totalCost * requestedGadget.inflation)
      }

      dispatch({ type: 'BUY_GADGET', totalCost, newGadgets })
    } else {
      const newMessage = {
        type: 'info',
        text: `Not enough oreos yet! you need
        ${numeral(Math.ceil(totalCost - oreos)).format('0,0')} more!`,
        time: 5,
        id: Date.now() // Add unique ID for better React key management
      }

      dispatch({ type: 'PUSH_MESSAGE', newMessage })
    }
  }

  return (
    <div className="oreo-clicker">
      <div className="oreo-bg">
        <div className="biscuit-side">
          <div>
            <Header />
            <OreoBiscuit getOreo={getOreo} />
            <Counter oreos={oreos} />
            <Speed speed={speed} />
          </div>
        </div>
        <Notifications messages={messages} />
        <div className="gadgets-side">
          <LazyStats state={state} />
          <LazyGadgetsList buyGadget={buyGadget} gadgets={gadgets} />
          <LazyTrophies state={state} />
        </div>
      </div>
    </div>
  )
}

export default Oreo
