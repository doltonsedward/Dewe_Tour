const Input = ({label, ...rest}) => {
    return (
        <>
            <label>
                {label}
                <input {...rest} />
            </label>
        </>
    )
}

export default Input