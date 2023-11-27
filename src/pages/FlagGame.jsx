import { useState, useEffect, useContext } from 'react'
import Countdown from 'react-countdown';
import { countryDataContext } from '../Root';



function FlagGame() {
    const [activeGame, setActiveGame] = useState(true)
    const [chosenFlags, setChosenFlags] = useState([])
    const [correctFlag, setCorrectFlag] = useState("")
    const [loading, setLoading] = useState(true)
    const {countryData} = useContext(countryDataContext)
    const [gameResult, setGameResult] = useState("")
    const [userClickedOn, setUserClickedOn] = useState('')
    const [userScore, setUserScore] = useState(() => {
        const score = localStorage.getItem("score");
        return score ? parseInt(score) : 0;
    });

    useEffect(() => {
        const score = localStorage.getItem("score");
        if (score) {
            setUserScore(parseInt(score));
        }
    }, []);

    useEffect(() => {
        getFourFlags();
        setLoading(false)
    }, [countryData]);

    useEffect(() => {
        updateLocalStorage();
    }, [userScore]);

    const updateLocalStorage = () => {
        localStorage.setItem("score", userScore)
    }


    const getFourFlags = async () => {
        try {
            setActiveGame(true)
            if (countryData.length > 0) {
                const data = countryData;
                let flags = []
                while (flags.length < 4) {
                    const randomNumber = Math.floor(Math.random() * data.length)
                    let randomCountry = data[randomNumber]
                    if (!flags.some(flag => flag.name === randomCountry.name.common)) {
                        flags.push({
                            name: randomCountry.name.common,
                            flag: randomCountry.flags.svg
                        })
                    }
                }

                setChosenFlags(flags)

                setCorrectFlag(flags[Math.floor(Math.random() * 4)])
            }
        } catch (e) {
            console.log(e)
        }
    }


    const handleGuessClick = (flagname) => {
        if (flagname === correctFlag.name) {
            setUserScore(userScore + 100)
            setActiveGame(false)
            setGameResult("win")
            setTimeout(() => {
                setGameResult(null)
                getFourFlags();
            }, 3000);
        } else {
            setUserScore(userScore - 50)
            setActiveGame(false)
            setUserClickedOn(flagname)
            setGameResult("lose")
            setTimeout(() => {
                setGameResult(null)
                getFourFlags();
            }, 5000);
        }
    }

    return (
        <>
            <main>
                <h1>Guess the Flag</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    activeGame ?
                        <article className="gamefield">
                            <h2>Choose the flag of {correctFlag.name}</h2>
                            {chosenFlags.map((flag, index) => (
                                <div key={flag.name} className='singleflag'>
                                    <img className="guesstheflag" key={flag.name} src={flag.flag} onClick={() => handleGuessClick(flag.name)}></img>
                                </div>
                            ))}
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
                        <p>Wrong, you clicked on <span className="wrongguess">{userClickedOn}</span> the correct flag was  </p>
                        <img className="correctflag" src={correctFlag.flag} alt="" />
                        <p>You missed! -50 points 😢</p>
                        <div className="nextgame">
                            <p>Next game in: </p>
                            <Countdown className="countdown" date={Date.now() + 5000} />
                        </div>
                    </div>
                )}
                <h2 className='leaderboards'>Leaderboards:</h2>
            <div className='postit'>
                <p className='scoretitle'>Score:</p>
                <p className='score'>User: <b>{userScore}</b> points</p>
            </div>
            </main>
        </>
    );

}

export default FlagGame

