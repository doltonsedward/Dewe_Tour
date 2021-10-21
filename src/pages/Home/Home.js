import './Home.scss'
import { LogoGuarante, LogoHeart, LogoAgent, LogoSupport } from '../../assets/'
import { ImgTour1, ImgTour2, ImgTour3, ImgTour4, ImgTour5 } from '../../assets/'
import { Gap, Input } from '../../components'
import { Box } from '../../components'

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
                <div className="wrapper-card d-flex-center-x">
                    <Box 
                        variant="card" 
                        logo={LogoGuarante}
                        heading="Best Price Guarantee" 
                        text="A small river named Duren flows by their place and supplies" 
                    />
                    <Gap width={70} />
                    <Box 
                        variant="card" 
                        logo={LogoHeart}
                        heading="Best Price Guarantee" 
                        text="A small river named Duren flows by their place and supplies" 
                    />
                    <Gap width={70} />
                    <Box 
                        variant="card"
                        logo={LogoAgent} 
                        heading="Best Price Guarantee" 
                        text="A small river named Duren flows by their place and supplies" 
                    />
                    <Gap width={70} />
                    <Box 
                        variant="card" 
                        logo={LogoSupport}
                        heading="Best Price Guarantee" 
                        text="A small river named Duren flows by their place and supplies" 
                    />
                </div>
                <Gap height={72} />
                <div className="group-tour">
                    <h2 className="text-center">Group Tour</h2>
                    <Gap height={77} />
                    <div className="row">
                        <Box className="col-4 col-s-6"
                            variant="content" 
                            image={ImgTour1}
                            heading="Best Price Guarantee" 
                            price="IDR. 12,398,000"
                            subtext="Australia"
                        />
                        <Box className="col-4 col-s-6"
                            variant="content" 
                            image={ImgTour2}
                            heading="Best Price Guarantee" 
                            price="IDR. 12,398,000"
                            subtext="Australia"
                        />
                        <Box className="col-4 col-s-6"
                            variant="content" 
                            image={ImgTour3}
                            heading="Best Price Guarantee" 
                            price="IDR. 12,398,000"
                            subtext="Australia"
                        />
                        <Box className="col-4 col-s-6"
                            variant="content" 
                            image={ImgTour4}
                            heading="Best Price Guarantee" 
                            price="IDR. 12,398,000"
                            subtext="Australia"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home