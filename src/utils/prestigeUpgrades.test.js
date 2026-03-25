import {
  getClickMultiplier,
  getProductionBoost,
  getStartingOreos,
  getGoldenSpawnMultiplier,
  applyPrestigeUpgrades
} from './prestigeUpgrades'

describe('Prestige Upgrades', () => {
  describe('getClickMultiplier', () => {
    it('returns 1 with no upgrades', () => {
      expect(getClickMultiplier([])).toBe(1)
    })

    it('returns 2 with click_power_1', () => {
      expect(getClickMultiplier(['click_power_1'])).toBe(2)
    })

    it('returns 10 with both click upgrades', () => {
      expect(getClickMultiplier(['click_power_1', 'click_power_2'])).toBe(10)
    })
  })

  describe('getProductionBoost', () => {
    it('returns 1 with no upgrades', () => {
      expect(getProductionBoost([])).toBe(1)
    })

    it('returns 1.25 with production_1', () => {
      expect(getProductionBoost(['production_1'])).toBe(1.25)
    })

    it('returns 1.875 with both production upgrades', () => {
      expect(getProductionBoost(['production_1', 'production_2'])).toBe(1.875)
    })
  })

  describe('getStartingOreos', () => {
    it('returns 0 with no upgrades', () => {
      expect(getStartingOreos([])).toBe(0)
    })

    it('returns 1000 with starting_boost', () => {
      expect(getStartingOreos(['starting_boost'])).toBe(1000)
    })
  })

  describe('getGoldenSpawnMultiplier', () => {
    it('returns 1 with no upgrades', () => {
      expect(getGoldenSpawnMultiplier([])).toBe(1)
    })

    it('returns 2 with golden_luck', () => {
      expect(getGoldenSpawnMultiplier(['golden_luck'])).toBe(2)
    })
  })

  describe('applyPrestigeUpgrades', () => {
    it('applies click upgrades correctly', () => {
      const state = { prestigeUpgrades: ['click_power_1'] }
      expect(applyPrestigeUpgrades(state, 'click')).toBe(2)
    })

    it('applies production upgrades correctly', () => {
      const state = { prestigeUpgrades: ['production_1', 'production_2'] }
      expect(applyPrestigeUpgrades(state, 'production')).toBe(1.875)
    })
  })
})
