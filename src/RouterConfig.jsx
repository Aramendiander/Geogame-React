import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App.jsx';
import FlagGame from './components/FlagGame.jsx';
import CapitalGame from './components/CapitalGame.jsx';
import Wiki from './components/Wiki.jsx';

const routes = [
  {
    path: '/',
    exact: true,
    component: App,
  },
  {
    path: '/flag-guessing-game',
    exact: true,
    component: FlagGame,
  },
  {
    path: '/capital-guessing-game',
    exact: true,
    component: CapitalGame,
  },
  {
    path: '/learn-about-countries',
    exact: true,
    component: Wiki,
  },
];

const RouterConfig = () => (
    <Router>
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="/flag-guessing-game" element={<FlagGame />} />
      <Route path="/capital-guessing-game" element={<CapitalGame />} />
      <Route path="/learn-about-countries" element={<Wiki />} />
    </Routes>
  </Router>
);

export default RouterConfig;