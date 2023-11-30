import moment from "moment"

const MoreInfoCard = ({ country, index, onClick }) => {

  const getCurrentTime = (timezone) => {
    let offset = parseInt(timezone.replace('UTC', ''));
    return moment.utc().add(offset, 'hours').format('HH:mm:ss');

  }

  return (
    <div className="moreinfo">
      <h2>{country.name.common}</h2>
      <p>Official name: {country.name.official}</p>
      <img src={country.flags.svg} alt="" />
      <p>Continent: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      <p className="languages"> Languages:
        {Object.entries(country.languages).map(([key, value]) => (
          <span className="singlelanguage" key={key}>{' ' + value + ' '}</span>
        ))}
      </p>
      <p>Population: {country.population}</p>
      <p className="timezones"> Timezones:
        {Object.entries(country.timezones).map(([key, value]) => (
          <span className="singleTimezone" key={key}>{' ' + getCurrentTime(value) + ', '}</span>
        ))}
        </p>
        <p className="currencies"> Currencies:
    {Object.entries(country.currencies).map(([currency, value]) => (

            <span key={value.name}>{' '+value.name}</span>

    ))}
</p>


    </div>
  )
}

export default MoreInfoCard