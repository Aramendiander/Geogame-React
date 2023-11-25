import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function CapitalGame() {
  const [activeComponent, setActiveComponent] = useState('')


  return (
    <>
      <main>
        
        <article>
          <h1>Guess the capital</h1>
        </article>
      </main>
    </>
  )
}

export default CapitalGame

