import { useState, useEffect, createContext, useContext } from 'react'
import FlagGame from './pages/FlagGame'
import CapitalGame from './pages/CapitalGame'
import Wiki from './pages/Wiki'
import { Route, Routes, useLocation, Outlet } from 'react-router-dom';
import Menu from './components/Menu'
import Home from './pages/Home'

export const CountryDataContext = createContext([]);


function App() {
  const [activeComponent, setActiveComponent] = useState('Home')
  const [countryData, setCountryData] = useState([])




  /*   const getCountryData = async () => {
      try {
        const data = await fetch("https://restcountries.com/v3.1/independent?status=true");
        const results = await data.json();
        setCountryData(results)
      } catch (e) {
        console.error(e)
      }
    } */

  const addComponentNameToBody = () => {
    const location = useLocation().pathname
    if (location === '/') {
      document.querySelector("body").className = "home"
    } else {
      document.querySelector("body").className = `${location.substring(1)}`
    }
  }


  return (
    <>
      <Menu />
      <Outlet />
      {addComponentNameToBody()}

      
    </>
  )
}

export default App