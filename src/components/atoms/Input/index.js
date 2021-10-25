import './Input.scss';

const InputSearch = ({label, className, onClick, ...rest}) => {
    return (
        <label className="wrapper-input">
            <p>{label}</p>
            <div className={className}>
                <input {...rest} />
                <button className="btn-submit__hero btn-warning" onClick={onClick}>Submit</button>
            </div>
        </label>
    )
}

const InputMultiple = ({label, className, onClick, ...rest}) => {
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

    const inputStyle = {
        backgroundColor: rest.inputbgcolor, 
        height: rest.inputheight,
        border: rest.inputborder
    }

    switch (variant) {
        case 'search-btn':
            classForLabel += ' d-flex'
        
            return (
                <InputSearch label={label} className={classForLabel} onClick={onClick} {...rest} />
            )
        case 'multiple-input':
            classForLabel += ' d-flex'
        
            return (
                <InputMultiple label={label} className={classForLabel} onClick={onClick} {...rest} />
            )
        default:
            return (
                <>
                    <label className="wrapper-input default">
                        <p style={{fontSize: rest.fontSize}}>{label}</p>
                        <input className="input-theme" style={inputStyle} {...rest} />
                    </label>
                </>
            )
    }

    
}

export default Input