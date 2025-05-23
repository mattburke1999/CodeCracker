import { useState, useEffect } from 'react'

import { getCode } from './utils'

import HintContainer from './HintContainer/HintContainer'
import Logo from './Logo'
import Guess from './Guess/Guess'

function App() {

    
    const [code, setCode] = useState([]);
    const [guessCount, setGuessCount] = useState(0);
    const [guess, setGuess] = useState('');
    const [correct, setCorrect] = useState(false);

    const resetCode = () => {
        const code = getCode();
        setCode(code);
    }

    const playAgain = () => {
        resetCode();
        setGuessCount(0);
        setGuess('');
        setCorrect(false);
    }

    const makeGuess = () => {
        if (guess === code.join('')) {
            setCorrect(true);
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

    const mainStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        gap: '1rem'
    }

    const guessCountStyles = {
        margin: 0,
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '0.5rem 1rem'
    }


    useEffect(() => {
        resetCode();
    }, [])

    return (
        <div style={mainStyles}>
            <Logo />
            <h2 style={guessCountStyles}>Guesses: {guessCount}</h2>
            <HintContainer code={code}/>
            <Guess guessCount={guessCount} handleClick={handleClick} correct={correct} guess={guess} setGuess={setGuess}/>
        </div>
    )
}

export default App
