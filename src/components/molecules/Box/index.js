import './Box.scss'
import { Gap } from '../../atoms'

const CardBox = ({logo, heading, text}) => {
    return (
        <div className="card-box">
            <img src={logo} alt={heading} />
            <Gap height={24} />
            <p className="heading__card-box">{heading}</p>
            <Gap height={9} />
            <p className="subheading__card-box">{text}</p>
        </div>
    )
}

const ContentBox = ({img, heading, type, price, subtext, className, ...rest}) => {
    return (
        <div className={className} {...rest}>
            <div className="content-box c-pointer">
                <img src={'/assets/img/tour/' + img} className="content-cover-image" alt={heading} />
                <Gap height={11} />
                <p className="heading__content-box">{heading}</p>
                <Gap height={10} />
                <div className="d-flex-between">
                    <p className="subheading__content-box color-theme">{type} {price}</p>
                    <p className="country__content-box">{subtext}</p>
                </div>
            </div>
        </div>
    )
}

const Box = ({variant, logo, heading, text, className, img, item, ...rest}) => {
    switch (variant) {
        case 'card':
            return <CardBox logo={logo} heading={heading} text={text} />
        case 'content':
            return <ContentBox className={className} img={item.image} heading={item.name} type={item.type} price={item.price} subtext={item.country} {...rest} />
    
        default:
            return (
                <div className="card-box">
                    <img src={img} alt={heading} />
                    <Gap height={24} />
                    <p className="heading__card-box">{heading}</p>
                    <Gap height={9} />
                    <p className="subheading__card-box">{text}</p>
                </div>
            )
    }

    
}

export default Box