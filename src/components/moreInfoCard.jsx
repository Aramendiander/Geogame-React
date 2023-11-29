const MoreInfoCard = ({ country, index, onClick }) => {


  console.log(country.languages)

  return (
    <div className="moreinfo">
      <h2>{country.name.common}</h2>
      <p>Official name: {country.name.official}</p>
      <p>Continent: {country.region}</p>
      <p className="languages"> Languages:
        {Object.entries(country.languages).map(([key, value]) => (
          <span className="singlelanguage" key={key}>{' ' + value + ' '}</span>
        ))}
      </p>
      <p>Population: {country.population}</p>
      <img src={country.flags.svg} alt="" />

    </div>
  )
}

export default MoreInfoCard