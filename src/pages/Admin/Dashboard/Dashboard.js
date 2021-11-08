import './_Dashboard.scss'
import { Box as BoxDefault, Gap, SidebarAdmin } from '../../../components'
import { warningButton, successButton } from '../../../utils'
import { useEffect, useState } from 'react'

// IMPORT API
import { API } from '../../../config'

// chart
import { Bar } from 'react-chartjs-2'

// mui component
import * as React from 'react';
import { Button } from "@mui/material" 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const Dashboard = () => {
    const [dataUser, setDataUser] = useState([])
    const [usersLength, setUsersLength] = useState(0)
    const [adminsLength, setAdminsLength] = useState(0)
    const [tripsLength, setTripsLength] = useState(0)
    const [transLength, setTransLength] = useState(0)
    const [isChangging, setIsChangging] = useState(false)
    const [currentUser, setCurrentUser] = useState({
        id: '',
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: '',
        avatar: ''
    })

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
            data: [usersLength, adminsLength, tripsLength, transLength]
            }
        ]
    })

    const getUsers = async () => {
        try {
            const response = await API.get('/users')
            const { data } = response?.data
            setUsersLength(data?.length)
            setDataUser(data)

            const admins = data?.filter((item) => item.role === 'admin')
            setAdminsLength(admins?.length)
        } catch (error) {
            console.log(error)
        }
    }

    const getTrips = async () => {
        try {
            const response = await API.get('/trips')
            const { data } = response?.data

            setTripsLength(data?.length)
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
        const data = [usersLength, adminsLength, tripsLength, transLength]
        setDataChart({
            labels: ['User', 'Admin', 'Trip', 'Transaction'],
            datasets: [
                {
                label: 'Total Data',
                fill: true,
                lineTension: 0.5,
                backgroundColor: ['rgba(75,192,192,1)', 'rgb(220, 41, 41)', 'rgb(41, 220, 116)', 'rgb(220, 148, 41)'],
                borderColor: 'rgb(179, 120, 228)',
                borderWidth: 2,
                data
                }
            ]
        })
    }

    useEffect(()=> {
        getUsers()
        getTrips()
        getTransactions()
    }, [isChangging])

    useEffect(()=> {
        setChart()
    }, [usersLength, adminsLength, tripsLength, transLength])

    // mui function
    const [isOpen, setIsOpen] = useState(false)

    const btnSwitchToAdmin = {
        backgroundColor: '#34BE82',
        marginRight: '5px',
        '&:hover': {
            backgroundColor: '#2FDD92'
        }
    }

    const btnSwitchToUser = {
        backgroundColor: '#FF8243',
        marginLeft: '5px',
        '&:hover': {
            backgroundColor: '#FDA65D'
        }
    }

    const handleClose = () => setIsOpen(false)
    const handleClick = (item, target) => {
        setCurrentUser({
            ...item,
            role: target
        })

        setIsOpen(true)
    }
    // close

    const handleChangeRole = async () => {
        try {
            const body = JSON.stringify(currentUser)

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            
            await API.patch('/user/' + currentUser.id, body, config)
            
            setIsChangging(isChangging ? false : true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="header-default">
            <div className="hero"></div>
            <div className="dashboard">
                <div className="left-section__dashboard">
                    <SidebarAdmin activein="dashboard" />
                </div>
                <div className="right-section__dashboard">
                    <div className="main">
                        <div className="d-flex-between">
                            <BoxDefault variant="box-dashboard" theme="gradient-blue" heading="User" text={usersLength}  />
                            <BoxDefault variant="box-dashboard" theme="gradient-red" heading="Admin" text={adminsLength}  />
                            <BoxDefault variant="box-dashboard" theme="gradient-green" heading="Trip" text={tripsLength}  />
                            <BoxDefault variant="box-dashboard" theme="gradient-yellow" heading="Transaction" text={transLength}  />
                        </div>
                        <Gap height={40} />
                        <div>
                            <Bar
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
                        <Gap height={40} />
                        <TableContainer component={Paper}>
                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <p style={{padding: '15px', fontWeight: '500', fontSize: '20px'}}>Detail User</p>
                                    <TableRow>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Phone</TableCell>
                                        <TableCell align="center">Address</TableCell>
                                        <TableCell align="center">Admin</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataUser.map(item => {
                                        return (
                                            <TableRow>
                                                <TableCell align="center">{item.fullName}</TableCell>
                                                <TableCell align="center">{item.phone}</TableCell>
                                                <TableCell align="center">{item.address}</TableCell>
                                                <TableCell align="center">{item.role === 'admin' ? 'yes' : 'no'}</TableCell>
                                                <TableCell align="center">
                                                    <Button variant="contained" sx={btnSwitchToAdmin} onClick={()=> handleClick(item, 'admin')}>Admin</Button>
                                                    <Button variant="contained" sx={btnSwitchToUser} onClick={()=> handleClick(item, 'user')}>User</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isOpen}
                onClick={handleClose}
            >
                <Card sx={{ width: 500, maxWidth: '90%', p: '10px 20px' }}>
                    <CardContent>
                        <p>Are you sure about that? You can change it again if you are not sure</p>
                        <Gap height={20} />
                    </CardContent>
                    <CardActions>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'right'}}>
                            <div><Button variant="contained" sx={successButton} onClick={()=> handleChangeRole('admin')}>change</Button></div>
                            <div style={{marginLeft: '10px'}}><Button variant="contained" sx={warningButton}>cancel</Button></div>
                        </div>
                    </CardActions>
                </Card>
            </Backdrop>
        </div>
    )
}

export default Dashboard
