import { useState, useEffect, createContext, useContext } from 'react'
import FlagGame from './components/FlagGame'
import CapitalGame from './components/CapitalGame'
import Wiki from './components/Wiki'
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu'
import Home from './Home'

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
      <Menu />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/flag-guessing-game" element={<FlagGame />} />
        <Route path="/capital-guessing-game" element={<CapitalGame />} />
        <Route path="/learn-about-countries" element={<Wiki />} />
      </Routes>
    </>
  )
}

export default App
