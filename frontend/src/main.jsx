import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Toaster position="top-right" />
      <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
