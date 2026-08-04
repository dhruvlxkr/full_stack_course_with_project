import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Moneystate from './context/Moneystate.jsx'

createRoot(document.getElementById('root')).render(

    <Moneystate>
      <App />
    </Moneystate>
)
