import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function FlagGame() {
    const [activeComponent, setActiveComponent] = useState('')

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

