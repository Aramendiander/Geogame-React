import { useState, useEffect } from 'react'
import '../App.css'
import { useNavigate, Link } from 'react-router-dom';

function FlagGame() {
  const [activeComponent, setActiveComponent] = useState('')
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };


  return (
    <>
      <main>
        <button onClick={handleGoBack}>Go Back</button>
        <Link to="/capital-guessing-game">Capital</Link>
        <article>
          <h1>Guess the Flag</h1>
        </article>
      </main>
    </>
  )
}

export default FlagGame

