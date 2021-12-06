import { Gap, Group, Text, PersonalInfoProfile, TabsProfile } from '../../'

// mui compnent
import { 
    Button, 
    Box,
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
    
    const handleUpdate = () => {
        handleSubmit() 
        handleEdit()
    }
    
    return (
        <div className="header-default">
            <div className="hero"></div>
            <Gap height={114} />
            <div style={{width: 785, margin: '0 auto', display: 'flex'}}>
                <Button variant="contained" sx={{ marginRight: 1 }} onClick={handleEdit}>Edit</Button>
                <Button variant={variant} onClick={handleUpdate}>Update</Button>
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
                <TabsProfile 
                    dataFiltering={{ waitingApproval, filterApproval, filterCancel }}
                    getter={{ value, preview }} 
                    handler={{ a11yProps, handleMuiChange }}
                    UIComponent={{ TabPanel }}
                />
            </Group>
        </div>
    )
}

export default LayoutProfile
