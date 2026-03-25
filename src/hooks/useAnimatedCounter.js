import { useEffect, useRef } from 'react'

export function useAnimatedCounter(value, duration = 500) {
  const displayValueRef = useRef(value)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const startValue = displayValueRef.current
    const endValue = value
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Ease-out function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      const currentValue = startValue + (endValue - startValue) * easeOut
      displayValueRef.current = Math.round(currentValue)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        displayValueRef.current = endValue
      }
    }

    // Only animate if value changed significantly (prevent micro-animations)
    if (Math.abs(endValue - startValue) > 0) {
      animationFrameRef.current = requestAnimationFrame(animate)
    } else {
      displayValueRef.current = endValue
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [value, duration])

  return displayValueRef.current
}
