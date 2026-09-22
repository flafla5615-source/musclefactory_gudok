import React from 'react'
import ReactDOM from 'react-dom/client'
import SupportPage from '../pages/SupportPage.jsx'
import '../index.css'

document.body.classList.add('doc-page')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupportPage />
  </React.StrictMode>,
)
