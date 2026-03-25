import { useRef, useEffect, useCallback } from 'react'
import { timerService } from '../helpers/timerService'
import { useSettings } from '../context/SettingsContext'

export function useTimer(onTick) {
  const isTimerActive = useRef(false)
  const gameStartedByUser = useRef(false)
  const { settings } = useSettings()

  const initializeTimer = useCallback((ticks = 0) => {
    if (!isTimerActive.current) {
      if (ticks > 0) {
        timerService.initializeWithElapsedTime(ticks)
      }
      
      timerService.onTick((elapsed) => onTick(elapsed, settings.autoSaveInterval))
      isTimerActive.current = true
    }
  }, [onTick, settings.autoSaveInterval])

  const startAutomation = useCallback(() => {
    if (!gameStartedByUser.current) {
      if (!isTimerActive.current) {
        initializeTimer()
      }
      
      timerService.startTimer()
      gameStartedByUser.current = true
    }
  }, [initializeTimer])

  useEffect(() => {
    return () => {
      timerService.destroy()
      isTimerActive.current = false
      gameStartedByUser.current = false
    }
  }, [])

  return {
    initializeTimer,
    startAutomation,
    isGameStarted: gameStartedByUser.current
  }
}
