// import { Route } from 'react-router'

import './App.css'
import { Logo } from '../assets'
import { Header, Footer } from '../components'
import { Home } from './'

const App = () => {
    return (
        <>
            <Header logo={Logo} />
                <Home />
            <Footer />
        </>
    )
}

export default App