import { Gap, Group, Text, PaymentBox, PersonalInfoProfile } from '../../'
import { ImageEmpty3D } from '../../../assets'

// mui compnent
import { 
    Button, 
    Box,
    Tabs,
    Tab
} from '@mui/material'

const LayoutProfile = ({ getter, handler }) => {
    const { dataTrans, form, profile, isEditable, preview, variant, value } = getter
    const { handleEdit, handleChange, handleMuiChange, handleSubmit } = handler

    // mui function
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        
        return (
            <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    
    const waitingApproval = dataTrans.filter(item => item.status === 'Waiting approval')
    const filterApproval = dataTrans.filter(item => item.status === 'Approve')
    const filterCancel = dataTrans.filter(item => item.status === 'Cancel')
    
    return (
        <div className="header-default">
            <div className="hero"></div>
            <Gap height={114} />
            <div style={{width: 785, margin: '0 auto', display: 'flex'}}>
                <div className="mr-m"><Button variant="contained" onClick={handleEdit}>Edit</Button></div>
                <Button variant={variant} onClick={handleSubmit}>Update</Button>
            </div>
            <Gap height={20} />
            <PersonalInfoProfile 
                getter={{ form, profile, isEditable, preview }}
                handler={{ handleChange }}
            />
            <Gap height={114} />
            <Group style={{width: '1035px', margin: '0 auto'}}>
                <Text variant="bold" fontSize={36}>History trip</Text>
                <Gap height={42} />
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
            </Group>
        </div>
    )
}

export default LayoutProfile
