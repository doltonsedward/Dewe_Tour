import './_Dashboard.scss'
import { Gap, SidebarAdmin, Text } from '../../../components'
import { redirectTo } from '../../../utils';

// MUI component
import Tooltip from '@mui/material/Tooltip';

// MUI icon
import QrCodeScannerTwoToneIcon from '@mui/icons-material/QrCodeScannerTwoTone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useHistory } from 'react-router';

const Application = () => {
    const history = useHistory()
    return (
        <div className="header-default">
            <div className="hero"></div>
            <div className="dashboard">
                <div className="left-section__dashboard">
                    <SidebarAdmin activein="app" />
                </div>
                <div className="right-section__dashboard">
                    <div className="main">
                        <div>
                            <Text variant="p">Internal apps</Text>
                            <Gap height={20} />
                            <ul className="external-app__dashboard">
                                <li onClick={()=> history.push('/admin/dashboard/application/qr-code-generator')}>
                                    <Tooltip title="qrcode generator" arrow>
                                        <QrCodeScannerTwoToneIcon />
                                    </Tooltip>
                                </li>
                            </ul>
                        </div>
                        <Gap height={80} />
                        <div>
                            <Text variant="p">External apps</Text>
                            <Gap height={20} />
                            <ul className="external-app__dashboard">
                                <li onClick={()=> redirectTo('https://web.whatsapp.com/')}>
                                    <Tooltip title="Whatsapp" arrow>
                                        <WhatsAppIcon sx={{color: '#2BE5A6'}} />
                                    </Tooltip>
                                </li>
                                <li onClick={()=> redirectTo('https://web.facebook.com/')}>
                                    <Tooltip title="Facebook" arrow>
                                        <FacebookIcon sx={{color: '#3498DB'}} />
                                    </Tooltip>
                                </li>
                                <li onClick={()=> redirectTo('https://instagram.com/')}>
                                    <Tooltip title="Instagram" arrow>
                                        <InstagramIcon sx={{color: '#F392F2'}} />
                                    </Tooltip>
                                </li>
                                <li onClick={()=> redirectTo('https://linkedin.com/')}>
                                    <Tooltip title="Linkedin" arrow>
                                        <LinkedInIcon sx={{color: '#415F9D'}} />
                                    </Tooltip>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Application
