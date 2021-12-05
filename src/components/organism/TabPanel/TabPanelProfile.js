// mui compnent
import { 
    Box,
    Tabs,
    Tab
} from '@mui/material'

const TabPanelProfile = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                <Tabs value={value} onChange={handleMuiChange} aria-label="basic tabs example">
                <Tab label="Waiting Approval" {...a11yProps(0)} />
                <Tab label="Approve" {...a11yProps(1)} />
                <Tab label="Cancel" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {
                    !waitingApproval.length ?
                    <p className="text-center"><img style={{width: '450px', maxWidth: '90%'}} src={ImageEmpty3D} alt="" /></p>
                    :
                    waitingApproval.map(item => {
                        return (
                            <PaymentBox 
                                name={item?.trip?.title} 
                                country='Australia'
                                type={item?.trip?.type}  
                                count={item?.counterQty} 
                                totalPayment={item.total}
                                status={item.status}
                                item={item} />
                        )
                    })
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {
                    !filterApproval.length ? 
                    <p className="text-center"><img style={{width: '450px', maxWidth: '90%'}} src={ImageEmpty3D} alt="" /></p>
                    :
                    filterApproval.map(item => {
                        if (!item) alert('emppty')
                        return (
                            <PaymentBox 
                                variant='payment' 
                                name={item?.trip?.title} 
                                country='Australia'
                                type={item?.trip?.type}  
                                count={item?.counterQty} 
                                totalPayment={item.total}
                                status={item.status}
                                item={item} />
                        )
                    })                        
                }
            </TabPanel>
            <TabPanel value={value} index={2}>
                {
                    !filterCancel.length ? 
                    <p className="text-center"><img style={{width: '450px', maxWidth: '90%'}} src={ImageEmpty3D} alt="" /></p>
                    :
                    filterCancel.map(item => {
                        return (
                            <PaymentBox 
                                variant='payment' 
                                name={item?.trip?.title} 
                                country='Australia'
                                type={item?.trip?.type}  
                                count={item?.counterQty} 
                                totalPayment={item.total}
                                status={item.status}
                                item={item}
                                preview={preview} />
                        )
                    })
                }
            </TabPanel>
        </Box>
    )
}

export default TabPanelProfile
