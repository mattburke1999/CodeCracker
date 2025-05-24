import { useState, useEffect } from 'react'

import { getCode } from './utils'

import HintContainer from './HintContainer/HintContainer'
import Logo from './Logo'
import Guess from './Guess/Guess'
import ModeSelector from './ModeSelector/ModeSelector'

function App() {

    const modes = ['Easy', 'Normal', 'Hard'];
    
    const [code, setCode] = useState([]);
    const [guessCount, setGuessCount] = useState(0);
    const [guess, setGuess] = useState('');
    const [correct, setCorrect] = useState(0);
    const [mode, setMode] = useState(modes[1]); 

    const resetCode = () => {
        const code = getCode();
        setCode(code);
    }

    const changeMode = (newMode) => {
        setMode(newMode);
        playAgain();
    }

    const playAgain = () => {
        resetCode();
        setGuessCount(0);
        setGuess('');
        setCorrect(0);
    }

    const giveUp = () => {
        setCorrect(2)
        setGuess(code.join(''));
    }

    const makeGuess = () => {
        if (guess === code.join('')) {
            setCorrect(1);
        } else {
            setGuess('');
        }
        setGuessCount(guessCount+1);
    }

    const handleClick = (keydown) => {
        if (!correct) {
            makeGuess();
        } else if (!keydown) {
            playAgain();
        }
    }

    const styles = {
        mainStyles: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '100%',
            gap: '1rem',
            paddingTop: '2rem',
        },
        guessCountStyles: {
            margin: 0,
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
        },
        actionsStyles: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '.5rem'
        }
    }


    useEffect(() => {
        resetCode();
    }, [])

    return (
        <div style={styles.mainStyles}>
            <Logo />
            <h2 style={styles.guessCountStyles}>Guesses: {guessCount}</h2>
            <ModeSelector modes={modes} mode={mode} changeMode={changeMode}/>
            <HintContainer code={code} mode={mode}/>
            <Guess guessCount={guessCount} handleClick={handleClick} correct={correct} guess={guess} setGuess={setGuess} playAgain={playAgain} giveUp={giveUp}/>
        </div>
    )
}

export default App
