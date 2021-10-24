import './Payment.scss'

import { Box, Gap } from '../../components'
import { setData } from '../../utils' 
import { useState } from 'react'

// mui component
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import { Alert } from '@mui/material'

const Payment = () => {
    // for handle mui alert effect
    const [open, setOpen] = useState(false);

    const handleClick = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }

    const action = (
        <>
            <Button color="secondary" size="small" onClick={handleClose}>
                CLOSE
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
            </IconButton>
        </>
    )
    // close
    
    
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
                    handleClick()
                }} />

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} action={action}>
                <Alert sx={{boxShadow: '0 0 50px rgba(0, 0, 0, .26)'}} onClose={handleClose} severity='success'>
                <p>Your payment will be confirmed within 1 x 24 hours thank you</p>
                </Alert>

            </Snackbar>
        </div>
    )
}

export default Payment
