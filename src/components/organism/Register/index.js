import { Gap, Input, MuiAlert } from '../..'
import { IconPalm2, IconHibicus2 } from '../../../assets'
import { useState } from 'react'

import { API } from '../../../config'

// mui component
import { 
    Backdrop,
    Modal,
    Fade
} from '@mui/material'

const Register = ({ isOpen, setIsOpen }) => {
    const [message, setMessage] = useState('Loading')
    const [severity, setSeverity] = useState('info')
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
    const handleCloseModal = () => setIsOpen(false)

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
                setSeverity('success')
            }

        } catch (error) {
            setMessage('Data already exist')
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

export default Register
