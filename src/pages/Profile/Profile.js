import './Profile.scss'
import { Gap, Group, Text, Input } from '../../components'
import { IconUserCircle, IconEmail, IconPhone, IconLocation } from '../../assets'
import { muiButton, profileCoverButton } from '../../utils'

// mui compnent
import { Button } from '@mui/material'
import { API } from '../../config'
import { useEffect } from 'react'
import { useState } from 'react'
// import { useSelector } from 'react-redux'

const Profile = () => {
    // const payment = JSON.parse(localStorage.getItem('payment')) 
    // const { name, country, type, count, totalPayment } = payment 
    // const dataUser = useSelector(state => state) 

    const [profile, setProfile] = useState({}) 
    const [isEditable, setIsEditable] = useState(false) 
    const [form, setForm] = useState({ 
        fullName: "-", 
        email: "-", 
        phone: "-", 
        address: "-", 
        role: "user", 
        avatar: "-"   
    })

    const getUser = async () => {
        try {
            const response = await API.get('/user')
            const data = response.data.data
            setProfile(response?.data.data)

            setForm({
                ...form,
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                role: data.role,
                avatar: data.avatar  
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getUser()
    }, [])

    function handleEdit() {
        isEditable ? setIsEditable(false) : setIsEditable(true)
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })
    }


    function handlePreview(event) {
        const previewElm = document.getElementById('preview-thumbnail')
        const value = URL.createObjectURL(event.target.files[0])
        previewElm.innerHTML = `<img className="profile-img" style={{display: 'none'}} src=${value} alt="this is profile of user face">`
    }

    return (
        <div className="payment">
            <div className="hero"></div>
            <Gap height={114} />
            <div style={{width: 785, margin: '0 auto'}}><Button variant="contained" sx={muiButton} onClick={handleEdit}>Edit</Button></div>
            <Gap height={20} />
            {
                isEditable ? 
                <Group variant="space-between-only" className="personal-info__profile">
                    <Group className="list-info__profile">
                        <Text variant="bold" fontSize={36}>Personal info</Text>
                        <Gap height={53} />
                        <Group variant="flex">
                            <Group className="list-icon-info__profile">
                                <img src={IconUserCircle} alt="the user info" />
                            </Group>
                            <Group>
                                <Input variant="basic" value={form.fullName} onChange={handleChange} />
                                <Gap height={4} />
                                <Text variant="p" fontSize={12} lineHeight="16px" className="color-gray-medium">Fullname</Text>
                            </Group>
                        </Group>
                        <Gap height={28} />
                        <Group variant="flex">
                            <Group className="list-icon-info__profile">
                                <img src={IconEmail} alt="email user info" />
                            </Group>
                            <Group>
                                <Input variant="basic" value={form.email} onChange={handleChange} />
                                <Gap height={4} />
                                <Text variant="p" fontSize={12} lineHeight="16px" className="color-gray-medium">Email</Text>
                            </Group>
                        </Group>
                        <Gap height={28} />
                        <Group variant="flex">
                            <Group className="list-icon-info__profile">
                                <img src={IconPhone} alt="phone user info" />
                            </Group>
                            <Group>
                                <Input variant="basic" value={form.phone} onChange={handleChange} />
                                <Gap height={4} />
                                <Text variant="p" fontSize={12} lineHeight="16px" className="color-gray-medium">Mobile Phone</Text>
                            </Group>
                        </Group>
                        <Gap height={28} />
                        <Group variant="flex">
                            <Group className="list-icon-info__profile">
                                <img src={IconLocation} alt="location user info" />
                            </Group>
                            <Group>
                                <Input variant="basic" value={form.address} onChange={handleChange} />
                                <Gap height={4} />
                                <Text variant="p" fontSize={12} lineHeight="16px" className="color-gray-medium">Address</Text>
                            </Group>
                        </Group>
                    </Group>
                    <Group>
                        <div id="preview-thumbnail" className="preview-thumbnail__profile">
                            <img className="profile-img" src={profile?.avatar} alt="this is profile of user face" />
                        </div>
                        <Gap height={10} />
                        <div className="wrapper-input-file__profile">
                            
                            <Button variant="contained" sx={profileCoverButton}>
                                <Input className="input-file__profile" type="file" style={{width: '280px'}} id="inputFileProfile" onChange={handlePreview} />
                                Change Photo Profile
                            </Button>
                        </div>
                    </Group>
                </Group>
                :
                <Group variant="space-between-only" className="personal-info__profile">
                    <Group className="list-info__profile">
                        <Text variant="bold" fontSize={36}>Personal info</Text>
                        <Gap height={53} />
                        <Group variant="flex">
                            <Group className="list-icon-info__profile">
                                <img src={IconUserCircle} alt="the user info" />
                            </Group>
                            <Group>
                                <Text variant="bold" fontSize={14} lineHeight="20px">{profile?.fullName}</Text>
                                <Gap height={4} />
                                <Text variant="p" fontSize={12} lineHeight="16px" className="color-gray-medium">Fullname</Text>
                            </Group>
                        </Group>
                        <Gap height={28} />
                        <Group variant="flex">
                            <Group className="list-icon-info__profile">
                                <img src={IconEmail} alt="email user info" />
                            </Group>
                            <Group>
                                <Text variant="bold" fontSize={14} lineHeight="20px">{profile?.email}</Text>
                                <Gap height={4} />
                                <Text variant="p" fontSize={12} lineHeight="16px" className="color-gray-medium">Email</Text>
                            </Group>
                        </Group>
                        <Gap height={28} />
                        <Group variant="flex">
                            <Group className="list-icon-info__profile">
                                <img src={IconPhone} alt="phone user info" />
                            </Group>
                            <Group>
                                <Text variant="bold" fontSize={14} lineHeight="20px">{!profile?.phone ? '-' : profile?.phone}</Text>
                                <Gap height={4} />
                                <Text variant="p" fontSize={12} lineHeight="16px" className="color-gray-medium">Mobile Phone</Text>
                            </Group>
                        </Group>
                        <Gap height={28} />
                        <Group variant="flex">
                            <Group className="list-icon-info__profile">
                                <img src={IconLocation} alt="location user info" />
                            </Group>
                            <Group>
                                <Text variant="bold" fontSize={14} lineHeight="20px">{!profile?.address ? '-' : profile?.address}</Text>
                                <Gap height={4} />
                                <Text variant="p" fontSize={12} lineHeight="16px" className="color-gray-medium">Address</Text>
                            </Group>
                        </Group>
                    </Group>
                    <Group>
                        <div id="preview-thumbnail" className="preview-thumbnail__profile">
                            <img className="profile-img" src={profile?.avatar} alt="this is profile of user face" />
                        </div>
                        <Gap height={10} />
                        <div className="wrapper-input-file__profile">
                            
                            <Button variant="contained" sx={profileCoverButton}>
                                <Input className="input-file__profile" type="file" style={{width: '280px'}} id="inputFileProfile" onChange={handlePreview} />
                                Change Photo Profile
                            </Button>
                        </div>
                    </Group>
                </Group>
            }
            <Gap height={114} />
            <Group style={{width: '1035px', margin: '0 auto'}}>
                <Text variant="bold" fontSize={36}>History trip</Text>
                <Gap height={42} />
                {/* <Box 
                    variant='payment' 
                    name={name} 
                    country={country} 
                    type={type} 
                    count={count} 
                    totalPayment={totalPayment}
                    status='success' /> */}
            </Group>
        </div>
    )
}

export default Profile
