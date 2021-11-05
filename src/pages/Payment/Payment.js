import './Payment.scss'

import { Box, Gap } from '../../components'
import { setData } from '../../utils' 
import { useEffect, useState } from 'react'

// import api
import { API } from '../../config'

// mui component
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import { Alert } from '@mui/material'

const Payment = () => {
    // for handle mui alert effect
    const [open, setOpen] = useState(false);
    const [dataTrans, setDataTrans] = useState([])

    const handleClick = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }

    const getTransaction = async () => {
        try {
            const response = await API.get('/transaction')
            setDataTrans(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(dataTrans, 'data trans')
    
    useEffect(()=> {
        getTransaction()
    }, [])

    // get data from api localstorage
    const payment = JSON.parse(localStorage.getItem('payment'))
    const [state, setstate] = useState(payment)

    // const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory'))

    const { totalPayment } = payment
    // console.log(payment.status)

    // for changing status payment
    function statusPayment() {
        return {
            ...payment,
            status: 'pending'
        }
    }

    // action for button MUI
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

    return (
        <div className="payment">
            <div className="hero"></div>
            <Gap height={66} />
            {dataTrans.map(item => {
                return (
                    <Box 
                        variant='payment' 
                        name={item?.trip?.title} 
                        country='Australia'
                        type={item?.trip?.type}  
                        count={item?.counterQty} 
                        totalPayment={totalPayment}
                        status={state.status}
                        item={item}
                        onClick={()=> {
                            setstate({
                                ...payment,
                                status: 'pending'
                            })

                            setData('payment', statusPayment())
                            handleClick()
                        }} />
                )
            })}

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} action={action}>
                <Alert sx={{boxShadow: '0 0 50px rgba(0, 0, 0, .26)'}} onClose={handleClose} severity='success'>
                <p>Your payment will be confirmed within 1 x 24 hours thank you</p>
                </Alert>

            </Snackbar>
        </div>
    )
}

export default Payment
