import { calculateComboMultiplier, getComboTier, getComboColor } from './combo'

describe('Combo System', () => {
  describe('calculateComboMultiplier', () => {
    it('returns 1 for combo < 5', () => {
      expect(calculateComboMultiplier(0)).toBe(1)
      expect(calculateComboMultiplier(4)).toBe(1)
    })

    it('returns 2 for combo 5-9', () => {
      expect(calculateComboMultiplier(5)).toBe(2)
      expect(calculateComboMultiplier(9)).toBe(2)
    })

    it('returns 3 for combo 10-19', () => {
      expect(calculateComboMultiplier(10)).toBe(3)
      expect(calculateComboMultiplier(19)).toBe(3)
    })

    it('returns 4 for combo 20-49', () => {
      expect(calculateComboMultiplier(20)).toBe(4)
      expect(calculateComboMultiplier(49)).toBe(4)
    })

    it('returns 5 for combo >= 50', () => {
      expect(calculateComboMultiplier(50)).toBe(5)
      expect(calculateComboMultiplier(100)).toBe(5)
    })
  })

  describe('getComboTier', () => {
    it('returns correct tier names', () => {
      expect(getComboTier(3)).toBe('Normal')
      expect(getComboTier(7)).toBe('Good')
      expect(getComboTier(15)).toBe('Great')
      expect(getComboTier(35)).toBe('Excellent')
      expect(getComboTier(75)).toBe('Legendary')
    })
  })

  describe('getComboColor', () => {
    it('returns correct colors for tiers', () => {
      expect(getComboColor(3)).toBe('#666')
      expect(getComboColor(7)).toBe('#4caf50')
      expect(getComboColor(15)).toBe('#2196f3')
      expect(getComboColor(35)).toBe('#9c27b0')
      expect(getComboColor(75)).toBe('#ff9800')
    })
  })
})
