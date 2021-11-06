import './Payment.scss'

import { Box as BoxDefault, Gap } from '../../components'
import { setData } from '../../utils' 
import { useEffect, useState } from 'react'

// import api
import { API } from '../../config'

// mui component
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Alert } from '@mui/material'

const Payment = () => {
    console.clear()
    // for handle mui alert effect
    const [open, setOpen] = useState(false);
    const [dataTrans, setDataTrans] = useState([])
    const [value, setValue] = React.useState(0);

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

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        
        return (
            <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
            </div>
        );
    }

    // mui function
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    // mui function
    const handleMuiChange = (event, newValue) => {
        setValue(newValue);
    };

    const waitingPayment = dataTrans.filter(item => item.status === 'Waiting payment')
    const waitingApproval = dataTrans.filter(item => item.status === 'Waiting approval')
    const approve = dataTrans.filter(item => item.status === 'Approve')

    return (
        <div className="payment">
            <div className="hero"></div>
            <Gap height={66} />
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleMuiChange} aria-label="basic tabs example">
                    <Tab label="Waiting Payment" {...a11yProps(0)} />
                    <Tab label="Waiting Approval" {...a11yProps(1)} />
                    <Tab label="Approve" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    Item One
                    {waitingPayment.map(item => {
                        return (
                            <BoxDefault 
                                variant='payment' 
                                name={item?.trip?.title} 
                                country='Australia'
                                type={item?.trip?.type}  
                                count={item?.counterQty} 
                                totalPayment={totalPayment}
                                status={item.status}
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
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                    {waitingApproval.map(item => {
                        return (
                            <BoxDefault 
                                variant='payment' 
                                name={item?.trip?.title} 
                                country='Australia'
                                type={item?.trip?.type}  
                                count={item?.counterQty} 
                                totalPayment={totalPayment}
                                status={item.status}
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
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                    {approve.map(item => {
                        return (
                            <BoxDefault 
                                variant='payment' 
                                name={item?.trip?.title} 
                                country='Australia'
                                type={item?.trip?.type}  
                                count={item?.counterQty} 
                                totalPayment={totalPayment}
                                status={item.status}
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
                </TabPanel>
            </Box>
            {/* {dataTrans.map(item => {
                return (
                    <BoxDefault 
                        variant='payment' 
                        name={item?.trip?.title} 
                        country='Australia'
                        type={item?.trip?.type}  
                        count={item?.counterQty} 
                        totalPayment={totalPayment}
                        status={item.status}
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
            })} */}

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} action={action}>
                <Alert sx={{boxShadow: '0 0 50px rgba(0, 0, 0, .26)'}} onClose={handleClose} severity='success'>
                <p>Your payment will be confirmed within 1 x 24 hours thank you</p>
                </Alert>

            </Snackbar>
        </div>
    )
}

export default Payment
