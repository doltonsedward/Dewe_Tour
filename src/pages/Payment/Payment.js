import './Payment.scss'

import { Box, Gap } from '../../components'
import { setData } from '../../utils' 
import { useState } from 'react'

const Payment = () => {
    // get data from api localstorage
    const payment = JSON.parse(localStorage.getItem('payment'))
    const [state, setstate] = useState(payment)
    // const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory'))

    const { name, country, type, count, totalPayment } = payment
    // console.log(payment.status)

    // for changing status payment
    function statusPayment() {
        return {
            ...payment,
            status: 'pending'
        }
    }

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
                status={state.status}
                onClick={()=> {
                    setstate({
                        ...payment,
                        status: 'pending'
                    })

                    setData('payment', statusPayment())
                }} />
        </div>
    )
}

export default Payment
