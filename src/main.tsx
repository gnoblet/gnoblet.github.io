import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/fonts/Nunito-Regular.ttf'
// Import theme styles to ensure they're loaded
import './styles/theme/index.css'
import './styles/theme/palette-blue.css'
import './styles/theme/palette-autumn.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
