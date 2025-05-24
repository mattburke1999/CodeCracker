import styles from './ModeSelector.module.css';

export default function ModeSelector({ modes, mode, changeMode }) {

    const handleClick = (newMode) => {
        if (mode !== newMode) {
            changeMode(newMode);
        }
    }

    return (
        <div className={styles.modes}>
            {modes.map((m) => (
                <div key={m} className={`${styles.mode}${mode === m ? ` ${styles.active}` : ''}`} onClick={() => handleClick(m)}>
                    <p>{m}</p>
                </div>
            ))}
        </div>
    )
}