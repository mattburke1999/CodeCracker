

export default function Logo() {
    const logoStyles = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
    }

    const innerStyles = {
        fontSize: '2.5em',
        fontWeight: 'bold',
        color: '#333',
        margin: 0,
        padding: 0,
        textAlign: 'center'
    }

    return (
        <div style={logoStyles}>
            <i className='fa-solid fa-unlock-keyhole' style={{...innerStyles, color: 'gold'}}></i>
            <h1 style={innerStyles}>CRACK the CODE!</h1>
        </div>
    )
}