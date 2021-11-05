// import api
import { API } from "../../../config"

// mui button
import { Button } from "@mui/material" 
import { Gap, Group, Text, Input } from "../../../components" 
import { muiButton } from "../../../utils" 
import { useParams } from "react-router" 
import { useEffect, useState } from "react" 

const UpdateTrip = () => { 
    const { id } = useParams() 

    const [form, setForm] = useState({
        title: "",
        countryId: 0,
        accomodation: "",
        transportation: "",
        eat: "",
        day: 0,
        night: 0,
        dateTrip: "",
        price: 0,
        type: "",
        quota: 0,
        description: "",
        image: "",
        country: ""
    })

    const getTrips = async () => {
        try {
            const response = await API.get('/trip/' + id)
            const { data } = response.data
            setForm({
                ...form,
                title: data.title,
                countryId: data.countryId,
                accomodation: data.accomodation,
                transportation: data.transportation,
                eat: data.eat,
                day: data.day,
                night: data.night,
                dateTrip: data.dateTrip,
                price: data.price,
                type: data.type,
                quota: data.quota,
                description: data.description,
                image: data.image,
                country: data.country
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getTrips()
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })
    }

    console.log(form)
    
    // for styling
    const inputStyle = {
        padding: '0 calc(136px - 87px)'
    }

    return (
        <div className="header-default">
            <div className="hero"></div>
            <Gap height={105} />
            <Group style={{padding: '0 87px'}}>
                <Text variant="h1" fontSize={36}>Update Trip</Text>
                <Gap height={62} />
                <Group style={inputStyle}>
                    <Input label='Title' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" value={form.title} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Country' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" value={form.country} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Accomodation' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" value={form.accomodation} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Transportation' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" value={form.transportation} onChange={handleChange} />
                </Group> 
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Eat' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" value={form.eat} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Duration' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" value={form.title} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Date Trip' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" type="date"  />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Price' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" value={form.price} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Quota' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" value={form.quota} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Description' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" value={form.description} onChange={handleChange} />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input variant="file" label='Image' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
            </Group>
            <Gap height={115} />
            <p className="text-center"><Button variant="contained" sx={muiButton}>Update</Button></p>
            <Gap height={100} />
        </div>
    )
}

export default UpdateTrip
