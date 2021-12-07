import './_Dashboard.scss'
import { DashboardBox, Gap } from '../../../components'
import { warningButton } from '../../../utils'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// IMPORT API
import { API } from '../../../config'

// chart
import { Line } from 'react-chartjs-2'

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

// import socket.io-client
import { io } from 'socket.io-client'

let socket
const Dashboard = () => {
    console.clear()
    const currentState = useSelector(state => state)
    
    const dataLoyalUser = []
    const [dataUser, setDataUser] = useState([])
    const [trans, setTrans] = useState([])
    const [usersLength, setUsersLength] = useState(0)
    const [tripsLength, setTripsLength] = useState(0)
    const [transLength, setTransLength] = useState(0)

    const [dataChart, setDataChart] = useState({
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Transaction',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56] 
            }
        ] 
    }) 

    const getUsers = async () => {
        try {
            const response = await API.get('/users')
            const { data } = response?.data

            setUsersLength(data?.length)
            setDataUser(data)
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
            setTrans(data)
        } catch (error) {
            console.log(error)
        }
    } 

    const dataUserAfterTrans = []
    for (let i = 0; i < trans.length; i++) {
        const data = dataUser.filter(item => item.id === trans[i].userId)
        dataUserAfterTrans.push(...data) 
    }

    useEffect(()=> {
        socket = io('http://localhost:8080', {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                id: currentState.user.id
            }
        })

        socket.emit("load data trans")
        
        socket.on("data trans", data => {
            const dataLabels = []
            const newData = []

            data.map(item => {
                dataLabels.unshift(item.createdAt.split(':')[0].split('T')[0].split('-').reverse().join('-'))
                newData.unshift(item.counterQty)
            }) 

            setDataChart(prev => ({
                ...prev,
                labels: dataLabels,
                datasets: [
                    {
                        label: 'Transaction',
                        fill: false,
                        lineTension: 0,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: '#FFAF00',
                        borderWidth: 2,
                        data: newData
                    }
                ]
            })) 
        })
        
        getUsers()
        getTrips()
        getTransactions()
        return () => {
            socket.disconnect()
        }
    }, [])

    // mui function
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => setIsOpen(false)
    // close

    return (
        <div className="header-default">
            <div className="hero"></div>
            <div className="dashboard">
                <div className="right-section__dashboard">
                    <div className="main">
                        <div className="d-flex-between">
                            <DashboardBox variant="box-dashboard" theme="gradient-blue" heading="User" text={usersLength}  />
                            <DashboardBox variant="box-dashboard" theme="gradient-green" heading="Trip" text={tripsLength}  />
                            <DashboardBox variant="box-dashboard" theme="gradient-yellow" heading="Transaction" text={transLength}  />
                        </div>
                        <Gap height={40} />
                        <div>
                            <Line
                                data={dataChart}
                                options={{
                                    title:{
                                      display:true,
                                      text:'Average Rainfall per month',
                                      fontSize:20
                                    },
                                    responsive: true,
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
                                    <p style={{padding: '15px', fontWeight: '500', fontSize: '20px'}}>Data user</p>
                                    <TableRow>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Phone</TableCell>
                                        <TableCell align="center">Address</TableCell>
                                        <TableCell align="center">Number Transaction</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        {/* <TableCell align="center">Action</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataUser.map(item => {
                                        const totalTransByUser = trans.filter(users => users.user.id === item.id)
                                        if (totalTransByUser.length > 5) {
                                            dataLoyalUser.push(true)
                                        }

                                        console.log(totalTransByUser, 'trans by user')
                                        return (
                                            <TableRow>
                                                <TableCell align="center">{item.fullName}</TableCell>
                                                <TableCell align="center">{item.phone}</TableCell>
                                                <TableCell align="center">{item.address}</TableCell>
                                                <TableCell align="center">{totalTransByUser ? totalTransByUser.length : 0}</TableCell>
                                                <TableCell align="center">{totalTransByUser.length > 2 ? 'Loyal' : "Regular"}</TableCell>
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
                            <div style={{marginLeft: '10px'}}><Button variant="contained" sx={warningButton}>cancel</Button></div>
                        </div>
                    </CardActions>
                </Card>
            </Backdrop>
        </div>
    )
}

export default Dashboard
