import { useState } from "react"


const CountryCard = ({country, index, onClick}) => {




    return (
        <div key={index} data-aos="fade-up" className="countrycard" onClick={() => onClick(country)}>
            <h2 key={country.name.common}>{country.name.common}</h2>
            <img key={country.flags.svg} src={country.flags.svg} alt="" />
            <p key={"capital"+country.capital} className="wikicapital">{country.capital.map((capital, index) => <span key={index}>Capital: {capital} </span>)}</p>
        </div>
    )
}

export default CountryCard