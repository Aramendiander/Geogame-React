import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { countryDataContext } from '../Root'
import CountryCard from '../components/CountryCard';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Wiki() {
  const { countryData } = useContext(countryDataContext);
  const [activeCountry, setActiveCountry] = useState(null);



  useEffect(() => {
    AOS.init();
  }, [])


  const sortedData = countryData.sort((a, b) => a.name.common.localeCompare(b.name.common))

  const handleCardClick = (country) => {
    setActiveCountry(country)
  }

  console.log(activeCountry)



  return (
    <>
      <main>
        <h1>Countries Wiki</h1>
        <article className="wikigrid">
          {activeCountry && (
            <p>hola {activeCountry.name.common}</p>
          )}
          {sortedData.map((country, index) => (
            <CountryCard key={index} country={country} index={index} onClick={handleCardClick} />
          ))}
        </article>
      </main>
    </>
  )
}

export default Wiki

