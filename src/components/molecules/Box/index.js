import './_Box.scss'
import { Gap } from '../../atoms'

// box component
import ContentBox from './ContentBox'
import PaymentBox from './PaymentBox'
import CardBox from './CardBox'
import PaymentAdminBox from './PaymentAdminBox'

const ProfileBox = () => {
    return (
        <div>
            hello
        </div>
    )
}

const DashboardBox = ({heading, text, theme}) => {
    const dashboardClass = `dashboard-box ${theme}`
    return (
        <div className={dashboardClass}>
            <p>{heading}</p>
            <p>{text}</p>
        </div>
    )
}


const Box = ({variant, key, theme, logo, heading, text, img, item, setstate, status,  ...rest}) => {
    switch (variant) {
        case 'card':
            return <CardBox logo={logo} heading={heading} text={text} />
        case 'content':
            return <ContentBox item={item} {...rest} />
        case 'payment':
            return <PaymentBox status={status} item={item} setstate={setstate} {...rest} />
        case 'payment-admin':
            return <PaymentAdminBox item={item} setstate={setstate} />
        case 'profile':
            return <ProfileBox />
        case 'box-dashboard':
            return <DashboardBox heading={heading} theme={theme} text={text} logo={logo} />
    
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