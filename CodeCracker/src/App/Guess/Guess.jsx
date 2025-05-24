import styles from './Guess.module.css';

export default function Guess({guessCount, handleClick, correct, guess, setGuess, playAgain, giveUp}) {

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            handleClick(true);
        }
    }

    return (
        <div className={styles.guess}>
            <button onClick={giveUp} style={{display: correct ? 'none' : 'flex' }}><i class="fa-solid fa-thumbs-down"></i><span>Give Up</span></button>
            <button onClick={playAgain}><i class="fa-solid fa-rotate-right"></i><span>Restart</span></button>
            <button onClick={() => handleClick(false)} style={{display: correct ? 'none' : 'flex' }}><i class="fa-solid fa-question"></i><span>Guess</span></button>
            <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)} onKeyDown={keyDownHandler} readOnly={correct}/>
            <i className={`fa-solid fa-${correct ? (correct===1 ? 'check' : 'ban') : 'xmark'} icon`} style={{color: guessCount>0 ? (correct ? (correct===1 ? 'green' : 'yellow') : 'red') : 'transparent'}}></i>
        </div>
    )
}