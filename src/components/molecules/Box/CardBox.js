import { Gap } from '../../atoms'

// mui component
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { useState } from 'react'

const CardBox = ({logo, heading, text}) => {
    const [loading, setLoading] = useState(true)

    setTimeout(()=> {
        setLoading(false)
    }, 1500)

    return (
        
        <div className="card-box">
            {
                loading ? 
                <Stack spacing={1}>
                    <Skeleton variant="circular" width={70} height={70} sx={{margin: '0 auto'}} />
                    <Skeleton variant="text" width={210} height={66} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </Stack>
                :
                <>
                    <img src={logo} alt={heading} />
                    <Gap height={24} />
                    <p className="heading__card-box">{heading}</p>
                    <Gap height={9} />
                    <p className="subheading__card-box">{text}</p>
                </>
            }
        </div>
    )
}

export default CardBox