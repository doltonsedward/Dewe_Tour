import { Box, Gap } from '../../components'

const Profile = () => {
    const payment = JSON.parse(localStorage.getItem('payment'))

    const { name, country, type, count, totalPayment } = payment

    return (
        <div className="payment">
            <div className="hero"></div>
            <Box 
                variant='payment' 
                name={name} 
                country={country} 
                type={type} 
                count={count} 
                totalPayment={totalPayment}
                status={payment.status} />
        </div>
    )
}

export default Profile
