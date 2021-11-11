const Contact = ({ datacontact, clickcontact, contact }) => {
    return (
        <>
            {datacontact.length > 0 && (
                <>
                    {datacontact.map(item => {
                        <>
                            <div 
                                key={item.id} 
                                className={`contact ${contact?.id === item?.id && 'contact active'}`}
                                onClick={()=> clickcontact(item)}
                            ></div>
                            <img width="20px" src={item?.avatar} />
                            <div className="ps-1 text-contact d-flex flex-column justify-content-around">
                                <p className="mb-0">{item.name}</p>
                                <p className="text-contact-chat mt-1 mb-0">
                                {item.message}
                                </p>
                            </div>
                        </>
                    })}
                </>
            )}
        </>
    )
}

export default Contact
