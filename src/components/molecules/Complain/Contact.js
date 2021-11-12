import './_Contact.scss'

// MUI component
import Avatar from '@mui/material/Avatar'
import { StyledBadge } from '../../../utils'

const Contact = ({ datacontact, clickcontact, contact }) => {
    return (
        <div className="wrapper-contact">
            {datacontact.map((item, index) => (
                <>
                    <div 
                        key={index} 
                        className={`contact ${contact?.id === item?.id && 'contact active'}`}
                        onClick={()=> clickcontact(item)}
                    ></div>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt={item?.fullName} src={item?.avatar} />
                    </StyledBadge>
                    <div className="ml-m">
                        <p className="contact-name">{item.fullName}</p>
                        <p className="text-contact-chat mt-1 mb-0">
                        {item.message}
                        </p>
                    </div>
                </>
            ))}
        </div>
    )
}

export default Contact
