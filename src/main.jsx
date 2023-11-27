import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom';
import {  } from 'react-router-dom';
/* import App from './App.jsx' */
import FlagGame from './pages/FlagGame.jsx';
import CapitalGame from './pages/CapitalGame.jsx';
import Wiki from './pages/Wiki.jsx';
import Menu from './components/Menu.jsx';
import './index.css'
import router from './components/Router.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   {/*  <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <RouterProvider router={router} />

  </React.StrictMode>,
)
