import { Button } from "@mui/material"
import { Gap, Group, Text, Input, Option } from "../../../components"
import { muiButton } from "../../../utils"

import { API } from "../../../config"
import { useState } from "react"

const AddCountry = () => {
    const [form, setForm] = useState({
        name: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value 
        })
    }

    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(form)

            await API.post('/country', body, config)
        } catch (error) {
            console.log(error) 
        }
    }

    const inputStyle = {
        padding: '0 calc(136px - 87px)'
    }

    return (
        <div className="header-default">
            <div className="hero"></div>
            <Gap height={105} />
            <Group style={{padding: '0 87px'}}>
                <Text variant="h1" fontSize={36}>Add Country</Text>
                <Gap height={62} />
                <Group style={inputStyle}>
                    <Input label='Name' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" name="name" value={form.name} onChange={handleChange} />
                </Group>
            </Group>
            <Gap height={115} />
                <p className="text-center"><Button variant="contained" sx={muiButton} onClick={handleSubmit}>add country</Button></p>
            <Gap height={100} />
        </div>
    )
}

export default AddCountry
