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

const ContentBox = ({img, heading, price, subtext, className}) => {
    return (
        <div className={className}>
            <div className="content-box">
                <img src={img} className="content-cover-image" alt={heading} />
                <Gap height={11} />
                <p className="heading__content-box">{heading}</p>
                <Gap height={10} />
                <div className="d-flex-between">
                    <p className="subheading__content-box color-theme">{price}</p>
                    <p className="country__content-box">{subtext}</p>
                </div>
            </div>
        </div>
    )
}

const Box = ({variant, logo, image, heading, text, price, subtext, className}) => {
    switch (variant) {
        case 'card':
            return <CardBox logo={logo} heading={heading} text={text} />
        case 'content':
            return <ContentBox className={className} img={image} heading={heading} price={price} subtext={subtext} />
    
        default:
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

    
}

export default Box