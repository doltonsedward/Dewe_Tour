import { Gap, Group, Text, Input } from "../../../components"

const AddTrip = () => {
    return (
        <div className="header-default">
            <div className="hero"></div>
            <Gap height={105} />
            <Group style={{padding: '0 87px'}}>
                <Text variant="h1" fontSize={36}>Add trip</Text>
                <Gap height={62} />
                <Group style={{padding: '0 calc(136px - 87px)'}}>
                    <Input label='Input name' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={{padding: '0 calc(136px - 87px)'}}>
                    <Input label='Country' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={{padding: '0 calc(136px - 87px)'}}>
                    <Input label='Accomodation' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={{padding: '0 calc(136px - 87px)'}}>
                    <Input label='Transportation' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={{padding: '0 calc(136px - 87px)'}}>
                    <Input label='Transportation' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={{padding: '0 calc(136px - 87px)'}}>
                    <Input label='Eat' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
                <Gap height={40} />
                <Group style={{padding: '0 calc(136px - 87px)'}}>
                    <Input label='Duration' inputbgcolor="#C4C4C480" inputheight="49px" inputborder="2px solid #B1B1B1" />
                </Group>
            </Group>
            <Gap height={100} />
        </div>
    )
}

export default AddTrip
