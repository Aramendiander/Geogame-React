import { useState, useEffect, createContext, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FlagGame from './components/FlagGame'
import CapitalGame from './components/CapitalGame'
import Wiki from './components/Wiki'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const CountryDataContext = createContext();
const BackButtonContext = createContext();

function App() {
  const [activeComponent, setActiveComponent] = useState('Home')
  const [countryData, setCountryData] = useState([])


  useEffect(() => {
    getCountryData()
  }, []);


  const getCountryData = async () => {
    try {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const results = await data.json();
      return results;
    } catch (e) {
      console.error(e)
    }
  }

  const handleFlagGameClick = () => {
    setActiveComponent('FlagGame')
  }

  const handleCapitalGameClick = () => {
    setActiveComponent('CapitalGame')
  }

  const handleWikiClick = () => {
    setActiveComponent('Wiki')
  }

  const handleBackClick = () => {
    setActiveComponent('Home')
  }



  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'FlagGame':
        console.log("hola")
        return <FlagGame />;
      case 'CapitalGame':
        return <CapitalGame />;
      case 'Wiki':
        return <Wiki />;
      default:
        return null;
    }
  };

  return (
    <>
      <main className="mainhome">
        <article className="homemenu">
          <h1>Geo Game</h1>
          <em>Now on React</em>
          <h2>Choose your game</h2>
          <div>
            <a href="/flag-guessing-game">Test</a>
            <Link to="/flag-guessing-game">Flag Game </Link>
            <Link to="/capital-guessing-game">Capital Game </Link>
            <Link to="/learn-about-countries">Wiki </Link>
          </div>
        </article>
      </main>


    </>
  )
}

export default App
