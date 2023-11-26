import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';




function FlagGame() {
    const [activeComponent, setActiveComponent] = useState('')
    const [chosenFlags, setChosenFlags] = useState([])
    const [correctFlag, setCorrectFlag] = useState("")
    const [loading, setLoading] = useState(true)
    const [countryData, setCountryData] = useState([])
    const [gameResult, setGameResult] = useState("")
    const [userClickedOn, setUserClickedOn] = ('')

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
        getFourFlags();
        setLoading(false)
    }, [countryData]);
    
    



    useEffect(() => {
        getCountryData();
    }, []);


    const getFourFlags = async () => {
        try {
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

                setCorrectFlag(flags[Math.floor(Math.random() * 4)].name)
            }
        } catch (e) {
            console.log(e)
        }
    }


    const handleGuessClick = (flagname) => {
        if (flagname === correctFlag) {
            setGameResult("win")
            setTimeout(() => {
                setGameResult(null)
                getFourFlags();
            }, 5000);
        } else {
            setGameResult("lose")
            console.log(gameResult)
            setTimeout(() => {
                setGameResult(null)
                getFourFlags();
            }, 5000);
            console.log("wrong, you clicked the flag of " + flagname)
        }
    }


    return (
        <>
            <main>
                <h1>Guess the Flag</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <article className="gamefield">
                        <h2>Choose the flag of {correctFlag}</h2>
                        {chosenFlags.map((flag, index) => (
                            <img className="guesstheflag" key={flag.name} src={flag.flag} onClick={() => handleGuessClick(flag.name)}></img>
                        ))}

                        {gameResult === 'win' && (
                            <div className="acertaste">
                                <p>Has acertado</p>
                            </div>
                        )}
                        {gameResult === 'lose' && (
                            <div className="fallaste">
                                <p>Wrong, you clicked on </p>
                            </div>
                        )}


                    </article>
                )}
            </main>
        </>
    );
}

export default FlagGame

