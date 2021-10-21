import './Input.scss';

const InputSearch = ({label, className, ...rest}) => {
    return (
        <>
            <label className="wrapper-input">
                <p>{label}</p>
                <div className={className}>
                    <input {...rest} />
                    <button className="btn-submit__hero btn-warning">Submit</button>
                </div>
            </label>
        </>
    )
}

const Input = ({label, variant, ...rest}) => {
    let classForLabel = 'input-section'

    switch (variant) {
        case 'search-btn':
            classForLabel += ' d-flex'
        
            return (
                <InputSearch label={label} className={classForLabel} {...rest} />
            )
        default:
            return (
                <>
                    <label className="wrapper-input">
                        <p>{label}</p>
                        <input {...rest} />
                    </label>
                </>
            )
    }

    
}

export default Input