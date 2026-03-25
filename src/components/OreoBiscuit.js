import React, { useRef } from 'react'
import oreoBiscuit from '../assets/images/oreo.png'
import ClickEffects from './ClickEffects'
import { useSettings } from '../context/SettingsContext'

function OreoBiscuit(props) {
  const { getOreo } = props
  const { settings } = useSettings()
  const containerRef = useRef(null)
  const { triggerEffects, EffectsRenderer } = ClickEffects({ containerRef })
  
  const handleClick = (event) => {
    getOreo()
    if (settings.animationsEnabled) {
      triggerEffects(event, 1)
    }
  }
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      getOreo()
      if (settings.animationsEnabled) {
        // Create synthetic click event for effects
        const rect = event.currentTarget.getBoundingClientRect()
        const syntheticEvent = {
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
          currentTarget: event.currentTarget
        }
        triggerEffects(syntheticEvent, 1)
      }
    }
  }

  return (
    <div 
      ref={containerRef}
      className="big-biscuit" 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Click to earn Oreo cookies"
    >
      <img 
        src={oreoBiscuit} 
        className="oreo-biscuit" 
        alt="Click the Oreo biscuit to earn cookies"
      />
      {settings.animationsEnabled && <EffectsRenderer />}
    </div>
  )
}

export default React.memo(OreoBiscuit)
