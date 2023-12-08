import { useState, useEffect, useContext } from 'react'
import Countdown from 'react-countdown';
import { countryDataContext } from '../Root';



function FlagGame() {
    const [activeComponent, setActiveComponent] = useState('chooseGame');
    const [startingGame, setStartingGame] = useState(false);
    const [activeGame, setActiveGame] = useState(true)
    const [chosenFlags, setChosenFlags] = useState([])
    const [correctFlag, setCorrectFlag] = useState("")
    const [loading, setLoading] = useState(true)
    const { countryData } = useContext(countryDataContext)
    const [gameResult, setGameResult] = useState("")
    const [timedGameSelected, setTimedGameSelected] = useState(false);
    const [userClickedOn, setUserClickedOn] = useState('')
    const [gameWillBegin, setGameWillBegin] = useState(5)
    const [gameTime, setGameTime] = useState(30)
    const [userScore, setUserScore] = useState(() => {
        const score = localStorage.getItem("score");
        return score ? parseInt(score) : 0;
    });
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isGameOver, setIsGameOver] = useState(true)


    useEffect(() => {
        document.title = 'Guess the flag';
        const ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        ogTitle.content = 'Guess the Flag - Geo Game';
        document.getElementsByTagName('head')[0].appendChild(ogTitle);
        const ogDescription = document.createElement('meta')
        ogDescription.setAttribute('property', 'og:description');
        ogDescription.content = 'Guess the Flag! A fun game to test your knowledge about the world\'s countries flags.';
        document.getElementsByTagName('head')[0].appendChild(ogDescription);
      }, []);


    useEffect(() => {
        getFourFlags();
        setLoading(false)
        setActiveComponent('chooseGame')
    }, [countryData]);


    // Game will begin countdown
    useEffect(() => {
        if (startingGame && gameWillBegin > 0 && activeGame) {
            const countdownInterval = setInterval(() => {
                setGameWillBegin(prevCount => prevCount - 1);
            }, 1000);

            if (gameWillBegin === 0) {
                setStartingGame(false);
            }

            return () => clearInterval(countdownInterval);
        }
    }, [startingGame, gameWillBegin, activeGame]);


    //Game time counter
    useEffect(() => {
        if (gameWillBegin === 0 && activeGame && !isGameOver) {
            const gameLengthCountdownInterval = setInterval(() => {
                setGameTime(gameTime - 1);
            }, 1000);

            return () => clearInterval(gameLengthCountdownInterval);
        }
    }, [startingGame, gameWillBegin, gameTime, activeGame]);


    //Game over handler
    useEffect(() => {
        if (gameTime < 0 && activeGame && timedGameSelected) {
            gameOver();
        }
    }, [gameTime, activeGame, timedGameSelected]);


    //Real time leaderboard update
    useEffect(() => {
        const existingScoresString = localStorage.getItem('userScoresFlags');
        const existingScores = existingScoresString ? JSON.parse(existingScoresString) : [];
        setLeaderboardData(existingScores);
    }, [userScore,activeGame]);



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

    const disableClick = () => {
        const body = document.querySelector('body')
          body.classList.add('disableclicks') 
      }
      
      const enableClick = () => {
        const body = document.querySelector('body')
          body.classList.remove('disableclicks') 
      }


    const handleGameModeClick = (gamemode) => {
        if (gamemode === 'infinite') {
            setActiveComponent(gamemode);
            setTimedGameSelected(false);
        } else if (gamemode === 'timed') {
            setIsGameOver(false)
            disableClick()
            setGameWillBegin(5)
            setGameTime(30)
            setStartingGame(true);
            setTimedGameSelected(true);
            setTimeout(() => {
                enableClick();
                setActiveComponent(gamemode);
            }, 5000);
        }
    };





    const handleGuessClick = (flagname) => {
        if (flagname === correctFlag.name) {
            disableClick()
            setUserScore(userScore + 100)
            setActiveGame(false)
            setGameResult("win")
            setTimeout(() => {
                enableClick()
                setGameResult(null)
                getFourFlags();
            }, 3000);
        } else {
            disableClick()
            setUserScore(userScore - 50)
            setActiveGame(false)
            setUserClickedOn(flagname)
            setGameResult("lose")
            setTimeout(() => {
                enableClick()
                setGameResult(null)
                getFourFlags();
            }, 5000);
        }
    }






    const gameOver = () => {
        setIsGameOver(true)
        setGameTime(30)
        let username = window.prompt('Please insert your name (Max 10 characters', 'User');

        if (username === null) {
            alert('You clicked Cancel. Using default username: ' + 'User');
            username = 'User';
        }

        if (username.length > 10) {
            alert('Name is too long. Please enter a name with up to 10 characters.');
            gameOver()
        } else if (username.length == 0) {
            alert('Please enter a name.');
            gameOver()
        }
        else if (username) {
            const existingScoresString = localStorage.getItem('userScoresFlags');
            const existingScores = existingScoresString ? JSON.parse(existingScoresString) : [];
            const newScore = {
                username,
                score: userScore,
            };
            const updatedScores = [...existingScores, newScore];
            updatedScores.sort((a, b) => b.score - a.score);
            const top5Scores = updatedScores.slice(0, 5);
            const top5ScoresString = JSON.stringify(top5Scores);
            localStorage.setItem('userScoresFlags', top5ScoresString);
        }

        setUserScore(0)
        setActiveComponent('chooseGame');
        console.log('game over');
    };

    return (
        <>
            <main>
                <h1>Guess the Flag</h1>

                <>
                    {/* Choose game mode */}
                    {activeComponent === 'chooseGame' && (
                        <div className='choosegame'>
                            <p>Choose your game</p>
                            <div>
                                <button className="choosegamemode left" onClick={() => handleGameModeClick("infinite")} >Infinite mode</button>
                                <button className="choosegamemode right" onClick={() => handleGameModeClick("timed")} >Time trial</button>
                            </div>
                        </div>
                    )}



                    {/* Infinite game component */}
                    {activeComponent === 'infinite' && (
                        <article className="gamefield">
                            <p></p>
                            <h2>Choose the flag of {correctFlag.name}</h2>
                            {chosenFlags.map((flag, index) => (
                                <div key={flag.name} className='singleflag'>
                                    <img className="guesstheflag" key={flag.name} src={flag.flag} onClick={() => handleGuessClick(flag.name)}></img>
                                </div>
                            ))}
                        </article>
                    )}





                    {/* Timed game component */}

                    {gameWillBegin > 0 && startingGame && (
                        <p className="starting">Game will begin in {gameWillBegin} </p>
                    )}

                    {activeComponent === 'timed' && (
                        <article className="gamefield">
                            <div className="timeleft">
                            <p>Time left: {gameTime}</p>
                            </div>
                            <h2>Choose the flag of {correctFlag.name}</h2>
                            {chosenFlags.map((flag, index) => (
                                <div key={flag.name} className='singleflag'>
                                    <img className="guesstheflag" key={flag.name} src={flag.flag} onClick={() => handleGuessClick(flag.name)}></img>
                                </div>
                            ))}
                        </article>
                    )}

                </>



                {/* Game results */}

                {gameResult === 'win' && (
                    <div className="youwon">
                        <p>You guessed it right!</p>
                        {activeComponent === 'timed' && (
                            <p>+100 points</p>
                        )}
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
                        {activeComponent === 'timed' && (
                            <p>You missed! -50 points 😢</p>
                        )}
                        <div className="nextgame">
                            <p>Next game in: </p>
                            <Countdown className="countdown" date={Date.now() + 5000} />
                        </div>
                    </div>
                )}



                {/* Leaderboards */}
                <h2 className='leaderboards'>Leaderboards:</h2>
                <div className='postit'>
                    <p className='scoretitle'>Score:</p>
                    {leaderboardData.length > 0 && (
                        <ol>
                            {leaderboardData.map((entry, index) => (
                                <li key={index}>
                                    <span className='leaderboard-username'>{entry.username + ': '}</span>
                                    <span className='leaderboard-score'>{entry.score} points</span>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </main>
        </>
    );

}

export default FlagGame

