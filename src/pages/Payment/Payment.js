import './Payment.scss'

import { Box as BoxDefault } from '../../components'
import { setData } from '../../utils' 
import { useEffect, useState } from 'react'
import { ImageEmpty3D } from '../../assets'

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
    // console.clear()
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
    const filterApproval = dataTrans.filter(item => item.status === 'Approve')
    const filterCancel = dataTrans.filter(item => item.status === 'Cancel')

    return (
        <div className="payment header-default">
            <div className="hero"></div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                    <Tabs value={value} onChange={handleMuiChange} aria-label="basic tabs example">
                    <Tab label="Waiting Payment" {...a11yProps(0)} />
                    <Tab label="Waiting Approval" {...a11yProps(1)} />
                    <Tab label="Approve" {...a11yProps(2)} />
                    <Tab label="Cancel" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {
                        !waitingPayment.length ? 
                        <p className="text-center"><img style={{width: '450px', maxWidth: '90%'}} src={ImageEmpty3D} alt="" /></p>
                        :
                        waitingPayment.map(item => {
                            return (
                                <BoxDefault 
                                    variant='payment' 
                                    name={item?.trip?.title} 
                                    country='Australia'
                                    type={item?.trip?.type}  
                                    count={item?.counterQty} 
                                    totalPayment={item.total}
                                    status={item.status}
                                    item={item}
                                    onClick={()=> {
                                        handleClick()
                                    }} />
                            )
                        })
                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {
                        !waitingApproval.length ?
                        <p className="text-center"><img style={{width: '450px', maxWidth: '90%'}} src={ImageEmpty3D} alt="" /></p>
                        :
                        waitingApproval.map(item => {
                            return (
                                <BoxDefault 
                                    variant='payment' 
                                    name={item?.trip?.title} 
                                    country='Australia'
                                    type={item?.trip?.type}  
                                    count={item?.counterQty} 
                                    totalPayment={item.total}
                                    status={item.status}
                                    item={item}
                                    onClick={()=> {
                                        handleClick()
                                    }} />
                            )
                        })
                    }
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {
                        !filterApproval.length ? 
                        <p className="text-center"><img style={{width: '450px', maxWidth: '90%'}} src={ImageEmpty3D} alt="" /></p>
                        :
                        filterApproval.map(item => {
                            if (!item) alert('emppty')
                            return (
                                <BoxDefault 
                                    variant='payment' 
                                    name={item?.trip?.title} 
                                    country='Australia'
                                    type={item?.trip?.type}  
                                    count={item?.counterQty} 
                                    totalPayment={item.total}
                                    status={item.status}
                                    item={item}
                                    onClick={()=> {
                                        handleClick()
                                    }} />
                            )
                        })                        
                    }
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {
                        !filterCancel.length ? 
                        <p className="text-center"><img style={{width: '450px', maxWidth: '90%'}} src={ImageEmpty3D} alt="" /></p>
                        :
                        filterCancel.map(item => {
                            return (
                                <BoxDefault 
                                    variant='payment' 
                                    name={item?.trip?.title} 
                                    country='Australia'
                                    type={item?.trip?.type}  
                                    count={item?.counterQty} 
                                    totalPayment={item.total}
                                    status={item.status}
                                    item={item}
                                    onClick={()=> {
                                        handleClick()
                                    }} />
                            )
                        })
                    }
                </TabPanel>
            </Box>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} action={action}>
                <Alert sx={{boxShadow: '0 0 50px rgba(0, 0, 0, .26)'}} onClose={handleClose} severity='success'>
                <p>Your payment will be confirmed within 1 x 24 hours thank you</p>
                </Alert>

            </Snackbar>
        </div>
    )
}

export default Payment
