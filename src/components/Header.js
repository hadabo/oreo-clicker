import React from 'react'
import oreoLogo from '../assets/images/oreo-logo.png'

function Header() {
  return (
    <div className="header-logo oreo-font">
      <img src={oreoLogo} className="oreo-logo" alt="oreo logo" />
      <span className="header-title">Clicker!</span>
    </div>
  )
}

export default React.memo(Header)
