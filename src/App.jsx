import { useState, useEffect, createContext, useContext } from 'react'
import FlagGame from './components/FlagGame'
import CapitalGame from './components/CapitalGame'
import Wiki from './components/Wiki'
import { Route, Routes, useLocation } from 'react-router-dom';
import Menu from './components/Menu'
import Home from './Home'

export const CountryDataContext = createContext([]);


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
      setCountryData(results)
    } catch (e) {
      console.error(e)
    }
  }

  const addComponentNameToBody = () => {
    const location = useLocation().pathname
    console.log(location)
    if (location === '/') {
      document.querySelector("body").className = "home"
    } else {
      document.querySelector("body").className = `${location.substring(1)}`
    }
  }


  return (
    <>
      <CountryDataContext.Provider value={countryData}>
        <Menu />
        {addComponentNameToBody()}
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/flag-guessing-game" element={<FlagGame />} />
          <Route path="/capital-guessing-game" element={<CapitalGame />} />
          <Route path="/learn-about-countries" element={<Wiki />} />
        </Routes>
      </CountryDataContext.Provider>
    </>
  )
}

export default App
/* export { CountryDataContext } */