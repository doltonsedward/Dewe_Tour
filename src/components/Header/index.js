import './Header.scss'

const Header = ({logo}) => {
    return (
        <header>
            <img src={logo} alt="this is logo image" />
        </header>
    )
}

export default Header