import './_Dashboard.scss'
import { Button } from '@mui/material'
import { useHistory } from 'react-router'
import { Gap, Text } from '../../../components'
import { muiButton } from '../../../utils'

const Maintenance = () => {
    const history = useHistory()
    return (
        <div className="header-default">
            <div className="hero"></div>
            <div className="dashboard">
                <div className="left-section__dashboard">
                    <ul>
                        <li>Dashboard</li>
                        <li onClick={()=> history.push('/admin/dashboard/maintenance')}>Maintenance</li>
                        <li></li>
                    </ul>
                </div>
                <div className="right-section__dashboard">
                    <div className="main">
                        <Text variant="h1" fontSize={20}>Clearing storage in backend</Text>
                        <Gap height={20} />
                        <Button variant="contained" sx={muiButton}>Trip</Button>
                        <Button variant="contained" sx={muiButton}>Payment</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Maintenance
