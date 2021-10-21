import './Header.scss'

const Header = ({logo}) => {
    return (
        <header>
            <img src={logo} alt="this is logo" />
        </header>
    )
}

export default Header