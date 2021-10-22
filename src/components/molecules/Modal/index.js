import './Modal.scss'
// import { closeModal } from '../../../utils'
import { Gap, Input } from '../../atoms'
import { IconPalm2, IconHibicus2 } from '../../../assets'
import { closeLoginModal, closeRegisterModal } from '../../../utils'

const ModalLogin = () => {
    return (
        <div className="modal" id="modal-login">   
            <div className="heading-modal">
                <img className="icon-palm__login" src={IconPalm2} alt="" />
                <img className="icon-hibicus__login" src={IconHibicus2} alt="" />
            </div>
            <div className="content-modal">
                <form onSubmit={function(e) {
                            e.preventDefault()
                            
                            const dataUser = JSON.parse(window.localStorage.getItem('user'))
                            if (dataUser.email === e.target.email.value && dataUser.password === e.target.password.value) {
                                console.log(true)
                            } else {
                                console.log(false)
                            }
                        }
                    }>
                    <p className="title">Login</p>
                    <Input label="Email" fontSize={24} name="email" required />
                    <Gap height={20} />
                    <Input label="Password" fontSize={24} name="password" required />
                    <Gap height={20} />
                    <button className="btn-warning full">Login</button>
                    <Gap height={23} />
                    <p className="text-center disclamer">Don't have an account? Klik Here</p>
                </form>
            </div>
        </div>
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