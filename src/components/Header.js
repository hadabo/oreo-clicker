import React from 'react'
import oreoLogo from '../assets/images/oreo-logo.png'

function Header() {
  return (
    <div className="logo oreo-font">
      <img src={oreoLogo} className="oreo-logo" alt="oreo logo" />
      <span>Clicker!</span>
    </div>
  )
}

export default React.memo(Header)
