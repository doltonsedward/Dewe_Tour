const Chat = ({ contact, user, message, sendmessage }) => {
    return (
        <>
        {contact ? (
            <>
                <div>
                    Contact here
                </div>
            </>
        ) : (
            <div>
              No Message
            </div>
        )}
        </>
    )
}

export default Chat
