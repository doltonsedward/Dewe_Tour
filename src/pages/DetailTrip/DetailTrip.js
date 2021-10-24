import './DetailTrip.scss'
import { useParams } from "react-router"
import { Gap, Text } from '../../components'
import { DataTour, IconHotel, IconPlane, IconMeal, IconTime, IconCalendar } from '../../assets'
import Button from '@mui/material/Button'
import { muiButton, setData } from '../../utils'
import { useState } from 'react'

const DetailTrip = () => {
    const { id } = useParams()
    const [count, setCount] = useState(1)

    const listTour = DataTour.filter((item) => item.id === id)
        .map((item) => {
        const { name, country, type, price } = item

        // parse price to integer
        const numberPrice = parseInt(price.split(',').join(''))
        const totalPrice = numberPrice * count

        // convert totalprice from integer to string
        const totalPriceInString = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // object for payment, will send to localstorage
        const totalPayment = totalPriceInString
        const status = 'waiting'
        const paymentInfo = { name, country, type, price, count, totalPayment, status }
        
        return (
            <div className="listTour">
                <Text variant="h1">{name}</Text>
                <Text variant="p" className="color-second">{country}</Text>
                <Gap height={27} />
                <div className="content__listTour">
                    <img className="heading-img__listTour" src={"/assets/img/tour/" + item.image} alt="new york" />
                    <ul className="wrapper-child__listTour">
                        {
                            item.allImage.map((listImg) => {
                                return (
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
                                    <Text variant="bold">Hotel 4 Nights</Text>
                                </div>
                            </li>
                            <li>
                                <Text variant="p" className="color-second">Transportation</Text>
                                <div className="wrapper-iconic">
                                <img src={IconPlane} alt="Qatar Airways" />
                                    <Text variant="bold">Qatar Airways</Text>
                                </div>
                            </li>
                            <li>
                                <Text variant="p" className="color-second">Transportation</Text>
                                <div className="wrapper-iconic">
                                    <img src={IconMeal} alt="Included as ltinerary" />
                                    <Text variant="bold">Included as ltinerary</Text>
                                </div>
                            </li>
                            <li>
                                <Text variant="p" className="color-second">Transportation</Text>
                                <div className="wrapper-iconic">
                                    <img src={IconTime} alt="6 Day 4 Night" />
                                    <Text variant="bold">6 Day 4 Night</Text>
                                </div>
                            </li>
                            <li>
                                <Text variant="p" className="color-second">Transportation</Text>
                                <div className="wrapper-iconic">
                                    <img src={IconCalendar} alt="26 August 2020" />
                                    <Text variant="bold">26 August 2020</Text>
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
                            <Button variant="contained" sx={muiButton} onClick={() => setCount(count - 1)}>-</Button>
                            <Text variant="bold" fontSize={24} className="total-count">{count}</Text>
                            <Button variant="contained" sx={muiButton} onClick={() => setCount(count + 1)}>+</Button>
                        </div>
                    </div>
                    <div className="group-total d-flex-between">
                        <Text variant="bold" title="Total: " fontSize={24} className="total-count" />
                        <Text variant="bold" fontSize={24} className="total-count">{`${type} ${totalPriceInString}`}</Text>
                    </div>
                    <p className="text-right">
                        <Button variant="contained" sx={muiButton} onClick={() => setData('payment', paymentInfo)}>Book now</Button>
                    </p>
                    <Gap height={44} />
                </div>
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
