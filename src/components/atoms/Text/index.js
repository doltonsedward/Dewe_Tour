const Text = ({variant, fontSize, fontWeight, lineHeight, ...rest}) => {
    switch (variant) {
        case 'h1':
            return <h1 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest} /> 
        case 'h2':
            return <h2 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest} />
        case 'h3':
            return <h3 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest} />
        case 'h4':
            return <h4 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest} />
        case 'h5':
            return <h5 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest} />
        case 'h6':
            return <h6 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest} />
        case 'p':
            return <p style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest} />
        case 'bold':
            return <b style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest} />
        default:
            throw new Error('Variant not found')
    }
}

export default Text
