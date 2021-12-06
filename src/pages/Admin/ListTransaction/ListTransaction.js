import './ListTransaction.scss'
import { Gap, Text, PaymentAdminBox } from '../../../components'
import { IconSearch } from '../../../assets'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

// import api
import { API } from '../../../config';

// mui component
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { 
    Backdrop,
    Modal,
    Fade,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material'

const ListTransaction = () => {
    const [open, setOpen] = useState(false);
    const [dataTransaction, setDataTransaction] = useState([])
    const [detailTrans, setDetailTrans] = useState({})

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
            const message = error?.response?.data?.message || error?.message
            toast.error(message || 'Unknow error')
        }
    }

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
                        <PaymentAdminBox 
                            item={detailTrans}
                            setter={{ setOpen }}
                            fetching={{ getTransactions }}
                            func={{ toast, API }}
                        />
                    </Box>
                </Fade>
            </Modal>
            <Gap height={105} />
            <div className="transaction-info">
                <Text variant="h1" fontSize={36}>Incoming Transaction</Text>
                <Gap height={29} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Users</TableCell>
                                <TableCell>Trip</TableCell>
                                <TableCell className="link-image text-elipsis" width={100}>Bukti Transfer</TableCell>
                                <TableCell>Status Payment</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataTransaction.map((item)=> {
                                const { id, status, attachment, trip, user } = item
                                const color = 
                                status === 'Approve' ? 'success' :
                                status === 'Waiting approval' ? 'pending' : 
                                status === 'Cancel' ? 'warning' : ''

                                if (status !== 'Waiting payment') {
                                    return (
                                        <TableRow key={id}>
                                            <TableCell>{numberid++}</TableCell>
                                            <TableCell>{user?.fullName}</TableCell>
                                            <TableCell>{trip?.title}</TableCell>
                                            <TableCell className="link-image text-elipsis"><a href={attachment} target="_blank">{attachment}</a> </TableCell>
                                            <TableCell><span className={"color-" + color}>{status}</span></TableCell>
                                            <TableCell align="center" onClick={()=> handleOpen(item)}>
                                                {
                                                    status === 'Approve' ? 
                                                    <CheckCircleIcon sx={{ color: 'var(--color-success)' }} />
                                                    : status === 'Cancel' ? 
                                                    <HighlightOffIcon sx={{ color: 'var(--color-warning)' }} />
                                                    :
                                                    <img src={IconSearch} className="c-pointer" alt="for help you to search something" />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                } 
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div> 
            <a href=""></a> 
            <Gap height={100} /> 
        </div> 
    )
}

export default ListTransaction 