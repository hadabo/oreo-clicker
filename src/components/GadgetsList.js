import React from 'react'
import { useSettings } from '../context/SettingsContext'
import { formatNumber, formatSpeed } from '../utils/formatNumber'

function GadgetsList(props) {
  const { gadgets, buyGadget } = props
  const { settings } = useSettings()
  
  const handleBuyClick = (event, gadgetType) => {
    if (settings.animationsEnabled) {
      const button = event.currentTarget
      button.classList.add('pulse-animation')
      setTimeout(() => button.classList.remove('pulse-animation'), 300)
    }
    buyGadget(gadgetType)
  }
  
  const listItems = gadgets.map(gadget => (
    <li className="automation-item" key={gadget.type}>
      <button 
        className="buy-gadget" 
        onClick={(e) => handleBuyClick(e, gadget.type)}
        aria-label={`Buy ${gadget.type} for ${formatNumber(gadget.cost)} oreos. Produces ${formatSpeed(gadget.speed)} oreos per second. Currently own ${gadget.count}.`}
      >
        <i className={`icon icon-${gadget.type}`} aria-hidden="true" />
        <span className="gadget-name">{gadget.type}</span>
        <span className="gadget-cost">
          {formatNumber(gadget.cost)} oreos
        </span>
        <div>
          <small>{formatSpeed(gadget.speed)} oreo per second!</small>
        </div>
        <span className="gadgets-count" aria-label={`Owned: ${gadget.count}`}>
          {gadget.count}
        </span>
      </button>
    </li>
  ))

  return (
    <div>
      <h2 className="oreo-font">Automation Gadgets!</h2>
      <ul className="automation-store">
        {listItems}
      </ul>
    </div>
  )
}

export default React.memo(GadgetsList)
