import './Payment.scss'
import { PaymentBox, Gap } from '../../components'
import { useEffect, useState } from 'react'
import { ImageEmpty3D } from '../../assets'
import { toast } from 'react-toastify'

// import api
import { API } from '../../config'

// mui component
import * as React from 'react';

const Payment = () => {
    const [dataTrans, setDataTrans] = useState([])

    const getTransaction = async () => {
        try {
            const response = await API.get('/transaction')
            setDataTrans(response.data.data)
        } catch (error) {
            const message = error?.response?.data?.message || error?.message
            toast.error(message || 'Unknow error')
        }
    }

    const waitingPayment = dataTrans.filter(item => item.status === 'Waiting payment')
    
    useEffect(()=> {
        getTransaction()
    }, [])
    

    return (
        <div className="payment header-default">
            <div className="hero"></div>
            {
                !waitingPayment.length ? 
                <p className="text-center">
                    <img style={{width: '400px', maxWidth: '90%'}} src={ImageEmpty3D} alt="" />
                    <p>Your payment is empty right now</p>
                </p>
                :
                <>
                    <Gap height={50} />
                    {waitingPayment.map(item => {
                        return (
                            <PaymentBox 
                                name={item?.trip?.title} 
                                country={item?.trip.country?.name}
                                type={item?.trip?.type}  
                                count={item?.counterQty} 
                                status={item.status}
                                item={item} 
                                fetching={getTransaction}
                            />
                        )
                    })}
                </>
            }
        </div>
    )
}

export default Payment
