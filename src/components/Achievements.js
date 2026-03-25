import React from 'react'
import { ACHIEVEMENTS } from '../utils/achievements'

function Achievements({ unlockedAchievements, newAchievements, getAchievementData }) {
  return (
    <div className="achievements-panel">
      <h2 className="oreo-font">Achievements Center!</h2>
      <p className="oreo-font" style={{ textAlign: 'center', margin: '0 0 16px 0', fontSize: '14px' }}>
        ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
      </p>
      
      {newAchievements.length > 0 && (
        <div className="achievement-notifications">
          {newAchievements.map(id => {
            const achievement = getAchievementData(id)
            return (
              <div key={id} className="achievement-notification">
                <span className="achievement-icon">{achievement.icon}</span>
                <div>
                  <strong>{achievement.name}</strong>
                  <p>{achievement.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      <div className="achievements-grid">
        {ACHIEVEMENTS.map(achievement => {
          const isUnlocked = unlockedAchievements.includes(achievement.id)
          return (
            <div 
              key={achievement.id} 
              className={`achievement ${isUnlocked ? 'unlocked' : 'locked'}`}
              title={achievement.description}
            >
              <span className="achievement-icon">
                {isUnlocked ? achievement.icon : '🔒'}
              </span>
              <div className="achievement-info">
                <strong>{isUnlocked ? achievement.name : '???'}</strong>
                <p>{isUnlocked ? achievement.description : 'Hidden achievement'}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(Achievements)
