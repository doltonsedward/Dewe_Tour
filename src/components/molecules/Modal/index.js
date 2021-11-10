import './Modal.scss'
import { useState } from 'react';

import { Gap, Input } from '../../atoms'
import { IconPalm2, IconHibicus2 } from '../../../assets'
import { closeLoginModal, closeRegisterModal } from '../../../utils'
import store from '../../../store'

import { API } from '../../../config'

// mui component
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { Alert } from '@mui/material';

const ModalLogin = () => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('Not found')
    const [severity, setSeverity] = useState('success')
    
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleClick = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const { email, password } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

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

    const loginSession = async (event) => {
        try {
            event.preventDefault()

            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }

            const body = JSON.stringify(form)

            const response = await API.post('/login', body, config)

            if (response?.status === 200) {
                store.dispatch({ 
                    type: 'LOGIN', 
                    payload: response.data.data
                })    

                setMessage('Login Success')
                setSeverity('success')
            }
            
        } catch (error) {
            console.log(error)
            setMessage('Email or password are incorrect')
            setSeverity('error')
        }
    }

    return (
        <>
            <div className="modal" id="modal-login">  
                <div className="heading-modal">
                    <img className="icon-palm__login" src={IconPalm2} alt="" />
                    <img className="icon-hibicus__login" src={IconHibicus2} alt="" />
                </div>
                <div className="content-modal">
                    <form onSubmit={loginSession}>
                        <p className="title">Login</p>
                        <Input label="Email" fontSize={24} name="email" value={email} onChange={handleChange} required />
                        <Gap height={20} />
                        <Input label="Password" fontSize={24} name="password" value={password} type="password" onChange={handleChange} required />
                        <Gap height={20} />
                        <button className="btn-warning full" onClick={handleClick} type="submit">Login</button>
                        <Gap height={23} />
                        <p className="text-center disclamer">Don't have an account? Klik Here</p>
                    </form>
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
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

const ModalRegister = () => {
    const [message, setMessage] = useState('Not found')
    const [severity, setSeverity] = useState('success')
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const { fullName, email, password } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
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

    const registerSession = async (event) => {
        try {
            event.preventDefault()

            const config = {
                headers: {
                  "Content-type": "application/json",
                }
              }

            const body = JSON.stringify(form)

            const response = await API.post('/register', body, config)

            if (response?.status === 200) {
                setMessage('Register success')
            }
            
            // const person = {
            //     isLogin: false,
            //     user: {
            //         fullName: event.target.fullname.value,
            //         email: event.target.email.value,
            //         password: event.target.password.value
            //     }
            // }
        } catch (error) {
            console.log(error)
            setMessage('Data already exist')
            setSeverity('error')
        }
    }

    return (
        <>
            <div className="modal" id="modal-register">   
                <div className="heading-modal">
                    <img className="icon-palm__login" src={IconPalm2} alt="" />
                    <img className="icon-hibicus__login" src={IconHibicus2} alt="" />
                </div>
                <div className="content-modal">
                    <p className="title">Register</p>
                    <form onSubmit={registerSession}>
                        <Input label="Fullname" fontSize={24} name="fullName" value={fullName} onChange={handleChange} required />
                        <Gap height={20} />
                        <Input label="Email" fontSize={24} name="email" value={email} onChange={handleChange} required />
                        <Gap height={20} />
                        <Input label="Password" fontSize={24} name="password" value={password} type="password" onChange={handleChange} required />
                        <Gap height={20} />
                        <button className="btn-warning full" onClick={handleClick}>Register</button>
                        <Gap height={23} />
                    </form>
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
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

const Modal = ({variant}) => {
    switch (variant) {
        case 'modal-login':
            return (
                <>
                    <ModalLogin />
                    <div className="modal-dark-effect" id="modalLoginEffect" onClick={closeLoginModal}></div>
                </>
            )
        case 'modal-register':
            return (
                <>
                    <ModalRegister />
                    <div className="modal-dark-effect" id="modalRegisterEffect" onClick={closeRegisterModal}></div>
                </>
            )
    
        default:
            return (
                <div className="modal" id="modal">
                    <div className="heading-modal">
                        {/* <button onClick={closeModal}>x</button> */}
                    </div>
                </div>
            )
    }
}

export default Modal