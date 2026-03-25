import { useEffect, useRef } from 'react'

export function useAnnouncement() {
  const announceRef = useRef(null)

  useEffect(() => {
    // Create live region if it doesn't exist
    if (!announceRef.current) {
      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.className = 'sr-only'
      liveRegion.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      `
      document.body.appendChild(liveRegion)
      announceRef.current = liveRegion
    }

    return () => {
      if (announceRef.current && document.body.contains(announceRef.current)) {
        document.body.removeChild(announceRef.current)
      }
    }
  }, [])

  const announce = (message) => {
    if (announceRef.current) {
      announceRef.current.textContent = message
    }
  }

  return announce
}
