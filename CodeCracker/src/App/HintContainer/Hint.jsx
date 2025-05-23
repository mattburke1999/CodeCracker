
export default function Hint({hintTexts, hintValue, color, lastOne}){
    

    const hintStyles = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderTop: '1px solid #ccc',
        paddingTop: '1rem',
        borderBottom: lastOne ? '1px solid #ccc' : 'none',
        paddingBottom: lastOne ? '1rem' : 0
    }

    const hintTextStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2em',
        width: '300px',
        color
    }

    const hintCodeStyles = {
        fontSize: '1.75em',
        fontWeight: 'bold',
        width: '100px'
    }

    return (
        <div style={hintStyles}>
            <div style={hintTextStyles}>
                {hintTexts.map((hintText) => <span key={hintText}>{hintText}</span>)}
            </div>
            <div style={hintCodeStyles}>{hintValue}</div>
        </div>
    )
}