import React from 'react'
import numeral from 'numeral'

export default function GadgetsList(props) {
  const { gadgets, buyGadget } = props
  const listItems = gadgets.map(gadget => (
    <li className="automation-item" key={gadget.type}>
      <button className="buy-gadget" onClick={() => buyGadget(gadget.type)}>
        <i className={`icon icon-${gadget.type}`} alt="oreo logo" />
        <span className="gadget-name">{gadget.type}</span>
        <span className="gadget-cost">
          {numeral(gadget.cost).format('0,0') + ' oreos'}
        </span>
        <div>
          <small>{gadget.speed} oreo per second!</small>
        </div>
        <span className="gadgets-count">{gadget.count}</span>
      </button>
    </li>
  ))

  const list = <ul className="automation-store">{listItems}</ul>

  const gadgetsStore = (
    <div>
      <h2 className="oreo-font">Automation Gadgets!</h2>
      {list}
    </div>
  )

  return gadgetsStore
}
