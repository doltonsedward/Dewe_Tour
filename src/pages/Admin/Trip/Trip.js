import './Trip.scss'

import { useEffect, useState } from 'react'
import { Gap, Text, Group, Box } from '../../../components'
import { useHistory } from 'react-router'
import { muiButton } from '../../../utils'

// import api
import { API } from '../../../config'

// mui component
import { Button } from '@mui/material'

const Trip = () => {
    const history = useHistory()

    const [dataTrip, setDataTrip] = useState([])

    const getTrips = async () => {
        try {
            const response = await API.get('/trips')
            setDataTrip(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getTrips()
    }, [])

    return (
        <div className="header-default">
            <div className="hero"></div>
                <Gap height={105} />
                <div className="wrapper-list-trip">
                    <Group variant="space-between">
                        <Text variant="h1" fontSize={36}>Income Trip</Text>
                        <Button variant="contained" sx={muiButton} onClick={()=> history.push('/add-trip')}>add trip</Button>
                    </Group>
                    <div className="row">
                        {dataTrip.map((item) => (
                            <Box key={item.id} className="col-4 col-s-6"
                                variant="content" 
                                item={item}
                                subtext="Australia"
                                onClick={()=> history.push('/detail-trip/' + item.id)}
                            />
                        ))}
                    </div>
                </div>
            <Gap height={121} />
        </div>
    )
}

export default Trip
