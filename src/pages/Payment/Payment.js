import './Payment.scss'

import { Box, Gap } from '../../components'
import { setData, removeData } from '../../utils' 

const Payment = () => {
    // get data from api localstorage
    const payment = JSON.parse(localStorage.getItem('payment'))
    // const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory'))

    const { name, country, type, count, totalPayment } = payment
    console.log(payment.status)

    function statusPayment() {
        return {
            ...payment,
            status: 'pending'
        }
    }

    console.log(statusPayment())
    return (
        <div className="payment">
            <div className="hero"></div>
            <Gap height={66} />
            
            <Box 
                variant='payment' 
                name={name} 
                country={country} 
                type={type} 
                count={count} 
                totalPayment={totalPayment}
                status={payment.status}
                onClick={()=> setData('payment', statusPayment())} />
        </div>
    )
}

export default Payment
