import './Profile.scss'
import { useEffect, useState } from 'react'
import { LayoutProfile } from '../../components/layouts'

// import api
import { API } from '../../config'

const Profile = () => {
    console.clear()
    const [dataTrans, setDataTrans] = useState([])
    const [value, setValue] = useState(0)

    const [profile, setProfile] = useState({}) 
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
            setDataTrans(data)
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
    }

    // mui function
    const handleMuiChange = (event, newValue) => {
        setValue(newValue);
    }

    const handler = { handleEdit, handleChange, handleMuiChange, handleSubmit }
    return (
        <LayoutProfile 
            getter={{ dataTrans, form, profile, isEditable, variant, preview, value }}
            handler={handler}
        />
    )
}

export default Profile
