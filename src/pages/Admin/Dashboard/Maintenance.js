import './_Dashboard.scss'
import { useHistory } from 'react-router'
import { Gap, Text } from '../../../components'
import { muiButton } from '../../../utils'
import { API } from '../../../config'
import { useState } from 'react'

// mui component
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { Alert } from '@mui/material';

const Maintenance = () => {
    const history = useHistory()

    const [message, setMessage] = useState('Error')
    const [open, setOpen] = useState(false)

    const handleClick = () => setOpen(true)
    const handleClose = () => setOpen(false)

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
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="header-default">
            <div className="hero"></div>
            <div className="dashboard">
                <div className="left-section__dashboard">
                    <ul>
                        <li>Dashboard</li>
                        <li onClick={()=> history.push('/admin/dashboard/maintenance')}>Maintenance</li>
                        <li></li>
                    </ul>
                </div>
                <div className="right-section__dashboard">
                    <div className="main">
                        <Text variant="h1" fontSize={20}>Clearing storage in backend</Text>
                        <Gap height={20} />
                        <Button variant="contained" sx={muiButton} onClick={cleaningTrip}>Trip</Button>
                        <Button variant="contained" sx={muiButton}>Payment</Button>
                    </div>
                </div>
            </div>

            <Snackbar sx={{
                position: 'fixed',
                bottom: 0,
                zIndex: 99999999999,
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
