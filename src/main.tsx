import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CampaignProvider } from './pages/CampaignsList'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CampaignProvider>
        <App />
      </CampaignProvider>
    </BrowserRouter>
  </StrictMode>,
)
