import React from 'react'
import ReactDOM from 'react-dom/client'
import PrivacyPage from '../pages/PrivacyPage.jsx'
import '../index.css'

document.body.classList.add('doc-page')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrivacyPage />
  </React.StrictMode>,
)
