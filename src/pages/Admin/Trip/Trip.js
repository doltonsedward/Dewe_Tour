import './_Trip.scss'

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
    const [isActButton, setIsActButton] = useState('hidden')

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

    const actionButton = () => {
        isActButton === 'hidden' ? setIsActButton('active') : setIsActButton('hidden')
    }

    const newMuiButton = {
        ...muiButton,
        marginLeft: '10px'
    }

    return (
        <div className="header-default">
            <div className="hero"></div>
                <Gap height={105} />
                <div className="wrapper-list-trip">
                    <Group variant="space-between">
                        <Text variant="h1" fontSize={36}>Income Trip</Text>
                        <div>
                            <Button variant="contained" sx={muiButton} onClick={()=> history.push('/add-trip')}>add trip</Button>
                            <Button variant="contained" sx={newMuiButton} onClick={()=> history.push('/add-country')}>add country</Button>
                            <Button variant="contained" sx={newMuiButton} onClick={actionButton}>action</Button>
                        </div>
                    </Group>
                    <div className="row">
                        {dataTrip.map((item) => {
                            const wrapperBox = `wrapper-box__trip ${isActButton}`
                            return (
                                <div className={wrapperBox}>
                                    <Box key={item.id} className="col-4 col-s-6"
                                        variant="content" 
                                        item={item}
                                        subtext="Australia"
                                        onClick={()=> history.push('/detail-trip/' + item.id)}
                                    />
                                </div>
                            )}
                        )}
                    </div>
                </div>
            <Gap height={121} />
        </div>
    )
}

export default Trip
