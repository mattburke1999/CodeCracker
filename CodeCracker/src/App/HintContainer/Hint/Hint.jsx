import styles from './Hint.module.css';

export default function Hint({hintTexts, hintValue, color, lastOne}){


    return (
        <div className={`${styles.hint}${lastOne ? ` ${styles.lastOne}` : ''}`}>
            <div className={styles.hintText} style={{color}}>
                {hintTexts.map((hintText) => <span key={hintText}>{hintText}</span>)}
            </div>
            <div className={styles.hintCode}>{hintValue}</div>
        </div>
    )
}