import './Message.scss'
import Avatar from '@mui/material/Avatar'
import { Gap } from '../..'
import { ImgInboxCleanUp } from '../../../assets'

const Message = ({ contact, user, messages, sendmessage }) => {
    return (
        <>
        {contact ? (
            <>
                <div id="chat-messages" >
                {messages.map((item, index) => (
                    <div key={index}>
                        <div className={`d-flex align-items-end ${item.idSender === user.id ? "justify-content-end" : "justify-content-start"}`}>
                            {item.idSender !== user.id && (
                                <>
                                    <Avatar alt={contact?.fullName} src={contact?.avatar} />
                                    <Gap width={10} />
                                </>
                            )}
                            <div
                            className={item.idSender === user.id ? "chat-from-me block-chat" : "chat-from-other block-chat"}
                            >
                            {item.message}
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                <div className="wrapper-input-message">
                    <input 
                        placeholder="Send Message" 
                        className="input-message px-4" 
                        onKeyPress={sendmessage} />
                </div>
            </>
        ) : (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <div>
                    No Message
                </div>
                <Gap height={30} />
                <div style={{ textAlign: 'center' }}>
                    <img width="280px" src={ImgInboxCleanUp} alt="empty message" />
                </div>
            </div>
        )}
        </>
    )
}

export default Message
