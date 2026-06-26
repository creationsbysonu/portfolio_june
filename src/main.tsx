import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ResumePage from './ResumePage.tsx'

const path = window.location.pathname

if (path === '/resume' || path === '/resume/') {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ResumePage />
    </StrictMode>,
  )
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
