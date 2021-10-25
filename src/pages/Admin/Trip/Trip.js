import './Trip.scss'

import { DataTour } from '../../../assets/'
import { Gap, Text, Group, Box } from '../../../components'
import { useHistory } from 'react-router'
import { muiButton } from '../../../utils'

// mui component
import { Button } from '@mui/material'

const Trip = () => {
    const history = useHistory()
    return (
        <div className="header-default">
            <div className="hero"></div>
                <Gap height={105} />
                <div className="wrapper-list-trip">
                    <Group variant="space-between">
                        <Text variant="h1" fontSize={36}>Income Trip</Text>
                        <Button variant="contained" sx={muiButton}>add trip</Button>
                    </Group>
                    <div className="row">
                        {DataTour.map((item) => (
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
