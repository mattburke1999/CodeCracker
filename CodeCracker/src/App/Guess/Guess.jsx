import styles from './Guess.module.css';

export default function Guess({guessCount, handleClick, correct, guess, setGuess}) {

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            handleClick(true);
        }
    }

    return (
        <div className={styles.guess}>
            <i className={`fa-solid fa-${correct ? 'check' : 'xmark'}`} style={{display: guessCount>0 ? 'block' : 'none', color: correct ? 'green' : 'red'}}></i>
            <button onClick={() => handleClick(false)}>{correct ? 'Play Again' : 'Guess'}</button>
            <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)} onKeyDown={keyDownHandler} readOnly={correct}/>
        </div>
    )
}