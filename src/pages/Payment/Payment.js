import './Payment.scss'

import { LogoSecond } from '../../assets'
import { Gap, Text } from '../../components'
import { Button } from '@mui/material'
import { muiButton } from '../../utils'

const Payment = () => {
    const listPayment = {}
    
    return (
        <div className="payment">
            <div className="hero"></div>
            <Gap height={66} />
            <div className="main">
                <div className="content__payment">
                    <div className="detail-heading__payment">
                        <img src={LogoSecond} alt="" />
                    </div>
                    <div className="detail-body__payment">
                        <table>
                            <tr>
                                <th>No</th>
                                <th>Full Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                            </tr>
                        </table>
                    </div>
                </div>
                <Gap height={28} />
                <p className="text-right">
                    <Button variant="contained" sx={muiButton}>
                        pay
                    </Button>
                </p>
            </div>
            <Gap height={86} />
        </div>
    )
}

export default Payment
