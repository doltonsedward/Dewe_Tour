import './ListTransaction.scss'
import { Gap, Text, Box as BoxPayment } from '../../../components'
import { IconSearch } from '../../../assets'

// import api
import { API } from '../../../config';

// mui component
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

const ListTransaction = () => {
    const [open, setOpen] = useState(false);
    const [dataTransaction, setDataTransaction] = useState([])
    const [detailTrans, setDetailTrans] = useState({})
    const [isChangging, setIsChangging] = useState(false)

    const handleOpen = (e) => {
        setOpen(true)
        setDetailTrans({
            id: e.id,
            idTrip: e.trip.id,
            name: e.trip.title,
            qty: e.counterQty,
            type: e.trip.type,
            count: e.trip.price,
            filled: e.trip.filled,
            totalPayment: e.total,
            accomodation: e.trip.accomodation,
            transportation: e.trip.transportation,
            dateTrip: e.trip.dateTrip,
            duration: `${e.trip.day} Day ${e.trip.night} Night`,
            user: e.user,
            status: e.status,
            attachment: e.attachment
        })
    }

    const handleClose = () => setOpen(false);

    const getTransactions = async () => {
        try {
            const response = await API.get('/transactions')
            setDataTransaction(response?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(detailTrans, 'detail trans')
    console.log(dataTransaction, 'data transaction')

    useEffect(()=> {
        getTransactions()
    }, [])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 4,
    };

    let numberid = 1
    return (
        <div className="header-default main-content">
            <div className="hero"></div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <BoxPayment 
                            variant='payment-admin' 
                            item={detailTrans}
                            setstate={{setIsChangging, isChangging}}
                            />
                    </Box>
                </Fade>
            </Modal>
            <Gap height={105} />
            <div className="transaction-info">
                <Text variant="h1" fontSize={36}>Incoming Transaction</Text>
                <Gap height={29} />
                <table width="100%">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Users</th>
                            <th>Trip</th>
                            <th>Bukti Transfer</th>
                            <th>Status Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTransaction.map((item)=> {
                            const { id, status, attachment, trip, user } = item
                            const color = 
                            status === 'Approve' ? 'success' :
                            status === 'Waiting approval' ? 'pending' : 
                            status === 'Cancel' ? 'warning' : ''

                            if (status !== 'Waiting payment') {
                                return (
                                    <tr key={id}>
                                        <td>{numberid++}</td>
                                        <td>{user?.fullName}</td>
                                        <td>{trip?.title}</td>
                                        <td><img width="150px" src={attachment} alt={trip?.title} /> </td>
                                        <td className={"color-" + color}>{status}</td>
                                        <td onClick={()=> handleOpen(item)}><img src={IconSearch} alt="for help you to search something" /></td>
                                    </tr>
                                )
                            } 
                        })}
                    </tbody> 
                </table> 
            </div> 
            <a href=""></a> 
            <Gap height={91} /> 
        </div> 
    )
}

export default ListTransaction 