import './Modal.scss'
import * as React from 'react';

import { Gap, Input } from '../../atoms'
import { IconPalm2, IconHibicus2 } from '../../../assets'
import { closeLoginModal, closeRegisterModal } from '../../../utils'
import store from '../../../store'

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

const ModalLogin = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('Not found')
    
    const handleClick = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
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

    function loginSession(event) {
        event.preventDefault()

                            
        const dataUser = JSON.parse(window.localStorage.getItem('user'))
        if (dataUser.email === event.target.email.value && dataUser.password === event.target.password.value) {
            store.dispatch({ type: 'LOGIN' })
            setMessage('Login Success')
        } else {
            store.dispatch({ type: 'NOT_LOGIN'})
            setMessage('Email or password are incorrect')
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
                        <Input label="Email" fontSize={24} name="email" required />
                        <Gap height={20} />
                        <Input label="Password" fontSize={24} name="password" required />
                        <Gap height={20} />
                        <button className="btn-warning full" onClick={handleClick}>Login</button>
                        <Gap height={23} />
                        <p className="text-center disclamer">Don't have an account? Klik Here</p>
                    </form>
                </div>
            </div>

            <Snackbar sx={{
                position: 'fixed',
                bottom: 0,
                zIndex: 999999999,
                transform: 'translate(50px, -25px) scale(1.2)'
            }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </>
    )
}

const ModalRegister = () => {
    return (
        <div className="modal" id="modal-register">   
            <div className="heading-modal">
                <img className="icon-palm__login" src={IconPalm2} alt="" />
                <img className="icon-hibicus__login" src={IconHibicus2} alt="" />
            </div>
            <div className="content-modal">
                <p className="title">Register</p>
                <form onSubmit={function(e) {
                            e.preventDefault()
                            const person = {
                                fullName: e.target.fullname.value,
                                email: e.target.email.value,
                                password: e.target.password.value
                            }
                            
                            window.localStorage.setItem('user', JSON.stringify(person));
                        }
                    }>
                    <Input label="Fullname" fontSize={24} name="fullname" required />
                    <Gap height={20} />
                    <Input label="Email" fontSize={24} name="email" required />
                    <Gap height={20} />
                    <Input label="Password" fontSize={24} name="password" required />
                    <Gap height={20} />
                    <button className="btn-warning full">Register</button>
                    <Gap height={23} />
                    <p className="text-center disclamer">Don't have an account? Klik Here</p>
                </form>
            </div>
        </div>
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