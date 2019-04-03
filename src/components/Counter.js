import React from 'react'
import numeral from 'numeral'

export default function Counter(props) {
  const { oreos } = props
  return (
    <div className="oreos-counter oreo-font">
      {numeral(oreos).format('0,0')} oreos!
    </div>
  )
}
