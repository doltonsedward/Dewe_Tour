import { Gap, Group, Text, Input } from "../../../components"
import { muiButton } from "../../../utils"

import { API } from "../../../config"
import { useState } from "react"

// MUI component
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { Alert } from '@mui/material';

const AddCountry = () => {
    console.clear()
    // MUI logic
    const handleClick = () => setOpen(true)
    const handleClose = () => setOpen(false)

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

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('Not found')
    const [severity, setSeverity] = useState('success')
    // close MUI session

    const [form, setForm] = useState({
        name: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value 
        })
    }

    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(form)

            await API.post('/country', body, config)

            handleClick()
            setMessage('Add country success')
            setSeverity('success')
        } catch (error) {
            console.log(error) 

            handleClick()
            setMessage('Add country failed')
            setSeverity('error')
        }
    }

    const inputStyle = {
        padding: '0 calc(136px - 87px)'
    }

    return (
        <div className="header-default">
            <div className="hero"></div>
            <Gap height={105} />
            <Group style={{padding: '0 87px'}}>
                <Text variant="h1" fontSize={36}>Add Country</Text>
                <Gap height={62} />
                <Group style={inputStyle}>
                    <Input label='Name' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" name="name" value={form.name} onChange={handleChange} />
                </Group>
            </Group>
            <Gap height={115} />
                <p className="text-center"><Button variant="contained" sx={muiButton} onClick={handleSubmit}>add country</Button></p>
            <Gap height={100} />

            <Snackbar sx={{
                position: 'fixed',
                bottom: 0,
                zIndex: 99999999999,
                transform: 'translate(50px, -25px) scale(1.2)',
                boxShadow: '0 0 30px rgba(0,0,0,.25)'
            }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                action={action}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AddCountry
