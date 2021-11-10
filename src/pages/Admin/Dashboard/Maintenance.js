import './_Dashboard.scss'
import { useHistory } from 'react-router'
import { Gap, SidebarAdmin, Text } from '../../../components'
import { muiButton, redButton } from '../../../utils'
import { API } from '../../../config'
import { useState, useEffect } from 'react'

// mui component
import * as React from 'react';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Maintenance = () => {
    const history = useHistory()

    const [message, setMessage] = useState('Error')
    const [open, setOpen] = useState(false)
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('')

    const handleClick = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const getCountries = async () => {
        try {
            const response = await API.get('/countrys')
            setCountries(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getCountries()
    }, [open])

    // action for mui
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
    );

    const cleaningTrip = async () => {
        try {
            const response = await API.delete('/maintence/trips')
            setMessage(response.data.message)
            handleClick()
        } catch (error) {
            console.log(error)
        }
    }

    const cleaningPayment = async () => {
        try {
            const response = await API.delete('/maintence/transactions')
            setMessage(response.data.message)
            handleClick()
        } catch (error) {
            console.log(error)
        }
    }

    const cleaningProfiles = async () => {
        try {
            const response = await API.delete('/maintence/profiles')
            setMessage(response.data.message)
            handleClick()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteCountry = async () => {
        try {
            const response = await API.delete('/country/' + country)
            setOpen(true)
            setMessage(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    // MUI logic
    const newMuiButton = {
        ...muiButton,
        marginRight: '10px'
    }

    const handleChange = (event) => {
        setCountry(event.target.value);
    }

    return (
        <div className="header-default">
            <div className="hero"></div>
            <div className="dashboard">
                <div className="left-section__dashboard">
                    <SidebarAdmin activein="maintenance" />
                </div>
                <div className="right-section__dashboard">
                    <div className="main">
                        <Text variant="p" fontSize={20}>Clearing storage in backend</Text>
                        <Gap height={20} />
                        <div className="d-flex">
                            <Button variant="contained" sx={newMuiButton} onClick={cleaningTrip}>Trip</Button>
                            <Button variant="contained" sx={newMuiButton} onClick={cleaningPayment}>Payment</Button>
                            <Button variant="contained" sx={newMuiButton} onClick={cleaningProfiles}>Profiles</Button>
                        </div>
                        <Gap height={50} />
                        <Text variant="p" fontSize={20}>Database</Text>
                        <Gap height={20} />
                        <div className="d-flex">
                            <div className="mr-s">
                                <Button variant="contained" sx={newMuiButton} onClick={()=> history.push('/add-country')}>add country</Button>
                            </div>
                           
                            <FormControl sx={{width: 150}}>
                                <InputLabel id="demo-simple-select-label">Countries</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={country}
                                    label="Country"
                                    onChange={handleChange}
                                    >
                                    {countries.map((item) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    })}
                                </Select>
                                <Button variant="contained" sx={redButton} onClick={handleDeleteCountry}>delete</Button>
                                
                            </FormControl>
                        </div>
                        
                    </div>
                </div>
            </div>

            <Snackbar sx={{
                position: 'fixed',
                bottom: 0,
                zIndex: 99999999999999,
                transform: 'translate(50px, -25px) scale(1.2)'
            }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                action={action}
            >
                <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Maintenance
