import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Home() {
    const [activeComponent, setActiveComponent] = useState('')

    return (
        <>
            <main>
                <article className="selectgame">
                    <h1>Geo Game</h1>
                    <em>Now on React</em>
                    <h2>Choose your game</h2>
                    <div className="games">
                        <Link className="left" to="/flag-guessing-game">Flag Guessing Game</Link>
                        <Link className="right" to="/capital-guessing-game">Capital Guessing Game</Link>
                    </div>
                    <em>Or</em>
                    <h2>Learn about countries</h2>
                    <Link className="bottom" to="/learn-about-countries">Learn about countries</Link>
                </article>
            </main>
        </>
    )
}

export default Home

