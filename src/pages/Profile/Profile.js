import './Profile.scss'
import { Gap, Group, Text, Input, Box } from '../../components'
import { IconUserCircle, IconEmail, IconPhone, IconLocation } from '../../assets'
import { muiButton, profileCoverButton } from '../../utils'

// mui compnent
import { Button } from '@mui/material'
import { API } from '../../config'
import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
// import { useSelector } from 'react-redux'

const Profile = () => {
    console.clear()
    const history = useHistory()

    const [profile, setProfile] = useState({}) 
    const [transaction, setTransaction] = useState([])
    const [isEditable, setIsEditable] = useState(false) 
    
    // state for variant 
    const [variant, setVariant] = useState('disabled')
    const [form, setForm] = useState({ 
        fullName: "-", 
        email: "-", 
        phone: "-", 
        address: "-", 
        role: "user", 
        avatar: "-"   
    })
    
    // preview state
    const [preview, setPreview] = useState(profile?.avatar)

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

    const getTransaction = async () => {
        try {
            const response = await API.get('/transaction')
            const data = response.data.data
            setTransaction(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getUser()
        getTransaction()
    }, [])

    function handleEdit() {
        isEditable ? setIsEditable(false) : setIsEditable(true)
        variant === 'contained' ? setVariant('disabled') : setVariant('contained')
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })

        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData()
            formData.set('fullName', form.fullName)
            formData.set('email', form.email)
            formData.set('phone', form.phone)
            formData.set('address', form.address)
            formData.set('role', form.role)
            formData.set('avatar', form.avatar[0], form.avatar[0].filename)

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const body = formData

            await API.patch('/user', body, config)

            
        } catch (error) {
            console.log(error)
        }

        window.location.reload()
    }

    return (
        <div className="payment">
            <div className="hero"></div>
            <Gap height={114} />
            <div style={{width: 785, margin: '0 auto', display: 'flex'}}>
                <div className="mr-m"><Button variant="contained" sx={muiButton} onClick={handleEdit}>Edit</Button></div>
                <Button variant={variant} sx={muiButton} onClick={handleSubmit}>Update</Button>
            </div>
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
                                <Input variant="basic" name="fullName" value={form.fullName} onChange={handleChange} />
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
                                <Input variant="basic" name="email" value={form.email} onChange={handleChange} />
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
                                <Input variant="basic" name="phone" value={form.phone ?? '-'} onChange={handleChange} />
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
                                <Input variant="basic" name="address" value={form.address ?? '-'} onChange={handleChange} />
                                <Gap height={4} />
                                <Text variant="p" fontSize={12} lineHeight="16px" className="color-gray-medium">Address</Text>
                            </Group>
                        </Group>
                    </Group>
                    <Group>
                        <div id="preview-thumbnail" className="preview-thumbnail__profile">
                            {
                                preview ? 
                                <img className="profile-img" src={preview} alt="this is profile of user face" />
                                :
                                <img className="profile-img" src={profile?.avatar} alt="this is profile of user face" />
                            }
                        </div>
                        <Gap height={10} />
                        <div className="wrapper-input-file__profile">
                            <Button variant="contained" sx={profileCoverButton}>
                                <Input className="input-file__profile" name="avatar" type="file" style={{width: '280px'}} id="inputFileProfile" onChange={handleChange} />
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
                            {
                                preview ? 
                                <img className="profile-img" src={preview} alt="this is profile of user face" />
                                :
                                <img className="profile-img" src={profile?.avatar} alt="this is profile of user face" />
                            }
                        </div>
                        <Gap height={10} />
                        <div className="wrapper-input-file__profile">
                            <Button variant="contained" sx={profileCoverButton}>
                                <Input className="input-file__profile" type="file" style={{width: '280px'}} id="inputFileProfile" onChange={handleChange} />
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
                {transaction.map(item => {
                    if (item.status === 'Waiting payment') {
                        return ('')
                    } else {
                        return (
                            <Box 
                            variant='payment' 
                            name={item?.trip?.title} 
                            country='Australia'
                            type={item?.trip?.type}  
                            count={item?.counterQty} 
                            status={item.status}
                            item={item}
                                />
                        )
                    }
                })}
            </Group>
        </div>
    )
}

export default Profile
