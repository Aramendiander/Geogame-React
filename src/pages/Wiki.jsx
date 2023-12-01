import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { countryDataContext } from '../Root'
import CountryCard from '../components/CountryCard';
import MoreInfoCard from '../components/moreInfoCard';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Wiki() {
  const { countryData } = useContext(countryDataContext);
  const [activeCountry, setActiveCountry] = useState(null);
  const [searchState, setSearchState] = useState('');
  const [randomFlag, setRandomFlag] = useState('')

  useEffect(() => {
    document.title = 'Wiki';
    AOS.init();
    randomFlagEmoji()
  }, []);

  useEffect(() => {
  }, [])




  const sortedData = countryData.sort((a, b) => a.name.common.localeCompare(b.name.common))

  const handleCardClick = (event, country) => {
    event.stopPropagation();
    setActiveCountry(country)
    const body = document.querySelector('body')
    body.classList.add("blur")
    body.addEventListener('click', () => {
      setActiveCountry(null)
      body.classList.remove("blur")
      console.log('hola')
    })
  }

  const randomFlagEmoji = () => {
    const randomNumber = Math.floor(Math.random() * countryData.length)
    setRandomFlag(countryData[randomNumber].flag)
  }


  const filterSearch = sortedData.filter((country) =>
  country.name.common.toLowerCase().includes(searchState.toLowerCase())
);

  return (
    <>
      <main>
        <h1>Countries Wiki</h1>
        <div className="search">
            <input
              type="text"
              placeholder="Search country"
              value={searchState}
              onChange={(e) => setSearchState(e.target.value)}
            />
          </div>
        <article className="wikigrid">
          {activeCountry && (
            <MoreInfoCard country={activeCountry} />
          )}
          {filterSearch.map((country, index) => (
            <CountryCard key={index} country={country} index={index} onClick={handleCardClick} />
          ))}
        </article>
      </main>
      <a id="up" href="#">Go up {randomFlag}</a>
    </>
  )
}

export default Wiki

