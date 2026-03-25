import React from 'react'

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="section-header">
      <div className="section-header-content">
        {icon && <span className="section-icon">{icon}</span>}
        <div className="section-title-group">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

export default SectionHeader
