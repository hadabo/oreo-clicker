import React, { Component, Suspense } from "react";
import GadgetsList from "./components/GadgetsList";
import Header from "./components/Header";
import OreoBiscuit from "./components/OreoBiscuit";
import Counter from "./components/Counter";
import Speed from "./components/Speed";
import crepto from "./helpers/crypto";
import numeral from "numeral";

import "./assets/style/game.css";

class Oreo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oreos: 0,
      clicks: 0,
      gadgetsCount: 0,
      ticks: 0,
      gadgets: [
        {
          type: "pointer",
          cost: 10,
          inflation: 1.2,
          speed: 0.1,
          count: 0
        },
        {
          type: "grandma",
          cost: 100,
          inflation: 1.2,
          speed: 1,
          count: 0
        },
        {
          type: "farm",
          cost: 250,
          inflation: 1.2,
          speed: 7,
          count: 0
        }
      ],
      messages: [],
      autoSaveTimeout: 60,
      trophies: [
        {
          type: "start",
          title: "start",
          message: "You've just started!",
          key: "clicks",
          target: 1
        },
        {
          type: "first-gadget",
          title: "1st gadget",
          message: "You've just got your first gadget!",
          key: "gadgetsCount",
          target: 1
        },
        {
          type: "ten-gadgets",
          title: "10 gadgets",
          message: "You've just got 10 gadget! keep it up!",
          key: "gadgetsCount",
          target: 10
        }
      ]
    };

    if (localStorage.getItem("progrees")) {
      this.state = this.getProgress();
      this.automate();
    }

    // This binding is necessary to make `this` work in the callback
    this.getOreo = this.getOreo.bind(this);
    this.buyGadget = this.buyGadget.bind(this);
    this.oreosPerSecond = this.oreosPerSecond.bind(this);
  }

  getOreo() {
    if (!this.automationTimerID) this.automate();

    this.setState(prevState => ({
      oreos: prevState.oreos + 1,
      clicks: prevState.clicks + 1
    }));
  }

  buyGadget(type) {
    const { gadgets, oreos } = this.state;
    const requestedGadgetIndex = gadgets.findIndex(
      gadget => gadget.type === type
    );

    const requestedGadget = gadgets[requestedGadgetIndex];

    let newGadgets = gadgets;
    let totalCost = requestedGadget.cost;

    if (oreos >= totalCost) {
      newGadgets[requestedGadgetIndex].count = requestedGadget.count + 1;
      newGadgets[requestedGadgetIndex].cost = Math.ceil(
        totalCost * requestedGadget.inflation
      );

      this.setState(prevState => ({
        oreos: oreos - totalCost,
        gadgetsCount: prevState.gadgetsCount + 1,
        gadgets: newGadgets
      }));
    } else {
      // const maxMessages = getMaxMessages(prevState.messages, 3);
      this.setState(prevState => ({
        messages: [
          ...this.getMaxMessages(prevState.messages, 3),
          {
            type: "info",
            text: `Not enough oreos yet! you need 
            ${numeral(Math.ceil(totalCost - oreos)).format("0,0")} more!`,
            time: 5
          }
        ]
      }));
    }
  }

  automate() {
    this.automationTimerID = setInterval(() => this.tick(), 1000);
  }

  oreosPerSecond() {
    const { gadgets } = this.state;
    const reducer = (accumulator, currentValue) => {
      accumulator += currentValue.speed * currentValue.count;
      return accumulator;
    };
    const speed = gadgets.reduce(reducer, 0);
    return speed;
  }

  getMaxMessages(messages, max) {
    let updatedMessages = messages;
    let messagesCount = updatedMessages.length;
    if (messagesCount >= max) {
      updatedMessages.shift();
    }

    return updatedMessages;
  }

  getUpdatedMessages(messages) {
    let updatedMessages = messages;
    let messagesCount = updatedMessages.length;
    if (messagesCount > 0) {
      updatedMessages = updatedMessages
        .map(message => {
          return { ...message, time: message.time - 1 };
        })
        .filter(message => {
          return message.time >= 0 && message;
        });
    } else {
      updatedMessages = [];
    }

    return updatedMessages;
  }

  tick() {
    const { messages, ticks, autoSaveTimeout } = this.state;

    const newMessages = this.getUpdatedMessages(messages);

    const oreosPerTick = this.oreosPerSecond();
    this.setState(prevState => ({
      oreos: prevState.oreos + oreosPerTick,
      ticks: prevState.ticks + 1,
      messages: newMessages
    }));

    this.saveProgress({ ticks, autoSaveTimeout });
  }

  saveProgress({ ticks, autoSaveTimeout }) {
    const progrees = JSON.stringify(this.state);
    const encryptedProgress = crepto("encrypt", progrees);

    if (ticks % autoSaveTimeout === 0) {
      localStorage.setItem("progrees", encryptedProgress);
    }
  }

  getProgress() {
    const encryptedProgress = localStorage.getItem("progrees");
    const progress = crepto("decrypt", encryptedProgress);

    return JSON.parse(progress);
  }

  render() {
    const {
      messages,
      oreos,
      ticks,
      clicks,
      gadgetsCount,
      gadgets,
      trophies
    } = this.state;

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
            {messages.length > 0 && (
              <div className="notifications-center">
                {messages.map((message, index) => {
                  return (
                    <div className="message" key={index}>
                      {message.text}
                    </div>
                  );
                })}
              </div>
            )}
            <div className="gadgets-side">
              <div className="stats">
                <div>time played: {numeral(ticks).format("00:00:00")}</div>
                <div>clicks: {numeral(clicks).format("0,0")}</div>
                <div>total gadgets: {numeral(gadgetsCount).format("0,0")}</div>
              </div>
              <GadgetsList buyGadget={this.buyGadget} gadgets={gadgets} />
              {trophies.length > 0 && (
                <div className="trophies-center">
                  <h2 className="oreo-font">Trophies Center</h2>
                  <div className="trophies">
                    {trophies.map((milestone, index) => {
                      if (this.state[milestone.key] >= milestone.target) {
                        return (
                          <div
                            className={`trophy trophy-${milestone.type}`}
                            key={index}
                            data-hint={milestone.message}
                          >
                            <span>{milestone.title}</span>
                          </div>
                        );
                      }

                      return false;
                    })}
                  </div>
                </div>
              )}
            </div>
          </Suspense>
        </div>
      </div>
    );
  }
}

export default Oreo;
