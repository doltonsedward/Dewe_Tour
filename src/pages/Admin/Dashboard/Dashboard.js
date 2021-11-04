import { useHistory } from 'react-router'
import { Box } from '../../../components'
import './_Dashboard.scss'

const Dashboard = () => {
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
                        <Box variant="box-dashboard" heading="User" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
