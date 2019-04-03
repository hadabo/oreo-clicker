import React from 'react'
import numeral from 'numeral'

export default function Trophies({ state }) {
  const { ticks, clicks, gadgetsCount } = state
  return (
    <div className="stats">
      <div>time played: {numeral(ticks).format('00:00:00')}</div>
      <div>clicks: {numeral(clicks).format('0,0')}</div>
      <div>total gadgets: {numeral(gadgetsCount).format('0,0')}</div>
    </div>
  )
}
