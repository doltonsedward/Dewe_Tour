import { Button } from "@mui/material"
import { Gap, Group, Text, Input } from "../../../components"
import { muiButton } from "../../../utils"

const AddTrip = () => {
    const inputStyle = {
        padding: '0 calc(136px - 87px)'
    }

    return (
        <div className="header-default">
            <div className="hero"></div>
            <Gap height={105} />
            <Group style={{padding: '0 87px'}}>
                <Text variant="h1" fontSize={36}>Add trip</Text>
                <Gap height={62} />
                <Group style={inputStyle}>
                    <Input label='Input name' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Country' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Accomodation' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Transportation' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Transportation' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={inputStyle}>
                    <Input label='Eat' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
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
                    <Input variant="file" label='Image' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
            </Group>
            <Gap height={115} />
            <p className="text-center"><Button variant="contained" sx={muiButton}>add trip</Button></p>
            <Gap height={100} />
        </div>
    )
}

export default AddTrip
