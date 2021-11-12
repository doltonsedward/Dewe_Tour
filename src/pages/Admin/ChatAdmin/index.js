import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { Contact, Message } from "../../../components"

// import socket.io-client
import { io } from 'socket.io-client'

let socket
const ChatAdmin = () => {
    const title = "Admin Message";
    document.title = "DeweTour | " + title;

    const currentState = useSelector(state => state)

    const [contact, setContact] = useState(null);
    const [contacts, setContacts] = useState([]);

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

        // hoisting
        loadContact()

        // listen error sent from server
        socket.on("connect_error", (error) => {
            console.error(error.message); // not authorized
        });

        return () => {
            socket.disconnect();
        };
    }, [])

    const loadContact = () => {
        // emit event to load admin contact
        socket.emit("load customer contacts")

        // listen event on get admin contact
        socket.on("customer contact", (data) => {
            const dataContact = {
                ...data,
                message: "Click here to start message"
            }

            setContacts([dataContact])
        })
    }

    console.log(contacts)

    // set message 
    const onClickContact = (data) => {
        setContact(data);
    };

    return (
        <div className="header-default">
            <div className="hero"></div>
            <div className="wrapper-chat">
                <div className="sidebar">
                    <Contact datacontact={contacts} clickcontact={onClickContact} contact={contact} />
                </div>
                <div className="content-message">
                    {/* <Message contact={contact}  /> */}
                </div>
            </div>
        </div>
    )
}

export default ChatAdmin
