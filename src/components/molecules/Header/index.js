import './Header.scss'
import { dropDown, showLoginModal, showRegisterModal } from '../../../utils'
import { ProfileDefault } from '../../../assets'
import { IconUser, IconBill, IconLogout } from '../../../assets'
import store from '../../../store'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'



const Header = ({logo}) => {

    const history = useHistory()
    
    // const isLoginSession = useSelector(state => state.isLogin) || JSON.parse(localStorage.getItem('user'))
    const isLoginSession = useSelector(state => state.isLogin)
    
    const logoutSession = () => {
        const currentState = store.getState()
        const email = currentState.user.email
        const password = currentState.user.password
        store.dispatch({
            type: 'LOGOUT',
            payload: {
                email: email,
                password: password
            }
        })
    }

    if (isLoginSession) {
        return (
            <header className="d-flex-between">
                <img src={logo} alt="this is logo" onClick={()=> history.push('/')} />
                <div className="section-button__header">
                    <div className="profile" onClick={dropDown}>
                        <img className="profile-image" src={ProfileDefault} alt="profile" />
                        <div className="dropdown">
                            <ul>
                                <li><img src={IconUser} alt="profile" /> Profile</li>
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
                <img src={logo} alt="this is logo" onClick={()=> history.push('/')} />
                <div className="section-button__header">
                    <button className="btn-login" id="btnLogin" onClick={showLoginModal}>Login</button>
                    <button className="btn-warning ml-m" id="btnRegister" onClick={showRegisterModal}>Register</button>
                </div>
            </header>
        )
    }
}



export default Header