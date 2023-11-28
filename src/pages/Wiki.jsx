import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { countryDataContext } from '../Root'

function Wiki() {
  const [countryData, setCountryData] = useState([])


  useEffect(() => {
    getCountryData()
  }, [])

  const getCountryData = async () => {
    try {
      const data = await fetch("https://restcountries.com/v3.1/independent?status=true");
      const results = await data.json();
      console.log("api called")
      setCountryData(results)
    } catch (e) {
      console.error(e)
    }
  }


  return (
    <>
      <main>
        <h1>Countries Wiki</h1>
        <article className="wikigrid">
          {countryData.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country, index) => (
            <div key={index} className="countrycard">
              <h2 key={"country " + country.name.common}>{country.name.common}</h2>
              <img key={country.flags.svg} src={country.flags.svg} alt="" />
              <p key={country.capital} className="wikicapital">{country.capital.map((capital, index) => <span key={index}>Capital: {capital} </span> )}</p>
             {/*  <p key={country.region} >Continent: {country.region}</p> */}
              {/* <p className="languages">{country.languages.map((language) => <span>{language}</span>)}</p> */}
            </div>
          ))}
        </article>
      </main>
    </>
  )
}

export default Wiki

