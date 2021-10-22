const Text = ({variant, title, ...rest}) => {
    switch (variant) {
        case 'h1':
            return <h1>{title}</h1>
    
        default:
            throw new Error('Variant not found')
    }
}

export default Text
