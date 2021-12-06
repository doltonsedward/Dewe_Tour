import './Login.scss'
import { Gap, Input, MuiAlert } from '../..'
import { IconPalm2, IconHibicus2 } from '../../../assets'
import { useState } from 'react';
import { toast } from 'react-toastify'
import store from '../../../store'

import { API, checkUser, setAuthToken } from '../../../config'

// mui component
import { 
    Backdrop,
    Modal,
    Fade
} from '@mui/material'

const Login = ({ isOpen, setIsOpen }) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('Not found')
    const [severity, setSeverity] = useState('success')
    
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleClick = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleCloseModal = () => setIsOpen(false)

    const { email, password } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

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
                toast.success('Login success, welcome ' + response.data.data.fullName)
                store.dispatch({ 
                    type: 'LOGIN', 
                    payload: response.data.data
                })    

                setAuthToken(response.data.data.token)
            }

            checkUser()
        } catch (error) {
            setMessage('Email or password are incorrect')
            setSeverity('error')
        }
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <div>
                        <div className="modal">  
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
                        <MuiAlert 
                            open={open}
                            severity={severity} 
                            message={message}
                            closeAlert={handleClose}
                        />
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default Login
