import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/fonts/Nunito-Regular.ttf'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
