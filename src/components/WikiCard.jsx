import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { CountryDataContext } from '../Root'

function Wiki(country) {
  const [countryData, setCountryData] = useState([])

  
  return (
    <>
      <main>
        <h1>Countries Wiki</h1>
        <article>
          {countryData.map((country, index) => (
            <div key={country.name.common} className="countrycard">
              <p>{country.name.common}</p>
              <img src={country.flags.svg} alt="" />
              <p className="wikicapital">{country.capital.map((capital) => <span>{capital}</span>)}</p>
              <p>Continent: {country.region}</p>
              {console.log(country)}
              {/* <p className="languages">{country.languages.map((language) => <span>{language}</span>)}</p> */}
            </div>
          ))}
        </article>
      </main>
    </>
  )
}

export default Wiki

