import './Profile.scss'
import { useEffect, useState } from 'react'
import { LayoutProfile } from '../../components/layouts'
import { toast } from 'react-toastify'

// import api
import { API, checkUser } from '../../config'

const Profile = () => {
    console.clear()
    const [dataTrans, setDataTrans] = useState([])
    const [value, setValue] = useState(0)
    const [loading, setLoading] = useState(false)
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
            const message = error?.response?.data?.message || error?.message
            toast.error(message || 'Unknow error')
        }
    }

    const getTransaction = async () => {
        try {
            const response = await API.get('/transaction')
            const data = response.data.data
            setDataTrans(data)
        } catch (error) {
            const message = error?.response?.data?.message || error?.message
            toast.error(message || 'Unknow error')
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
        setLoading(true)

        try {
            const formData = new FormData()
            formData.set('fullName', form.fullName)
            formData.set('email', form.email)
            formData.set('phone', form.phone)
            formData.set('address', form.address)
            formData.set('role', form.role)
            if (typeof form.avatar === 'object') {
                formData.set('avatar', form.avatar[0], form.avatar[0].filename)
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
    
                const body = formData
                const response = await API.patch('/user', body, config)
                toast.success(response.data.message)
            } else {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
    
                const body = form
                const response = await API.patch('/user/specific', body, config)
                toast.success(response.data.message)
            }
            
            handleEdit()
            getUser()
            checkUser()
            setLoading(false)
        } catch (error) {
            handleEdit()
            const message = error?.response?.data?.message || error?.message
            toast.error(message || 'Unknow error')
        }
    }

    // mui function
    const handleMuiChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <LayoutProfile 
            getter={{ dataTrans, form, profile, isEditable, variant, preview, value, loading }}
            handler={{ handleEdit, handleChange, handleMuiChange, handleSubmit }}
        />
    )
}

export default Profile