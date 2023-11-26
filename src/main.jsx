import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom';
import {  } from 'react-router-dom';
import App from './App.jsx'
import FlagGame from './components/FlagGame.jsx';
import CapitalGame from './components/CapitalGame.jsx';
import Wiki from './components/Wiki.jsx';
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
