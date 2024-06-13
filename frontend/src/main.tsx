import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx';
import LoadingProvider from './context/Loading.tsx';
import { Toaster } from './components/ui/toaster.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingProvider>
      <App />
      <Toaster />
    </LoadingProvider>
  </React.StrictMode>,
)
