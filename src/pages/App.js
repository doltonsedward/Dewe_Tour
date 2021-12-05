import './App.css'
import { useEffect } from 'react'
import { checkUser, Routes, setAuthToken } from '../config'

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const App = () => {
    useEffect(()=> {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
    }, [])

    useEffect(()=> {
        checkUser()
    }, [])
    
    return <Routes />
}

export default App