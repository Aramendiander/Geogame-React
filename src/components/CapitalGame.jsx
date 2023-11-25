import { useState, useEffect } from 'react'
import '../App.css'
import { useNavigate, Link } from 'react-router-dom';

function CapitalGame() {
  const [activeComponent, setActiveComponent] = useState('')

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };


  return (
    <>
    <nav>
        <button onClick={handleGoBack}>Go Back</button>
    </nav>
    <nav>
        <Link to="/">Home</Link>
    </nav>
      <main>
        
        <article>
          <h1>Guess the capital</h1>
        </article>
      </main>
    </>
  )
}

export default CapitalGame

