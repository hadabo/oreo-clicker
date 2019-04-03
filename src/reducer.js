import crepto from './helpers/crypto'

function reducer(state, action) {
  switch (action.type) {
    case 'GET_OREO':
      return {
        ...state,
        oreos: state.oreos + 1,
        clicks: state.clicks + 1,
      }

    case 'BUY_GADGET':
      const speed = oreosPerSecond(action.newGadgets)
      return {
        ...state,
        oreos: state.oreos - action.totalCost,
        gadgetsCount: state.gadgetsCount + 1,
        gadgets: action.newGadgets,
        speed,
      }

    case 'PUSH_MESSAGE':
      const lastThreeMessages = getMaxMessages(state.messages, 3)
      return {
        ...state,
        messages: [...lastThreeMessages, action.newMessage],
      }

    case 'TICK':
      const oreosPerTick = oreosPerSecond(state.gadgets)
      const newMessages = getUpdatedMessages(state.messages)
      return {
        ...state,
        ticks: state.ticks + 1,
        oreos: state.oreos + oreosPerTick,
        messages: newMessages,
      }

    case 'SAVE_PROGRESS':
      if (state.ticks % state.autoSaveTimeout === 0) {
        saveProgress(state)
      }
      return state

    default:
      return state
  }

  function getMaxMessages(messages, max) {
    let maxMessages = messages
    if (maxMessages.length >= max) {
      maxMessages.shift()
    }

    return maxMessages
  }

  function getUpdatedMessages(messages) {
    let updatedMessages = messages
    if (updatedMessages.length > 0) {
      updatedMessages = updatedMessages
        .map(message => {
          return { ...message, time: message.time - 1 }
        })
        .filter(message => {
          return message.time >= 0 && message
        })
    }

    return updatedMessages
  }

  function oreosPerSecond(gadgets) {
    const speedReducer = (accumulator, currentValue) => {
      accumulator += currentValue.speed * currentValue.count
      return accumulator
    }
    const speed = gadgets.reduce(speedReducer, 0)
    return speed
  }

  function saveProgress(state) {
    const newMessage = {
      type: 'info',
      text: `Click on the big OREO biscuit to resume :)`,
      time: 0,
    }
    const stateWithoutMessages = { ...state, messages: [newMessage] }
    const progrees = JSON.stringify(stateWithoutMessages)
    const encryptedProgress = crepto('encrypt', progrees)

    window.localStorage.setItem('progrees', encryptedProgress)
  }
}

export default reducer
