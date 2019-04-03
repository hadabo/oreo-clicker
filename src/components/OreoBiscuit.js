import React from 'react'
import oreoBiscuit from '../assets/images/oreo.png'

export default function OreoBiscuit(props) {
  const { getOreo } = props
  return (
    <div className="big-biscuit" onClick={getOreo}>
      <img src={oreoBiscuit} className="oreo-biscuit" alt="oreo biscuit" />
    </div>
  )
}
