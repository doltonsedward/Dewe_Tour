// import { Route } from 'react-router'

import './App.css'
import { Logo } from '../assets'
import { Header, Footer } from '../components'
import { Home } from './'

import { useSelector } from 'react-redux'

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