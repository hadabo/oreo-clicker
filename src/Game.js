import React, { Component, Suspense } from 'react'
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

import './assets/style/game.css'

class Oreo extends Component {
  constructor(props) {
    super(props)
    if (window.localStorage.getItem('progrees')) {
      this.state = this.getProgress()
      this.automate()
    } else {
      this.state = initialState
    }

    this.getOreo = this.getOreo.bind(this)
    this.buyGadget = this.buyGadget.bind(this)
    this.oreosPerSecond = this.oreosPerSecond.bind(this)
  }

  getOreo() {
    if (!this.automationTimerID) this.automate()

    this.setState(prevState => ({
      oreos: prevState.oreos + 1,
      clicks: prevState.clicks + 1,
    }))
  }

  buyGadget(type) {
    const { gadgets, oreos } = this.state
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

      this.setState(prevState => ({
        oreos: oreos - totalCost,
        gadgetsCount: prevState.gadgetsCount + 1,
        gadgets: newGadgets,
      }))
    } else {
      this.setState(prevState => ({
        messages: [
          ...this.getMaxMessages(prevState.messages, 3),
          {
            type: 'info',
            text: `Not enough oreos yet! you need 
            ${numeral(Math.ceil(totalCost - oreos)).format('0,0')} more!`,
            time: 5,
          },
        ],
      }))
    }
  }

  automate() {
    this.automationTimerID = setInterval(() => this.tick(), 1000)
  }

  oreosPerSecond() {
    const { gadgets } = this.state
    const reducer = (accumulator, currentValue) => {
      accumulator += currentValue.speed * currentValue.count
      return accumulator
    }
    const speed = gadgets.reduce(reducer, 0)
    return speed
  }

  getMaxMessages(messages, max) {
    let updatedMessages = messages
    let messagesCount = updatedMessages.length
    if (messagesCount >= max) {
      updatedMessages.shift()
    }

    return updatedMessages
  }

  getUpdatedMessages(messages) {
    let updatedMessages = messages
    let messagesCount = updatedMessages.length
    if (messagesCount > 0) {
      updatedMessages = updatedMessages
        .map(message => {
          return { ...message, time: message.time - 1 }
        })
        .filter(message => {
          return message.time >= 0 && message
        })
    } else {
      updatedMessages = []
    }

    return updatedMessages
  }

  tick() {
    const { messages, ticks, autoSaveTimeout } = this.state
    const newMessages = this.getUpdatedMessages(messages)
    const oreosPerTick = this.oreosPerSecond()
    this.setState(prevState => ({
      oreos: prevState.oreos + oreosPerTick,
      ticks: prevState.ticks + 1,
      messages: newMessages,
    }))

    this.saveProgress({ ticks, autoSaveTimeout })
  }

  saveProgress({ ticks, autoSaveTimeout }) {
    const progrees = JSON.stringify(this.state)
    const encryptedProgress = crepto('encrypt', progrees)

    if (ticks % autoSaveTimeout === 0) {
      window.localStorage.setItem('progrees', encryptedProgress)
    }
  }

  getProgress() {
    const encryptedProgress = window.localStorage.getItem('progrees')
    const progress = crepto('decrypt', encryptedProgress)

    return JSON.parse(progress)
  }

  render() {
    const { messages, oreos, gadgets } = this.state

    return (
      <div className="oreo-clicker">
        <div className="oreo-bg">
          <Suspense fallback={<div>Loading Game :)</div>}>
            <div className="biscuit-side">
              <div>
                <Header />
                <OreoBiscuit getOreo={this.getOreo} />
                <Counter oreos={oreos} />
                <Speed oreosPerSecond={this.oreosPerSecond} />
              </div>
            </div>
            <Notifications messages={messages} />
            <div className="gadgets-side">
              <Stats state={this.state} />
              <GadgetsList buyGadget={this.buyGadget} gadgets={gadgets} />
              <Trophies state={this.state} />
            </div>
          </Suspense>
        </div>
      </div>
    )
  }
}

export default Oreo
