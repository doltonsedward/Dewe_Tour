const Group = ({variant, ...rest}) => {
    const spaceBetween = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    const spaceBetweenOnly = {
        display: 'flex',
        justifyContent: 'space-between'
    }

    switch (variant) {
        case 'space-between':
            return <div style={spaceBetween} {...rest} />

        case 'space-between-only':
            return <div style={spaceBetweenOnly} {...rest} />
        
        case 'space-around':
            return <div style={spaceBetween} {...rest} />
        
        case 'flex':
            return <div style={{display: 'flex', alignItems: 'center'}} {...rest} />
        
        default:
            return <div {...rest} />
    }
    
}

export default Group
