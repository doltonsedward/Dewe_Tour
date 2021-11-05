import './Header.scss'
import { dropDown, showLoginModal, showRegisterModal } from '../../../utils'
import { IconUser, IconBill, IconLogout, IconTrip } from '../../../assets'
import store from '../../../store'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { useEffect } from 'react'
import { useState } from 'react'

const Header = ({logo}) => {
    const history = useHistory()
    const currentState = useSelector(state => state)
    
    const isLoginSession = useSelector(state => state.isLogin)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(()=> {
        if (currentState.user.role === 'admin') {
            setIsAdmin(true)
        }
    }, [currentState])
    
    const logoutSession = () => {
        setIsAdmin(false)
        const email = currentState.user.email
        const password = currentState.user.password
        store.dispatch({
            type: 'LOGOUT',
            payload: {
                email: email,
                password: password
            }
        })

        history.push('/')
    }

    if (isAdmin) {
        return (
            <header className="d-flex-between">
                <img src={logo} className="c-pointer" alt="this is logo" onClick={()=> history.push('/')} />
                <div className="section-button__header">
                    <div className="profile" onClick={dropDown}>
                        <img className="profile-image" src={currentState.user.avatar} alt="profile" />
                        <div className="dropdown">
                            <ul>
                                <li onClick={()=> history.push('/admin/dashboard')}><img src={IconBill} alt="profile" /> Dashboard</li>
                                <li onClick={()=> history.push('/trip')}><img src={IconTrip} alt="profile" /> Trip</li>
                                <li onClick={()=> history.push('/list-transaction')}><img src={IconBill} alt="profile" /> Transaction</li>
                                <hr style={{ background: '#A8A8A8', border: '1px solid #A8A8A8' }} />
                                <li onClick={logoutSession}><img src={IconLogout} alt="logout if you want to exit from this website" /> Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        )
    } else if (isLoginSession) {
        return (
            <header className="d-flex-between">
                <img src={logo} className="c-pointer" alt="this is logo" onClick={()=> history.push('/')} />
                <div className="section-button__header">
                    <div className="profile" onClick={dropDown}>
                        <img className="profile-image" src={currentState.user.avatar} alt="profile" />
                        <div className="dropdown">
                            <ul>
                                <li onClick={()=> history.push('/profile')}><img src={IconUser} alt="profile" />Profile</li>
                                <li onClick={()=> history.push('/payment')}><img src={IconBill} alt="pay if you ready to it" /> Pay</li>
                                <hr style={{ background: '#A8A8A8', border: '1px solid #A8A8A8' }} />
                                <li onClick={logoutSession}><img src={IconLogout} alt="logout if you want to exit from this website" /> Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        )
    } else {
        return (
            <header className="d-flex-between">
                <img src={logo} className="c-pointer" alt="this is logo" onClick={()=> history.push('/')} />
                <div className="section-button__header">
                    <button className="btn-login" id="btnLogin" onClick={showLoginModal}>Login</button>
                    <button className="btn-warning ml-m" id="btnRegister" onClick={showRegisterModal}>Register</button>
                </div>
            </header>
        )
    }
}



export default Header