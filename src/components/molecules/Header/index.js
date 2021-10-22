import './Header.scss'
import { showLoginModal, showRegisterModal } from '../../../utils'
import { useSelector } from 'react-redux'
import { ProfileDefault } from '../../../assets'

const Header = ({logo}) => {
    const isLoginSession = useSelector(state => state.isLogin)
    if (isLoginSession) {
        return (
            <header className="d-flex-between">
                <img src={logo} alt="this is logo" />
                <div className="section-button__header">
                    <div className="profile">
                        <img src={ProfileDefault} alt="" />
                    </div>
                </div>
            </header>
        )
    } else {
        return (
            <header className="d-flex-between">
                <img src={logo} alt="this is logo" />
                <div className="section-button__header">
                    <button className="btn-login" id="btnLogin" onClick={showLoginModal}>Login</button>
                    <button className="btn-warning ml-m" id="btnRegister" onClick={showRegisterModal}>Register</button>
                </div>
            </header>
        )
    }
}



export default Header