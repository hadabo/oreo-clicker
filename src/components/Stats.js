import React from 'react'
import { formatNumber } from '../utils/formatNumber'
import numeral from 'numeral'

export default function Stats({ state }) {
  const { ticks, clicks, gadgetsCount } = state
  return (
    <div className="stats">
      <h4 className="oreo-font">Stats</h4>
      <div>time played: {numeral(ticks).format('00:00:00')}</div>
      <div>clicks: {formatNumber(clicks)}</div>
      <div>total gadgets: {formatNumber(gadgetsCount)}</div>
    </div>
  )
}
