import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ResumePage from './ResumePage.tsx'
import ApplicationPage from './ApplicationPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/application/:number" element={<ApplicationPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
