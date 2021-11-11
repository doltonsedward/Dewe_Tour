import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { Contact } from '../../components'

// import socket.io-client
import { io } from 'socket.io-client'

let socket
const Chat = () => {
    const currentState = useSelector(state => state)
    const [contact, setContact] = useState('initialState')
    useEffect(()=> {
        socket = io("http://localhost:8080")

        return () => {
            socket.disconnect();
        };
    }, [])

    return (
        <div className="header-default">
            <div className="hero"></div>
            halo
        </div>
    )
}

export default Chat
