import './Card.scss'

const Card = ({variant, logo, heading, subheading}) => {
    let cardClass
    let headingClass
    switch (variant) {
        case 'box':
            cardClass = 'card-box'
            headingClass = 'heading__card-box'
            break;
    
        default:
            break;
    }

    return (
        <div className={cardClass}>
            <img src={logo} alt="Guarantee" />
            <p className={headingClass}>{heading}</p>
            <p>{subheading}</p>
        </div>
    )
}

export default Card