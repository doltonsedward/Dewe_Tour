import './Input.scss';

const InputSearch = ({label, className, onClick, ...rest}) => {
    return (
        <>
            <label className="wrapper-input">
                <p>{label}</p>
                <div className={className}>
                    <input {...rest} />
                    <button className="btn-submit__hero btn-warning" onClick={onClick}>Submit</button>
                </div>
            </label>
        </>
    )
}

const Input = ({label, variant, onClick, ...rest}) => {
    let classForLabel = 'input-section'

    switch (variant) {
        case 'search-btn':
            classForLabel += ' d-flex'
        
            return (
                <InputSearch label={label} className={classForLabel} onClick={onClick} {...rest} />
            )
        default:
            return (
                <>
                    <label className="wrapper-input default">
                        <p style={{fontSize: rest.fontSize}}>{label}</p>
                        <input className="input-theme" {...rest} />
                    </label>
                </>
            )
    }

    
}

export default Input