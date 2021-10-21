import './Header.scss'

const Header = ({logo}) => {
    return (
        <header className="d-flex-between">
            <img src={logo} alt="this is logo" />
            <div className="section-button__header">
                <button className="btn-login">Login</button>
                <button className="btn-warning ml-m">Register</button>
            </div>
        </header>
    )
}

export default Header