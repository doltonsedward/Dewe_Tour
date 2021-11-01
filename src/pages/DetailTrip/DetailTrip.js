import './DetailTrip.scss'
import { useHistory, useParams } from "react-router"
import { Gap, Text } from '../../components'
import { DataTour, IconHotel, IconPlane, IconMeal, IconTime, IconCalendar } from '../../assets'
import { muiButton, setData, showLoginModal } from '../../utils'
import { useState } from 'react'

// mui component
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import { Alert } from '@mui/material'

const DetailTrip = () => {
    const { id } = useParams()
    const [count, setCount] = useState(1)
    const [open, setOpen] = useState(false);

    const history = useHistory()
    if (!Number(id)) {
        history.push('/')
    }

    const user = JSON.parse(localStorage.getItem('user'))
    
    const handleClick = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }

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

    
    const listTour = DataTour.filter((item) => item.id === id)
    // get data
    .map((item) => {
        const { 
            name, 
            country, 
            type, 
            price, 
            accomodation, 
            transportation,
            eat,
            duration, 
            dateTrip
        } = item

        


        // parse price to integer
        const numberPrice = parseInt(price.split(',').join(''))
        const totalPrice = numberPrice * count

        // convert totalprice from integer to string
        const totalPriceInString = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // object for payment, will send to localstorage
        const totalPayment = totalPriceInString
        const status = 'waiting'
        const filterName = name.split(' ')
        const nameFromFIltering = filterName.splice(0, 4).join(' ')
        const paymentInfo = { 
            ...item,
            status: status,
            name: nameFromFIltering,
            count: count,
            totalPayment: totalPayment
        }
        
        // for handling booking button
        const handlerBooking = () => {
            if (user.isLogin) {
                setData('payment', paymentInfo); 
                handleClick()
            } else {
                history.push('/')
                showLoginModal()
            }
        }
        return (
            <div className="listTour">
                <Text variant="h1" fontSize={48}>{name}</Text>
                <Text variant="p" className="color-second">{country}</Text>
                <Gap height={27} />
                <div className="content__listTour">
                    <img className="heading-img__listTour" src={"/assets/img/tour/" + item.tourCover} alt="new york" />
                    <ul className="wrapper-child__listTour">
                        {
                            item.allImage.map((listImg) => {
                                return (
                                    // need watched
                                    <li><img src={"/assets/img/tour/" + listImg} alt="" /></li>
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
                                    <Text variant="bold">{duration}</Text>
                                </div>
                            </li>
                            <li>
                                <Text variant="p" className="color-second">Date Trip</Text>
                                <div className="wrapper-iconic">
                                    <img src={IconCalendar} alt="26 August 2020" />
                                    <Text variant="bold">{dateTrip}</Text>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <Gap height={48} />
                    <Text variant="bold">Description</Text>
                    <Text variant="p" fontSize={14} className="color-second">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                    <Gap height={26} />
                    <div className="group d-flex-between">
                        <div className="d-flex">
                            <Text variant="bold" fontSize={24} className="color-theme">{`${type} ${price}`}</Text>
                            <Text variant="bold" fontSize={24} className="ml-s">/ Person</Text>
                        </div>
                        <div className="d-flex">
                            <Button variant="contained" sx={muiButton} onClick={() => count === 1 ? '' : setCount(count - 1)}>-</Button>
                            <Text variant="bold" fontSize={24} className="total-count">{count}</Text>
                            <Button variant="contained" sx={muiButton} onClick={() => setCount(count + 1)}>+</Button>
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
        )
    })

    return (
        <div className="detail-trip">
            <div className="hero"></div>
            <Gap height={66} />
            <div className="main">
                {listTour}
            </div>
        </div>
    )
}

export default DetailTrip
