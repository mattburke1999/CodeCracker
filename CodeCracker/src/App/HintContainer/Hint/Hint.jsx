import styles from './Hint.module.css';

export default function Hint({hintText, hintValue, color, lastOne}){


    return (
        <div className={`${styles.hint}${lastOne ? ` ${styles.lastOne}` : ''}`}>
            <div className={styles.hintText} style={{color}}>
                <span >{hintText}</span>
            </div>
            <div className={styles.hintCode}>{hintValue}</div>
        </div>
    )
}