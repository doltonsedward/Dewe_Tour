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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getTransactions = async () => {
        try {
            const response = await API.get('/transactions')
            setDataTransaction(response?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getTransactions()
    }, [])

    console.log(dataTransaction, 'data transaction')

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 4,
      };
    
    const { counterQty, status, total } = dataTransaction
    return (
        <div className="header-default">
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
                            variant='payment' 
                            name={dataTransaction?.user?.fullName} 
                            country='Australia'
                            type={dataTransaction?.trip?.type} 
                            count={counterQty} 
                            totalPayment={total}
                            status={status}
                            onClick={handleOpen} />
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
                            status === 'Waiting payment' ? 'pending' : 
                            status === 'Cancel' ? 'warning' : ''

                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{user?.fullName}</td>
                                    <td>{trip?.title}</td>
                                    <td>{attachment}</td>
                                    <td className={"color-" + color}>{status}</td>
                                    <td onClick={handleOpen}><img src={IconSearch} alt="for help you to search something" /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Gap height={91} />
        </div>
    )
}

export default ListTransaction
