import React from 'react'

const PRESTIGE_UPGRADES = [
  {
    id: 'click_power_1',
    name: 'Enhanced Clicks',
    description: 'Double your click power',
    cost: 1,
    effect: { type: 'click_multiplier', value: 2 },
    icon: '👆'
  },
  {
    id: 'click_power_2',
    name: 'Super Clicks',
    description: '5x click power',
    cost: 3,
    effect: { type: 'click_multiplier', value: 5 },
    requires: 'click_power_1',
    icon: '✨'
  },
  {
    id: 'production_1',
    name: 'Efficient Production',
    description: '+25% production speed',
    cost: 2,
    effect: { type: 'production_boost', value: 1.25 },
    icon: '⚡'
  },
  {
    id: 'production_2',
    name: 'Mass Production',
    description: '+50% production speed',
    cost: 5,
    effect: { type: 'production_boost', value: 1.5 },
    requires: 'production_1',
    icon: '🚀'
  },
  {
    id: 'starting_boost',
    name: 'Head Start',
    description: 'Start with 1000 Oreos after prestige',
    cost: 2,
    effect: { type: 'starting_oreos', value: 1000 },
    icon: '🎁'
  },
  {
    id: 'golden_luck',
    name: 'Golden Fortune',
    description: 'Golden Oreos appear 2x more often',
    cost: 4,
    effect: { type: 'golden_spawn_rate', value: 2 },
    icon: '🌟'
  }
]

function PrestigeShop({ prestige, prestigeUpgrades = [], onPurchase }) {
  if (!prestige || prestige.level === 0) {
    return null
  }

  const canAfford = (cost) => prestige.points >= cost
  const isOwned = (id) => prestigeUpgrades.includes(id)
  const meetsRequirements = (upgrade) => {
    if (!upgrade.requires) return true
    return isOwned(upgrade.requires)
  }

  return (
    <div>
      <h2 className="oreo-font">
        ⭐ Prestige Shop ({prestige.points} {prestige.points !== 1 ? 'Points' : 'Point'})
      </h2>
      <ul className="prestige-upgrades-list">
        {PRESTIGE_UPGRADES.map(upgrade => {
          const owned = isOwned(upgrade.id)
          const canBuy = canAfford(upgrade.cost) && meetsRequirements(upgrade)
          const locked = !meetsRequirements(upgrade)

          return (
            <li className="prestige-upgrade-item" key={upgrade.id}>
              <button 
                className={`buy-prestige-upgrade ${owned ? 'owned' : ''} ${!canBuy ? 'disabled' : ''} ${locked ? 'locked' : ''}`}
                onClick={() => !owned && canBuy && onPurchase(upgrade.id)}
                disabled={owned || !canBuy}
                aria-label={`${upgrade.name}: ${upgrade.description}. Cost: ${upgrade.cost} point${upgrade.cost !== 1 ? 's' : ''}. ${owned ? 'Already owned' : ''}`}
              >
                <i className={`prestige-upgrade-icon upgrade-${upgrade.id}`}>
                  {upgrade.icon}
                </i>
                <span className="upgrade-name">{upgrade.name}</span>
                <span className="upgrade-cost">
                  {owned ? '✓ Owned' : `${upgrade.cost} point${upgrade.cost !== 1 ? 's' : ''}`}
                </span>
                <div className="upgrade-desc">
                  <small>{upgrade.description}</small>
                </div>
                {locked && upgrade.requires && (
                  <div className="upgrade-locked-msg">
                    <small>🔒 Requires: {PRESTIGE_UPGRADES.find(u => u.id === upgrade.requires)?.name}</small>
                  </div>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PrestigeShop
export { PRESTIGE_UPGRADES }
