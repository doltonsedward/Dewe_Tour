import './Home.scss'
import { Gap, Input } from '../../components'
import { Card } from '../../components'

const Home = () => {
    return (
        <div className="home-page">
            <div className="hero text-white">
                <div className="section-heading__hero">
                    <h1 className="text-heading">Explore</h1>
                    <h2 className="text-subheading">your amazing</h2>
                </div>
                <div className="section-input__hero">
                    <Gap height={64} />
                    <Input label="Find great place to holiday" variant="search-btn" type="text" />
                </div>
            </div>
            <div className="main">
                <Card variant="box" />
            </div>
        </div>
    )
}

export default Home