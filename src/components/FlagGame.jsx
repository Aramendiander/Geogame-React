import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { CountryDataContext } from '../App'



function FlagGame() {
    const [activeComponent, setActiveComponent] = useState('')
    
    const countryData = useContext(CountryDataContext)
    
    return (
        <>

            <main>
                <article>
                    <h1>Guess the Flag</h1>
                </article>
            </main>
        </>
    )
}

export default FlagGame

