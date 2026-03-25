import { useSettings } from '../context/SettingsContext'

// Simple sound generation using Web Audio API
class SoundManager {
  constructor() {
    this.audioContext = null
    this.initAudio()
  }

  initAudio() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }

  playTone(frequency, duration = 0.1, type = 'sine') {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  playClickSound() {
    // Pleasant cookie click sound
    this.playTone(800, 0.1, 'sine')
    setTimeout(() => this.playTone(1000, 0.05, 'sine'), 50)
  }

  playPurchaseSound() {
    // Success sound for purchases
    this.playTone(523, 0.1, 'sine') // C5
    setTimeout(() => this.playTone(659, 0.1, 'sine'), 100) // E5
    setTimeout(() => this.playTone(784, 0.2, 'sine'), 200) // G5
  }

  playAchievementSound() {
    // Triumphant achievement sound
    this.playTone(523, 0.1, 'sine') // C5
    setTimeout(() => this.playTone(659, 0.1, 'sine'), 100) // E5
    setTimeout(() => this.playTone(784, 0.1, 'sine'), 200) // G5
    setTimeout(() => this.playTone(1047, 0.3, 'sine'), 300) // C6
  }

  playErrorSound() {
    // Error sound for insufficient funds
    this.playTone(200, 0.2, 'sawtooth')
  }
}

const soundManager = new SoundManager()

export function useSound() {
  const { settings } = useSettings()

  const playSound = (soundType) => {
    if (!settings.soundEnabled) return

    switch (soundType) {
      case 'click':
        soundManager.playClickSound()
        break
      case 'purchase':
        soundManager.playPurchaseSound()
        break
      case 'achievement':
        soundManager.playAchievementSound()
        break
      case 'error':
        soundManager.playErrorSound()
        break
      default:
        break
    }
  }

  return { playSound }
}
