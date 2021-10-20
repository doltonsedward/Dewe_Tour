import './Home.scss'
import { Gap, Input } from '../../components'

const Home = () => {
    return (
        <div className="home-page">
            <div className="hero text-white">
                <div className="section-heading__hero">
                    <h1 className="text-heading">Explore</h1>
                    <h2 className="text-subheading">your amazing</h2>
                </div>
                <div className="section-input__hero">
                    <p>Find great place to holiday</p>
                    <Gap height={20} />
                    <Input label="Input Name" type="text" placeholder="Input your name.." />
                </div>
            </div>
        </div>
    )
}

export default Home