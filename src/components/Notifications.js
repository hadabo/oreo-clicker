import React from 'react'

export default function Notifications({ messages }) {
  return (
    messages.length > 0 && (
      <div className="notifications-center">
        {messages.map((message, index) => {
          return (
            <div className="message" key={index}>
              {message.text}
            </div>
          )
        })}
      </div>
    )
  )
}
