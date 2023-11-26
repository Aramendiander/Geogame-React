import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Countdown from 'react-countdown';




function CapitalGame() {
    const [activeGame, setActiveGame] = useState(true)
    const [chosenCapitals, setChosenCapitals] = useState([])
    const [correctCapital, setCorrectCapital] = useState("")
    const [loading, setLoading] = useState(true)
    const [countryData, setCountryData] = useState([])
    const [gameResult, setGameResult] = useState("")
    const [userClickedOn, setUserClickedOn] = useState('')
    const [userScore, setUserScore] = useState(() => {
        const score = localStorage.getItem("score");
        return score ? parseInt(score) : 0;
    });

    const getCountryData = async () => {
        try {
            const data = await fetch("https://restcountries.com/v3.1/independent?status=true");
            const results = await data.json();
            console.log("api called")
            setCountryData(results)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getCountryData();
        const score = localStorage.getItem("score");
        if (score) {
            setUserScore(parseInt(score));
        }
    }, []);

    useEffect(() => {
        getFourCapitals();
        setLoading(false)
    }, [countryData]);

    useEffect(() => {
        updateLocalStorage();
    }, [userScore]);

    const updateLocalStorage = () => {
        localStorage.setItem("score", userScore)
    }


    const getFourCapitals = async () => {
        try {
            setActiveGame(true)
            if (countryData.length > 0) {
                const data = countryData;
                let capitals = []
                while (capitals.length < 4) {
                    const randomNumber = Math.floor(Math.random() * data.length)
                    let randomCountry = data[randomNumber]
                    if (!capitals.some(capital => capital.name === randomCountry.name.common && randomCountry.capital.length === 1)) {
                        capitals.push({
                            name: randomCountry.name.common,
                            capital: randomCountry.capital,
                            flag: randomCountry.flags.svg
                        })
                    }
                }

                setChosenCapitals(capitals)
                
                setCorrectCapital(capitals[Math.floor(Math.random() * 4)])
                console.log(correctCapital.capital[0])
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleGuessClick = (capitalname) => {
        if (capitalname === correctCapital.capital) {
            setUserScore(userScore + 100)
            setActiveGame(false)
            setGameResult("win")
            setTimeout(() => {
                setGameResult(null)
                getFourCapitals();
            }, 3000);
        } else {
            setUserScore(userScore - 50)
            setActiveGame(false)
            setUserClickedOn(capitalname)
            setGameResult("lose")
            setTimeout(() => {
                setGameResult(null)
                getFourCapitals();
            }, 5000);
        }
    }

    return (
        <>
            <main>
                <h1>Guess the Capital</h1>
                <p>Score: {userScore}</p>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    activeGame ?
                        <article className="gamefield">
                            <h2>Choose the capital of {correctCapital.name}</h2>
                            <img className="capitalflag" src={correctCapital.flag} />
                            <div className="options">
                            {chosenCapitals.map((capital, index) => (
                              <p className="guessthecapital" key={capital.name} onClick={() => handleGuessClick(capital.capital)}>{capital.capital}</p>
                              ))}
                              </div>
                        </article>
                        : null
                )}

                {gameResult === 'win' && (
                    <div className="youwon">
                        <p>You guessed it right!</p>
                        <p>+100 points</p>
                        <div className="nextgame">
                            <p>Next game in: </p>
                            <Countdown className="countdown" date={Date.now() + 3000} />
                        </div>


                    </div>
                )}
                {gameResult === 'lose' && (
                    <div className="youmissed">
                        <p>Wrong, you clicked on <span className="wrongguess">{userClickedOn}</span> the correct capital was  </p>
                        <p>{correctCapital.capital[0]}</p>
                        <p>You missed! -50 points 😢</p>
                        <div className="nextgame">
                            <p>Next game in: </p>
                            <Countdown className="countdown" date={Date.now() + 5000} />
                        </div>
                    </div>
                )}
            </main>
        </>
    );

}

export default CapitalGame

