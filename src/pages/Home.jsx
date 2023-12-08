import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Home() {
    const [activeComponent, setActiveComponent] = useState('')

    useEffect(() => {
        document.title = 'Geo Game';
        const ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        ogTitle.content = 'Geo Game - Your web app to learn and practice geography in a fun way.';
        document.getElementsByTagName('head')[0].appendChild(ogTitle);
        const ogDescription = document.createElement('meta')
        ogDescription.setAttribute('property', 'og:description');
        ogDescription.content = 'Geo Game is your website to learn and practice geography in a fun way. You can play games to guess the flag or the capital of a country, or you can learn about every country in the world.';
        document.getElementsByTagName('head')[0].appendChild(ogDescription);
        
      }, []);

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

