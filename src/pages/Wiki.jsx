import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { countryDataContext } from '../Root'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Wiki() {
  const {countryData} = useContext(countryDataContext)
  const [activeCountry, setActiveCountry] = ""


  useEffect(() => {
    AOS.init();
  }, [])




  return (
    <>
      <main>
        <h1>Countries Wiki</h1>
        <article className="wikigrid">
          {countryData.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country, index) => (
            <div data-aos="fade-up" key={index} className="countrycard">
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

