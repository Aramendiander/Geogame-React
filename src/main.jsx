import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App.jsx'
import FlagGame from './components/FlagGame.jsx';
import CapitalGame from './components/CapitalGame.jsx';
import Wiki from './components/Wiki.jsx';
import RouterConfig from './RouterConfig.jsx'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>,
)
