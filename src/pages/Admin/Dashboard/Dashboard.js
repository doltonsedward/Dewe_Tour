import './_Dashboard.scss'
import { useHistory } from 'react-router'
import { Box, Gap } from '../../../components'
import { useEffect, useState } from 'react'

// IMPORT API
import { API } from '../../../config'

import { Line } from 'react-chartjs-2'

const Dashboard = () => {
    const history = useHistory()

    const [usersLength, setUsersLength] = useState(0)
    const [adminsLength, setAdminsLength] = useState(0)
    const [tripsLength, setTripsLength] = useState(0)
    const [transLength, setTransLength] = useState(0)
    const [dataChart, setDataChart] = useState({
        labels: ['June', 'July', 'August', 'October', 'November'],
        datasets: [
            {
            label: 'Total Data',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgb(179, 120, 228)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
            }
        ]
    })

    const getUsers = async () => {
        try {
            const response = await API.get('/users')
            const { data } = response.data
            setUsersLength(data.length)

            const admins = data.filter((item) => item.role === 'admin')
            setAdminsLength(admins.length)
        } catch (error) {
            console.log(error)
        }
    }

    const getTrips = async () => {
        try {
            const response = await API.get('/trips')
            const { data } = response.data

            setTripsLength(data.length)
        } catch (error) {
            console.log(error)
        }
    }

    const getTransactions = async () => {
        try {
            const response = await API.get('/transactions')
            const { data } = response.data

            setTransLength(data.length)
        } catch (error) {
            console.log(error)
        }
    }

    const setChart = () => {
        setDataChart({
            labels: ['June', 'July', 'August', 'October', 'November'],
            datasets: [
                {
                label: 'Total Data',
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgb(179, 120, 228)',
                borderWidth: 2,
                data: [0, 0, 0, 2, 10]
                }
            ]
        })
    }

    useEffect(()=> {
        getUsers()
        getTrips()
        getTransactions()
        setChart()
    }, [])
    
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
                        <div className="d-flex-between">
                            <Box variant="box-dashboard" theme="gradient-blue" heading="User" text={usersLength}  />
                            <Box variant="box-dashboard" theme="gradient-red" heading="Admin" text={adminsLength}  />
                            <Box variant="box-dashboard" theme="gradient-green" heading="Trip" text={tripsLength}  />
                            <Box variant="box-dashboard" theme="gradient-yellow" heading="Transaction" text={transLength}  />
                        </div>
                        <Gap height={40} />
                        <div>
                            <Line
                                data={dataChart}
                                options={{
                                    title:{
                                    display:true,
                                    text:'Average Total Data per month',
                                    fontSize:20
                                    },
                                    legend:{
                                    display:true,
                                    position:'right'
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
