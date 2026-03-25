import React, { useEffect, useState } from 'react'

function Confetti({ trigger, duration = 3000 }) {
  const [particles, setParticles] = useState([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (trigger > 0) {
      setIsActive(true)
      
      // Create confetti particles
      const newParticles = []
      const colors = ['#ff6b9d', '#4caf50', '#2196f3', '#ffeb3b', '#ff9800', '#9c27b0']
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 0.3,
          duration: 2 + Math.random() * 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          size: 8 + Math.random() * 8
        })
      }
      
      setParticles(newParticles)
      
      // Clean up after duration
      setTimeout(() => {
        setIsActive(false)
        setParticles([])
      }, duration)
    }
  }, [trigger, duration])

  if (!isActive) return null

  return (
    <div className="confetti-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="confetti-piece"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            transform: `rotate(${particle.rotation}deg)`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
        />
      ))}
    </div>
  )
}

export default Confetti
