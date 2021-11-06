import './_AddTrip.scss'

import { Button } from "@mui/material"
import { Gap, Group, Text, Input } from "../../../components"
import { muiButton } from "../../../utils"

import { API } from "../../../config"
import { useEffect, useState } from "react"
import Option from "../../../components/atoms/Option"

const AddTrip = () => {
    const [countries, setCountries] = useState([])
    const [preview, setPreview] = useState('')
    const [form, setForm] = useState({
        title: '',
        countryId: '',
        accomodation: '',
        transportation: '',
        eat: '',
        day: '',
        night: '',
        dateTrip: '',
        price: 0,
        quota: 0,
        type: '',
        description: '',
        image: ''
    })

    const inputStyle = {
        padding: '0 calc(136px - 87px)'
    }

    const getCountry = async () => {
        try {
            const response = await API.get('/countrys')
            setCountries(response.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value 
        })

        console.log(e.target.files)
        
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files)
            setPreview(url)
        }
    }

    console.log(preview, 'pre')

    useEffect(()=> {
        getCountry()
    }, [])

    return (
        <div className="header-default">
            <div className="hero"></div>
            <Gap height={105} />
            <Group style={{padding: '0 87px'}}>
                <Text variant="h1" fontSize={36}>Add trip</Text>
                <Gap height={62} />
                <Group style={inputStyle}>
                    <Input label='Input name' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" name="title" value={form.title} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <select className="select-country" name="countryId" onChange={handleChange}>
                        {countries.map(item => {
                            return <Option item={item} />
                        })}
                    </select>
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Accomodation' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1"  name="accomodation" value={form.accomodation} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Transportation' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" name="transportation" value={form.transportation} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Eat' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" name="eat" value={form.eat} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Duration' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Date Trip' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Price' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Quota' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Description' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input variant="file" label='Image' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" onChange={handleChange} multiple />
                </Group>
                <img src={preview} alt="" />
            </Group>
            <Gap height={115} />
                <p className="text-center"><Button variant="contained" sx={muiButton}>add trip</Button></p>
            <Gap height={100} />
        </div>
    )
}

export default AddTrip
