import { useState, useEffect, createContext, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FlagGame from './components/FlagGame'
import CapitalGame from './components/CapitalGame'
import Wiki from './components/Wiki'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const CountryDataContext = createContext();

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


  return (
    <>
      <nav>
        <Link to="/"><button>Home</button></Link>
        <Link to="/flag-guessing-game"><button>Guess the Flag</button></Link>
        <Link to="/capital-guessing-game"><button>Guess the Capital</button></Link>
        <Link to="/learn-about-countries"><button>Learn about Countries</button></Link>
      </nav>
        <main className="mainhome">
          <article className="homemenu">
            <h1>Geo Game</h1>
            <em>Now on React</em>
            <h2>Choose your game</h2>
            <div>
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
