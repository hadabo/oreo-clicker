import React from 'react'
import numeral from 'numeral'

export default function Speed(props) {
  const { oreosPerSecond } = props
  return (
    <div className="oreo-speed oreo-font">
      per second: {numeral(oreosPerSecond()).format('0,0.0')}
    </div>
  )
}
