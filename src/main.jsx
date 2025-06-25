// CRITICAL: Import lighthouse optimizer FIRST to intercept animations before components load
import './utils/lighthouseOptimizer.js'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import './styles/globals.css'
import { ScrollProvider } from './context/ScrollContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <ScrollProvider>
        <App />
      </ScrollProvider>
    </BrowserRouter>
  </HelmetProvider>
)
