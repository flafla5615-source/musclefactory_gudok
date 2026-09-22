import React from 'react'
import ReactDOM from 'react-dom/client'
import TermsPage from '../pages/TermsPage.jsx'
import '../index.css'

document.body.classList.add('doc-page')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TermsPage />
  </React.StrictMode>,
)
