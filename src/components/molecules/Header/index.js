import './Header.scss'
import { showLoginModal, showRegisterModal } from '../../../utils'

const Header = ({logo}) => {
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



export default Header