import React from 'react'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'
import { useSettings } from '../context/SettingsContext'
import { formatSpeed } from '../utils/formatNumber'

function Speed(props) {
  const { speed } = props
  const { settings } = useSettings()
  const animatedValue = useAnimatedCounter(speed, 300)
  const displayValue = settings.animationsEnabled ? animatedValue : speed
    
  return (
    <div className="oreo-speed oreo-font">
      per second: {formatSpeed(displayValue)}
    </div>
  )
}

export default Speed
