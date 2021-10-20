import './App.css'
import logo from '../assets/icon/logo.png'
import { Header, Footer } from '../components'
import { Home } from './'

const App = () => {
    return (
        <>
            <Header logo={logo} />
                <Home />
            <Footer />
        </>
    )
}

export default App