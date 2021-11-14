import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { Contact, Message } from "../../../components"

// import socket.io-client
import { io } from 'socket.io-client'

let socket
const ChatAdmin = () => {
    const title = "Admin Message"
    document.title = "DeweTour | " + title

    const currentState = useSelector(state => state)

    const [userOnline, setUserOnline] = useState([])
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [clicked, setClicked] = useState(false)

    // set message
    const [messages, setMessages] = useState([])

    useEffect(()=> {
        socket = io("http://localhost:8080", {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                id: currentState.user.id
            }
        })

        loadContact()
        loadConnectedUser()

        // listen error sent from server
        socket.on("connect_error", (error) => {
            console.error(error.message); // not authorized
        })

        loadMessages()

        socket.on("new message", () => {
            socket.emit("load messages", contact?.id)
        })

        return () => {
            socket.disconnect();
        }
    }, [])

    const loadContact = () => {
        // emit event to load admin contact
        socket.emit("load customer contacts")

        // listen event on get admin contact
        socket.on("customer contact", (data) => {

            let dataContacts = data.filter(item => 
                item.role !== 'admin'
            )

            dataContacts = dataContacts.map((item) => ({
                ...item,
                message: "Click here to start message"
            }))

            setContacts([...dataContacts])
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

    const loadMessages = () => {
        socket.on("messages", (data) => {
          if (data.length !== messages.length) {
            if (data.length > 0) {
              const dataMessages = data.map((item) => ({
                idSender: item.sender.id,
                message: item.message,
              }));
              setMessages(dataMessages);
    
              loadContact();
            }
          }

          // smooth scroll
        //   const chatMessagesElm = document.getElementById("chat-messages");
        //   chatMessagesElm.scroll({
        //     top: chatMessagesElm.scrollHeight,
        //     left: 0,
        //     behavior: "smooth",
        //   })
        })
      }

    // set message 
    const onClickContact = (data) => {
        setContact(data)
        setClicked(true)
        socket.emit("load messages", data.id)
    }

    // handle when send message
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
                    <p className="title__sidebar">Chat</p>
                    <Contact datacontact={contacts} clickcontact={onClickContact} contact={contact} useronline={userOnline} />
                </div>
                <div className="content-message">
                    <Message contact={contact} user={currentState.user} messages={messages} sendmessage={onSendMessage}  />
                </div>
            </div>
        </div>
    )
}

export default ChatAdmin
