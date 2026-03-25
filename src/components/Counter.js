import React from 'react'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'
import { useSettings } from '../context/SettingsContext'
import { formatNumber } from '../utils/formatNumber'

function Counter(props) {
  const { oreos } = props
  const { settings } = useSettings()
  const animatedValue = useAnimatedCounter(oreos, 300)
  const displayValue = settings.animationsEnabled ? animatedValue : oreos
    
  return (
    <div className="oreos-counter oreo-font">
      {formatNumber(displayValue)} oreos!
    </div>
  )
}

export default Counter
