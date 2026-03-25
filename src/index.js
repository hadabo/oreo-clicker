import React from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/game.css'
import './assets/style/themes.css'
import './assets/style/effects.css'
import Oreo from './Game'
import { ThemeProvider } from './context/ThemeContext'
import { SettingsProvider } from './context/SettingsContext'
import * as serviceWorker from './serviceWorker'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <ThemeProvider>
        <Oreo />
      </ThemeProvider>
    </SettingsProvider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
