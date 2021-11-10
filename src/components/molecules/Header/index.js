import './Header.scss'
import { dropDown, redButton, showLoginModal, showRegisterModal } from '../../../utils'
import { IconUser, IconBill, IconTrip } from '../../../assets'
import { Gap } from '../../atoms'
import store from '../../../store'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { useEffect } from 'react'
import { useState } from 'react'

import QRCode from "react-qr-code";

// MUI component
import * as React from 'react';
import { Button } from '@mui/material'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import Input from '@mui/material/Input';

// MUI icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import CreateIcon from '@mui/icons-material/Create';
import BuildIcon from '@mui/icons-material/Build';
import QrCodeScannerTwoToneIcon from '@mui/icons-material/QrCodeScannerTwoTone';
import SendIcon from '@mui/icons-material/Send';


const Header = ({logo}) => {
    const history = useHistory()
    const currentState = useSelector(state => state)
    
    const isLoginSession = useSelector(state => state.isLogin)

    const [open, setOpen] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [tools, setTools] = useState(false)
    const [colorBadge, setColorBadge] = useState('secondary')
    const [text, setText] = useState('Hello world')
    const [speedDialExist, setSpeedDialExist] = useState(false)

    // state for content
    const [contentTools, setContentTools] = useState(false)
    const [contentNotes, setContentNotes] = useState(false)

    useEffect(()=> {
        if (currentState.user.role === 'admin') {
            setIsAdmin(true)
        }
    }, [currentState])
    
    const logoutSession = () => {
        setIsAdmin(false)
        const email = currentState.user.email
        const password = currentState.user.password
        store.dispatch({
            type: 'LOGOUT',
            payload: {
                email: email,
                password: password
            }
        })

        history.push('/')
    }

    const handleClick = () => setOpen(open ? false : true)

    // const handleOpenMui = () => setTools(true)
    
    const handleCloseMui = () => setTools(false)
    const handleToggleMui = () => setTools(tools ? false : true)

    const handleChange = (e) => {
        setText(e.target.value)
        console.log(document.getElementById('testing'), 'ss')
    }

    const onImageCownload = () => {
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = "DeweTour QRCode";
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    const handleQrCode = () => {
        setContentTools(contentTools ? false : true)

        handleToggleMui()
    }

    const handleSpeedDial = () => {
        setSpeedDialExist(speedDialExist ? false : true)
        setColorBadge(colorBadge === 'primary' ? 'secondary' : 'primary')
    }

    const actions = [
        { icon: <QrCodeScannerTwoToneIcon onClick={handleQrCode} />, name: 'QrCode' }
    ];

    if (isAdmin) {
        return (
            <>
            <header className="d-flex-between">
                <img src={logo} className="c-pointer" alt="this is logo" onClick={()=> history.push('/')} />
                <div className="section-button__header">
                    <div className="profile" onClick={dropDown}>
                        <Badge variant="dot" color={colorBadge} onClick={handleSpeedDial}>
                            <BuildIcon sx={{color: 'white'}} />
                        </Badge>
                        <img style={{marginLeft: '30px'}} className="profile-image" src={currentState.user.avatar} alt="profile" />
                        <div className="dropdown">
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '5px' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                >
                                <ListItemButton onClick={handleClick}> 
                                    <ListItemIcon>
                                        <ViewListIcon sx={{color: '#89B5AF'}} />
                                    </ListItemIcon>
                                    <ListItemText primary="Panel" />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{ pl: 4 }} onClick={()=> history.push('/admin/dashboard')}>
                                            <ListItemIcon>
                                                <DashboardIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Dashboard" />
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 4 }} onClick={()=> history.push('/admin/dashboard/maintenance')}>
                                            <ListItemIcon>
                                                <BuildCircleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Maintence" />
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <ListItemIcon>
                                                <AppsIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="App" onClick={()=> history.push('/admin/dashboard/application')} />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                                <ListItemButton onClick={()=> history.push('/trip')}>
                                    <ListItemIcon>
                                        <img src={IconTrip} alt="profile" />
                                    </ListItemIcon>
                                    <ListItemText primary="Trip" />
                                </ListItemButton>
                                <ListItemButton onClick={()=> history.push('/list-transaction')}>
                                    <ListItemIcon>
                                        <AccountBalanceWalletIcon sx={{color: '#FDA856'}} />
                                    </ListItemIcon>
                                    <ListItemText primary="Transaction" />
                                </ListItemButton>
                                <Divider />
                                <ListItemButton onClick={logoutSession}>
                                    <ListItemIcon>
                                        <LogoutIcon sx={{color: '#F73859'}} />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </List>
                        </div>
                    </div>
                </div>
            </header>
            <Backdrop open={tools} onClick={handleCloseMui} />
            <div className="tools">
                {
                    contentTools ? 
                    <div className="qrcode__tools">
                        <div className="content-qrcode__tools">
                            <TextField label="Text qr-code" variant="outlined" onChange={handleChange} />
                            <QRCode id="QRCode" value={text} />
                            <p style={{textAlign: 'center'}}>{text}</p>
                            <Button variant="contained" onClick={onImageCownload}>Download Image</Button>
                        </div>
                    </div>
                    : null
                }
            </div>
            {
                speedDialExist ?
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    icon={<SpeedDialIcon />}
                    sx={{ position: 'fixed', bottom: 25, right: 25 }}
                >
                    {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                    />
                    ))}
                </SpeedDial>
                : null
            }
            </>
        )
    } else if (isLoginSession) {
        return (
            <header className="d-flex-between">
                <img src={logo} className="c-pointer" alt="this is logo" onClick={()=> history.push('/')} />
                <div className="section-button__header">
                    <div className="profile" onClick={dropDown}>
                        <img className="profile-image" src={currentState.user.avatar} alt="profile" />
                        <div className="dropdown">
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '5px' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                >
                                <ListItemButton onClick={()=> history.push('/profile')}> 
                                    <ListItemIcon>
                                        <img src={IconUser} alt="profile" />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </ListItemButton>
                                <ListItemButton onClick={()=> history.push('/payment')}>
                                    <ListItemIcon>
                                        <img src={IconBill} alt="pay if you ready to it" />
                                    </ListItemIcon>
                                    <ListItemText primary="Pay" />
                                </ListItemButton>
                                <Divider />
                                <ListItemButton onClick={logoutSession}>
                                    <ListItemIcon>
                                        <LogoutIcon sx={{color: '#F73859'}} />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </List>
                        </div>
                    </div>
                </div>
            </header>
        )
    } else {
        return (
            <header className="d-flex-between">
                <img src={logo} className="c-pointer" alt="this is logo" onClick={()=> history.push('/')} />
                <div className="section-button__header">
                    <button className="btn-login" id="btnLogin" onClick={showLoginModal}>Login</button>
                    <button className="btn-warning ml-m" id="btnRegister" onClick={showRegisterModal}>Register</button>
                </div>
            </header>
        )
    }
}



export default Header