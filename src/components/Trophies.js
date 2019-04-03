import React from 'react'

export default function Trophies({ state }) {
  const { trophies } = state
  return (
    trophies.length > 0 && (
      <div className="trophies-center">
        <h2 className="oreo-font">Trophies Center</h2>
        <div className="trophies">
          {trophies.map((trophy, index) => {
            if (state[trophy.key] >= trophy.target) {
              return (
                <div
                  className={`trophy trophy-${trophy.type}`}
                  key={index}
                  data-hint={trophy.message}
                >
                  <span>{trophy.title}</span>
                </div>
              )
            }

            return false
          })}
        </div>
      </div>
    )
  )
}
