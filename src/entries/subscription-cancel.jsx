import React from 'react'
import ReactDOM from 'react-dom/client'
import SubscriptionCancelPage from '../pages/SubscriptionCancelPage.jsx'
import '../index.css'

document.body.classList.add('doc-page')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SubscriptionCancelPage />
  </React.StrictMode>,
)
