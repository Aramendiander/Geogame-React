import { useState, useEffect } from 'react'
import '../App.css'
import { useNavigate, Link } from 'react-router-dom';

function Wiki() {
  const [activeComponent, setActiveComponent] = useState('')
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <main>
        <article>
          <h1>Countries Wiki</h1>
        </article>
      </main>
    </>
  )
}

export default Wiki

