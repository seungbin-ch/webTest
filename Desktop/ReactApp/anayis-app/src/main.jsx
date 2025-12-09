import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Problem1 from './Problem1.jsx'
import Problem2 from './Problem2.jsx'
import Problem3 from './Problem3.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Problem3 />
  </StrictMode>,
)
