import './ListTransaction.scss'
import { Gap, Text, Box as BoxPayment } from '../../../components'
import { IconSearch } from '../../../assets'

// mui component
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { useState } from 'react';

const ListTransaction = () => {
    const dataTransaction = JSON.parse(localStorage.getItem('transaction'))
    const dataPayment = JSON.parse(localStorage.getItem('payment'))

    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 4,
      };
    
    const { name, country, type, count, totalPayment, status } = dataPayment
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
                            name={name} 
                            country={country} 
                            type={type} 
                            count={count} 
                            totalPayment={totalPayment}
                            status='success'
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
                            const { id, name, trip, buktiTransfer, status } = item
                            const color = 
                            status === 'Approve' ? 'success' :
                            status === 'Pending' ? 'pending' : 
                            status === 'Cancel' ? 'warning' : ''

                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{trip}</td>
                                    <td>{buktiTransfer}</td>
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
