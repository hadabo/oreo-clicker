import { useReducer, useCallback } from 'react'
import { MESSAGE_DURATION } from '../constants'
import { formatNumber } from '../utils/formatNumber'
import reducer from '../reducer'

export function useGameState(initialState) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getOreo = useCallback(() => {
    dispatch({ type: 'GET_OREO' })
  }, [])

  const buyGadget = useCallback((type) => {
    const { oreos, gadgets } = state
    const requestedGadgetIndex = gadgets.findIndex(gadget => gadget.type === type)
    const requestedGadget = gadgets[requestedGadgetIndex]

    if (!requestedGadget) return false

    const newGadgets = [...gadgets]
    const totalCost = requestedGadget.cost

    if (oreos >= totalCost) {
      newGadgets[requestedGadgetIndex] = {
        ...requestedGadget,
        count: requestedGadget.count + 1,
        cost: Math.ceil(totalCost * requestedGadget.inflation)
      }

      dispatch({ type: 'BUY_GADGET', totalCost, newGadgets })
      return true
    } else {
      const newMessage = {
        type: 'info',
        text: `Not enough oreos yet! you need ${formatNumber(Math.ceil(totalCost - oreos))} more!`,
        time: MESSAGE_DURATION,
        id: Date.now()
      }

      dispatch({ type: 'PUSH_MESSAGE', newMessage })
      return false
    }
  }, [state])

  const tick = useCallback((elapsedTime, autoSaveInterval = 10) => {
    dispatch({ 
      type: 'TICK',
      payload: { elapsedTime }
    })
    if (elapsedTime && elapsedTime % autoSaveInterval === 0) {
      dispatch({ 
        type: 'SAVE_PROGRESS',
        payload: { autoSaveInterval }
      })
    }
  }, [dispatch])

  const prestige = useCallback((initialGadgets) => {
    dispatch({ 
      type: 'PRESTIGE',
      payload: { initialGadgets }
    })
  }, [dispatch])

  const buyPrestigeUpgrade = useCallback((upgrade) => {
    dispatch({
      type: 'BUY_PRESTIGE_UPGRADE',
      payload: { upgrade }
    })
  }, [dispatch])

  const collectGoldenOreo = useCallback((bonus) => {
    dispatch({
      type: 'COLLECT_GOLDEN_OREO',
      payload: { bonus }
    })
  }, [dispatch])

  return {
    state,
    actions: {
      getOreo,
      buyGadget,
      tick,
      prestige,
      buyPrestigeUpgrade,
      collectGoldenOreo
    }
  }
}
