import './DetailTrip.scss'
import { useHistory, useParams } from "react-router"
import { Gap, Text } from '../../components'
import { IconHotel, IconPlane, IconMeal, IconTime, IconCalendar } from '../../assets'
import { muiButton, setData, showLoginModal } from '../../utils'
import { useEffect, useState } from 'react'

import { API } from '../../config'

// mui component
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const DetailTrip = () => {
    
    document.title = `DeweTour | Detail Trip`

    const history = useHistory()
    const { id } = useParams()

    const [detailTrip, setDetailTrip] = useState({})
    const [count, setCount] = useState(1)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({
        counterQty: '',
        total: '',
        status: 'Waiting payment',
        attachment: '',
        tripId: '',
        userId: ''
    })

    const getDetailTrip = async (id) => {
        try {
            const response = await API.get('/trip/' + id)
            setDetailTrip(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDetailTrip(id)
    }, [])

    const { 
        accomodation, 
        dateTrip,  
        day,
        description,
        eat,
        image,
        night,
        quota,
        price,
        title,
        transportation,
        type,
        country
    } = detailTrip
    
    const allCoverImage = image?.slice(1)

    if (!Number(id)) {
        history.push('/')
    }
    
    const handleClick = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }

    const totalPrice = price * count
    
    // convert totalprice from integer to string
    const totalPriceInString = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const priceInString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // for handling booking button 
    const users = useSelector(state => state)
    const userId = users.user.id

    // filter date
    const filterDateTrip = dateTrip?.split(':')[0].split('T')[0].split('-').reverse().join('-')

    // for set data
    useEffect(()=> {
        setForm({
            ...form,
            counterQty: count,
            total: isNaN(totalPrice) ? price : totalPrice,
            status: 'Waiting payment',
            attachment: '',
            tripId: id,
            userId
        })
    }, [count])

    const handlerBooking = async () => { 
        try { 
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const formData = new FormData()
            formData.set('counterQty', form.counterQty)
            formData.set('total', form.total)
            formData.set('status', form.status)
            formData.set('attachment', form.attachment)
            formData.set('tripId', form.tripId)
            formData.set('userId', form.userId)
            
            await API.post('/transaction', formData, config) 

            if (users.isLogin) {
                setData('payment', form); 
                handleClick()
            } else {
                history.push('/')
                showLoginModal()
            }
        } catch (error) {
            console.log(error)   
        }
    }

    // mui action
    const action = (
        <>
            <Button color="secondary" size="small" onClick={handleClose}>
                CLOSE
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
            </IconButton>
        </>
    )

    setTimeout(() => {
        setLoading(false)
    }, 1500)

    return (
        <div className="detail-trip">
            <div className="hero"></div>
            <Gap height={66} />
            <div className="main">
                <div className="listTour">
                    <Text variant="h1" fontSize={48}>{title}</Text>
                    <Text variant="p" className="color-second">{country?.name}</Text>
                    <Gap height={27} />
                    <div className="content__listTour">
                        {
                            loading ?
                            ''
                            :
                            <img className="heading-img__listTour" src={detailTrip?.image[0]} alt="new york" />
                        }
                        <ul className="wrapper-child__listTour">
                            {
                                allCoverImage?.map((img) => {
                                    return (
                                        // need watched
                                        <li className="child-cover-image__listTour"><img src={img} alt={img} /></li>
                                    )
                                })
                            }
                            
                        </ul>
                        <Gap height={46.88} />
                        <div className="information__listTour">
                            <Text variant="bold" title="Information trip" />
                            <Gap height={20} />
                            <ul className="d-flex-between flex-responsive">
                                <li>
                                    <Text variant="p" className="color-second">Accomodation</Text>
                                    <div className="wrapper-iconic">
                                        <img src={IconHotel} alt="Hotel 4 Nights" />
                                        <Text variant="bold">{accomodation}</Text>
                                    </div>
                                </li>
                                <li>
                                    <Text variant="p" className="color-second">Transportation</Text>
                                    <div className="wrapper-iconic">
                                    <img src={IconPlane} alt="Qatar Airways" />
                                        <Text variant="bold">{transportation}</Text>
                                    </div>
                                </li>
                                <li>
                                    <Text variant="p" className="color-second">Eat</Text>
                                    <div className="wrapper-iconic">
                                        <img src={IconMeal} alt="Included as ltinerary" />
                                        <Text variant="bold">{eat}</Text>
                                    </div>
                                </li>
                                <li>
                                    <Text variant="p" className="color-second">Duration</Text>
                                    <div className="wrapper-iconic">
                                        <img src={IconTime} alt="6 Day 4 Night" />
                                        <Text variant="bold">{day} Day {night} Night</Text>
                                    </div>
                                </li>
                                <li>
                                    <Text variant="p" className="color-second">Date Trip</Text>
                                    <div className="wrapper-iconic">
                                        <img src={IconCalendar} alt="26 August 2020" />
                                        <Text variant="bold">{filterDateTrip}</Text>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <Gap height={48} />
                        <Text variant="bold">Description</Text>
                        <Text variant="p" fontSize={14} className="color-second">
                            {description}
                        </Text>
                        <Gap height={26} />
                        <div className="group d-flex-between">
                            <div className="d-flex">
                                <Text variant="bold" fontSize={24} className="color-theme">{`${type} ${priceInString}`}</Text>
                                <Text variant="bold" fontSize={24} className="ml-s">/ Person</Text>
                            </div>
                            <div className="d-flex">
                                <Button variant="contained" sx={muiButton} onClick={() => count === 1 ? '' : setCount(count - 1)}>-</Button>
                                <Text variant="bold" fontSize={24} className="total-count">{count}</Text>
                                <Button variant="contained" sx={muiButton} onClick={()=> count === quota ? '' : setCount(count + 1)}>+</Button>
                            </div>
                        </div>
                        <div className="group-total d-flex-between">
                            <Text variant="bold" fontSize={24} className="total-count">Total :</Text>
                            <Text variant="bold" fontSize={24} className="total-count color-theme">{`${type} ${totalPriceInString}`}</Text>
                        </div>
                        <p className="text-right">
                            <Button variant="contained" sx={muiButton} onClick={() => handlerBooking()}>Book now</Button>
                        </p>
                        <Gap height={44} />
                    </div>
                    <Snackbar sx={{
                        position: 'fixed',
                        bottom: 0,
                        zIndex: 999999999,
                        transform: 'translate(50px, -25px) scale(1.2)',
                        boxShadow: '0 0 50px rgba(0, 0, 0, .26)'
                    }} open={open} autoHideDuration={6000} onClose={handleClose} action={action}>

                        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                            Booking Success
                        </Alert>

                    </Snackbar>
                </div>
            </div>
        </div>
    )
}

export default DetailTrip
