import { useState, useEffect, useContext } from 'react'
import Countdown from 'react-countdown';
import { countryDataContext } from '../Root';




function CapitalGame() {
  const [activeComponent, setActiveComponent] = useState('chooseGame');
  const [startingGame, setStartingGame] = useState(false);
  const [activeGame, setActiveGame] = useState(true)
  const [chosenCapitals, setChosenCapitals] = useState([])
  const [correctCapital, setCorrectCapital] = useState("")
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
    document.title = 'Guess the capital';
  }, []);

  useEffect(() => {
    getFourCapitals();
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
    const existingScoresString = localStorage.getItem('userScoresCapitals');
    const existingScores = existingScoresString ? JSON.parse(existingScoresString) : [];
    setLeaderboardData(existingScores);
  }, [userScore,activeGame]);






  const getFourCapitals = async () => {
    try {
      setActiveGame(true)
      if (countryData.length > 0) {
        const data = countryData;
        let capitals = []
        while (capitals.length < 4) {
          const randomNumber = Math.floor(Math.random() * data.length)
          let randomCountry = data[randomNumber]
          if (!capitals.some(capital => capital.name === randomCountry.name.common) && randomCountry.capital.length === 1) {
            capitals.push({
              name: randomCountry.name.common,
              capital: randomCountry.capital[0],
              flag: randomCountry.flags.svg
            })
          }
        }

        setChosenCapitals(capitals)

        setCorrectCapital(capitals[Math.floor(Math.random() * 4)])
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
      setIsGameOver(false);
      disableClick()
      setGameWillBegin(5)
      setGameTime(30)
      setStartingGame(true);
      setTimedGameSelected(true);
      setTimeout(() => {
        enableClick() 
        setActiveComponent(gamemode);
      }, 5000);
    }
  };


  const handleGuessClick = (capitalname, countryname) => {
    if (capitalname === correctCapital.capital) {
      disableClick()
      setUserScore(userScore + 100)
      setActiveGame(false)
      setGameResult("win")
      setTimeout(() => {
        enableClick()
        setGameResult(null)
        getFourCapitals();
      }, 3000);
    } else {
      disableClick()
      setUserScore(userScore - 50)
      setActiveGame(false)
      setUserClickedOn({
        capital: capitalname,
        country: countryname
      })
      setGameResult("lose")
      setTimeout(() => {
        enableClick()
        setGameResult(null)
        getFourCapitals();
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
      const existingScoresString = localStorage.getItem('userScoresCapitals');
      const existingScores = existingScoresString ? JSON.parse(existingScoresString) : [];
      const newScore = {
        username,
        score: userScore,
      };
      const updatedScores = [...existingScores, newScore];
      updatedScores.sort((a, b) => b.score - a.score);
      const top5Scores = updatedScores.slice(0, 5);
      const top5ScoresString = JSON.stringify(top5Scores);
      localStorage.setItem('userScoresCapitals', top5ScoresString);
    }

    setUserScore(0)
    setActiveComponent('chooseGame');
    console.log('game over');
  };






  return (
    <>
      <main>
        <h1>Guess the Capital</h1>

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
              <h2>Choose the capital of {correctCapital.name}</h2>
              <img className="capitalflag" src={correctCapital.flag} />
              <div className="options">
                {chosenCapitals.map((capital, index) => (
                  <p className="guessthecapital" key={capital.name} onClick={() => handleGuessClick(capital.capital, capital.name)}>{capital.capital}</p>
                ))}
              </div>
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
              <h2>Choose the capital of {correctCapital.name}</h2>
              <img className="capitalflag" src={correctCapital.flag} />
              <div className="options">
                {chosenCapitals.map((capital, index) => (
                  <p className="guessthecapital" key={capital.name} onClick={() => handleGuessClick(capital.capital, capital.name)}>{capital.capital}</p>
                ))}
              </div>
            </article>
          )}

        </>











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

            <p>Wrong, you clicked on <span className="wrongguess">{userClickedOn.capital}</span> capital of <span className="wrongguess">{userClickedOn.country}</span> </p>
            <p>The capital of <span className="correctanswer">{correctCapital.name}</span> is <span className="correctanswer">{correctCapital.capital}</span></p>
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

export default CapitalGame

