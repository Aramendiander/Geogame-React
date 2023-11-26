import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { CountryDataContext } from '../App'

function Wiki() {
  const [activeComponent, setActiveComponent] = useState('')

  const countryData = useContext(CountryDataContext)

  return (
    <>
      <main>
          <h1>Countries Wiki</h1>
        <article>
        </article>
      </main>
    </>
  )
}

export default Wiki

