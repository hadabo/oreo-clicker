import React, { Suspense, useReducer, useRef, useEffect } from 'react'
import GadgetsList from './components/GadgetsList'
import Header from './components/Header'
import OreoBiscuit from './components/OreoBiscuit'
import Counter from './components/Counter'
import Speed from './components/Speed'
import Notifications from './components/Notifications'
import Trophies from './components/Trophies'
import Stats from './components/Stats'
import crepto from './helpers/crypto'
import numeral from 'numeral'
import initialState from './initialState.json'
import reducer from './reducer'
import './assets/style/game.css'

function getProgress() {
  if (window.localStorage.getItem('progrees')) {
    const encryptedProgress = window.localStorage.getItem('progrees')
    const progress = crepto('decrypt', encryptedProgress)

    return JSON.parse(progress)
  }

  return null
}

function Oreo() {
  const [state, dispatch] = useReducer(reducer, getProgress() || initialState)
  const { oreos, speed, gadgets, messages } = state

  const automationTimerID = useRef(null)

  // useEffect(() => {
  //   automate()
  // }, [])

  function getOreo() {
    if (!automationTimerID.current) automate()
    dispatch({ type: 'GET_OREO' })
  }

  function buyGadget(type) {
    if (!automationTimerID.current) automate()

    const requestedGadgetIndex = gadgets.findIndex(
      gadget => gadget.type === type
    )

    const requestedGadget = gadgets[requestedGadgetIndex]

    let newGadgets = gadgets
    let totalCost = requestedGadget.cost

    if (oreos >= totalCost) {
      newGadgets[requestedGadgetIndex].count = requestedGadget.count + 1
      newGadgets[requestedGadgetIndex].cost = Math.ceil(
        totalCost * requestedGadget.inflation
      )

      dispatch({ type: 'BUY_GADGET', totalCost, newGadgets })
    } else {
      const newMessage = {
        type: 'info',
        text: `Not enough oreos yet! you need
        ${numeral(Math.ceil(totalCost - oreos)).format('0,0')} more!`,
        time: 5,
      }

      dispatch({ type: 'PUSH_MESSAGE', newMessage })
    }
  }

  function automate() {
    automationTimerID.current = setInterval(() => tick(), 1000)
  }

  function tick() {
    dispatch({ type: 'TICK' })
    dispatch({ type: 'SAVE_PROGRESS' })
  }

  return (
    <div className="oreo-clicker">
      <div className="oreo-bg">
        <Suspense fallback={<div>Loading Game :)</div>}>
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
            <Stats state={state} />
            <GadgetsList buyGadget={buyGadget} gadgets={gadgets} />
            <Trophies state={state} />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default Oreo
