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
            <nav>
                <button onClick={handleGoBack}>Go Back</button>
            </nav>
            <main>
                <article>
                    <h1>Guess the Flag</h1>
                </article>
            </main>
        </>
    )
}

export default FlagGame

