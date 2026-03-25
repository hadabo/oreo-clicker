import React, { useState, useEffect, useCallback } from 'react'

let particleId = 0

function ClickEffects({ containerRef }) {
  const [particles, setParticles] = useState([])
  const [floatingNumbers, setFloatingNumbers] = useState([])

  // Clean up expired effects
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setParticles(prev => prev.filter(p => now - p.timestamp < 1000))
      setFloatingNumbers(prev => prev.filter(n => now - n.timestamp < 1500))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const createParticles = useCallback((x, y, count = 8) => {
    const newParticles = []
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count
      const velocity = 2 + Math.random() * 2
      const size = 4 + Math.random() * 8
      
      newParticles.push({
        id: particleId++,
        x,
        y,
        angle,
        velocity,
        size,
        timestamp: Date.now(),
        color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`
      })
    }
    setParticles(prev => [...prev, ...newParticles])
  }, [])

  const createFloatingNumber = useCallback((x, y, value) => {
    setFloatingNumbers(prev => [...prev, {
      id: particleId++,
      x,
      y,
      value,
      timestamp: Date.now()
    }])
  }, [])

  const createRipple = useCallback((x, y) => {
    const ripple = document.createElement('div')
    ripple.className = 'click-ripple'
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    
    if (containerRef?.current) {
      containerRef.current.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    }
  }, [containerRef])

  const triggerEffects = useCallback((event, value = 1) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    createParticles(x, y)
    createFloatingNumber(x, y, value)
    createRipple(x, y)
  }, [createParticles, createFloatingNumber, createRipple])

  return {
    triggerEffects,
    EffectsRenderer: () => (
      <>
        {/* Particles */}
        {particles.map(particle => {
          const age = Date.now() - particle.timestamp
          const progress = age / 1000
          const distance = particle.velocity * age / 10
          
          const x = particle.x + Math.cos(particle.angle) * distance
          const y = particle.y + Math.sin(particle.angle) * distance - (progress * 50)
          const opacity = 1 - progress

          return (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity,
                transform: `scale(${1 - progress * 0.5})`
              }}
            />
          )
        })}

        {/* Floating Numbers */}
        {floatingNumbers.map(number => {
          const age = Date.now() - number.timestamp
          const progress = age / 1500
          const y = number.y - (progress * 100)
          const opacity = 1 - progress

          return (
            <div
              key={number.id}
              className="floating-number"
              style={{
                left: `${number.x}px`,
                top: `${y}px`,
                opacity
              }}
            >
              +{number.value}
            </div>
          )
        })}
      </>
    )
  }
}

export default ClickEffects
