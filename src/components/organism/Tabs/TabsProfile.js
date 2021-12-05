import { TabPanelProfile } from '../..'

// mui compnent
import { 
    Box,
    Tabs,
    Tab
} from '@mui/material'

const TabsProfile = ({ dataFiltering, getter, handler, UIComponent: { TabPanel } }) => {
    const { value, preview } = getter
    const { waitingApproval, filterApproval, filterCancel } = dataFiltering
    const { a11yProps, handleMuiChange } = handler

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                <Tabs value={value} onChange={handleMuiChange} aria-label="basic tabs example">
                <Tab label="Waiting Approval" {...a11yProps(0)} />
                <Tab label="Approve" {...a11yProps(1)} />
                <Tab label="Cancel" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanelProfile 
                UIComponent={{ TabPanel }}
                dataFiltering={waitingApproval}
                getter={{ value, preview, index: 0 }}
            />
            <TabPanelProfile 
                UIComponent={{ TabPanel }}
                dataFiltering={filterApproval}
                getter={{ value, preview, index: 1 }}
            />
            <TabPanelProfile 
                UIComponent={{ TabPanel }}
                dataFiltering={filterCancel}
                getter={{ value, preview, index: 2 }}
            />
        </Box>
    )
}

export default TabsProfile
