import './Payment.scss'

import { Box as BoxDefault, Gap } from '../../components'
import { useEffect, useState } from 'react'
import { ImageEmpty3D } from '../../assets'

// import api
import { API } from '../../config'

// mui component
import * as React from 'react';

const Payment = () => {
    const [dataTrans, setDataTrans] = useState([])
    const [alert, setAlert] = useState('')

    const getTransaction = async () => {
        try {
            const response = await API.get('/transaction')
            setDataTrans(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(alert, 'alert')
    const waitingPayment = dataTrans.filter(item => item.status === 'Waiting payment')
    useEffect(()=> {
        getTransaction()
    }, [alert])
    

    return (
        <div className="payment header-default">
            <div className="hero"></div>
            <Gap height={50} />
            {
                !waitingPayment.length ? 
                <p className="text-center"><img style={{width: '450px', maxWidth: '90%'}} src={ImageEmpty3D} alt="" /></p>
                :
                waitingPayment.map(item => {
                    return (
                        <BoxDefault 
                            variant='payment' 
                            name={item?.trip?.title} 
                            country={item?.trip.country?.name}
                            type={item?.trip?.type}  
                            count={item?.counterQty} 
                            status={item.status}
                            item={item}
                            setstate={{setAlert}} />
                    )
                })
            }
        </div>
    )
}

export default Payment
