const Text = ({variant, fontSize, fontWeight, lineHeight, children, ...rest}) => {
    switch (variant) {
        case 'h1':
            return <h1 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest}>{children}</h1> 
        case 'h2':
            return <h2 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest}>{children}</h2> 
        case 'h3':
            return <h3 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest}>{children}</h3> 
        case 'h4':
            return <h4 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest}>{children}</h4> 
        case 'h5':
            return <h5 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest}>{children}</h5> 
        case 'h6':
            return <h6 style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest}>{children}</h6> 
        case 'p':
            return <p style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest}>{children}</p> 
        case 'bold':
            return <b style={{fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}} {...rest}>{children}</b> 
        default:
            throw new Error('Variant not found')
    }
}

export default Text
