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
    const ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        ogTitle.content = 'Learn about the countries of the world - Geo Game';
        document.getElementsByTagName('head')[0].appendChild(ogTitle);
        const ogDescription = document.createElement('meta')
        ogDescription.setAttribute('property', 'og:description');
        ogDescription.content = 'Learn about every country in the world. Flags, capitals, languages, population, area, currency, and more.';
        document.getElementsByTagName('head')[0].appendChild(ogDescription);
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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


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
      <div id="up" onClick={handleScrollToTop}>Go up {randomFlag}</div>
    </>
  )
}

export default Wiki

