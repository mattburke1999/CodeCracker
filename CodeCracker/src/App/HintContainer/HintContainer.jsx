import { useState, useEffect } from 'react'

import Hint from './Hint/Hint';

import { getHints } from '../utils';

export default function HintContainer({ code, mode }) {

    const [hints, setHints] = useState([]);

    const styles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
    }

    useEffect(() => {
        if(code && code.length > 0) {
            const newHints = getHints(code, mode);
            setHints(newHints);
            console.log('hints', hints);
        }
    }, [code, mode])

    return (
        <div style={styles}>
            {hints.map((hint, index) => (
                <Hint
                    key={index}
                    hintTexts={hint.texts}
                    hintValue={hint.value.join('')}
                    color={hint.color}
                    lastOne={hint.lastOne}
                />
            ))}
        </div>
    )
}