import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Roots from './Router.jsx'
import { AppProvider } from './contexts/AppProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Roots />
    </AppProvider>
  </StrictMode>,
)

