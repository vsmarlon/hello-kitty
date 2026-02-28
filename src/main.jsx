import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HelloKittyCV from './hello-kitty-cv.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelloKittyCV />
  </StrictMode>,
)
