import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Wiki() {
  const [activeComponent, setActiveComponent] = useState('')


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

