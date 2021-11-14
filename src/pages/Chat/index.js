import './_Chat.scss'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Contact, Message } from '../../components'

// MUI component
import Avatar from '@mui/material/Avatar'
import { StyledBadge } from '../../utils'

// import socket.io-client
import { io } from 'socket.io-client'

let socket
const Chat = () => {
    const title = "Complain";
    document.title = "DeweTour | " + title;
    const currentState = useSelector(state => state)

    const [userOnline, setUserOnline] = useState([])
    const [contact, setContact] = useState(null);
    const [contacts, setContacts] = useState([]);

    // set message
    const [messages, setMessages] = useState([])

    const loadContact = () => {
        // emit event to load admin contact
        socket.emit("load admin contact")

        // listen event on get admin contact
        socket.on("admin contact", (data) => {
            const dataContact = {
                ...data,
                message: "Click here to start message"
            }

            setContacts([dataContact])
        })
    }

    const loadConnectedUser = () => {
        // emit event to load data user when connected
        socket.emit("load user online")

        socket.on("user online", data => {
            setUserOnline(prev => ({
                ...prev,
                ...data
            }))
        })
    }

    useEffect(()=> {
        socket = io("http://localhost:8080", {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                id: currentState.user.id
            }
        })

        // hoisting
        loadContact()
        loadConnectedUser()

        // listen error sent from server
        socket.on("connect_error", (error) => {
            console.error(error.message); // not authorized
        });

        loadMessage()

        socket.on("new message", () => {
            socket.emit("load messages", contact?.id)
        })

        return () => {
            socket.disconnect();
        };
    }, [])

    console.log(messages, 'messages')

    // set message 
    const onClickContact = (data) => {
        setContact(data)
        socket.emit("load messages", data.id)
    }

    // function to register event listener on event "messages"
    const loadMessage = () => {
        socket.on("messages", data => {
            if (data.length !== messages.length) {
                if (data.length > 0) {
                    const dataMessages = data.map(item => ({
                        idSender: item?.sender?.id,
                        message: item?.message
                    }))

                    setMessages(dataMessages)

                    loadContact()
                }
            }
        })
    } 

    const onSendMessage = (e) => {
        if (e.key === 'Enter') {
            const data = {
                idRecipient: contact?.id,
                message: e.target.value
            }

            socket.emit("send messages", data)
            e.target.value = ""
        }
    }

    return (
        <div className="header-default" style={{backgroundColor: 'var(--bg-chat-theme)', overflow: 'hidden'}}>
            <div className="hero"></div>
            <div className="wrapper-chat">
                <div className="sidebar">
                    Chat
                    <Contact datacontact={contacts} clickcontact={onClickContact} contact={contact} useronline={userOnline} />
                </div>
                <div className="content-message">
                    <Message contact={contact} user={currentState.user} messages={messages} sendmessage={onSendMessage}  />
                </div>
            </div>
        </div>
    )
}

export default Chat
