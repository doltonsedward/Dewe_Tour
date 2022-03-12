import "./Home.scss";
import { LogoGuarante, LogoHeart, LogoAgent, LogoSupport } from "../../assets";
import { IconPalm, IconHibicus } from "../../assets";
import { Gap, Input, CardBox, ContentBox } from "../../components";

import { useHistory } from "react-router";
import { useEffect, useState } from "react";

import { API } from "../../config";

const Home = () => {
  document.title = "DeweTour";
  const [dataTrip, setDataTrip] = useState([]);

  const getTrips = async () => {
    try {
      const response = await API.get("/trips");
      setDataTrip(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  const history = useHistory();

  const handlerSearch = (id) => {
    const inputSearch = document.getElementById(id).value;
    let data = [];
    for (let item of dataTrip) {
      if (item.title.includes(inputSearch)) {
        data.push(item);
      }
    }

    localStorage.setItem("searchData", JSON.stringify(data));
    if (inputSearch) history.push("/search");
  };

  const dataTripOnly = dataTrip.filter((item) => item.filled !== 0);

  return (
    <div className="home-page">
      <div className="hero text-white">
        <div className="section-heading__hero">
          <h1 className="text-heading">Explore</h1>
          <h2 className="text-subheading">your amazing city together</h2>
        </div>

        <div className="section-input__hero">
          <Gap height={64} />
          <Input
            label="Find great place to holiday"
            variant="search-btn"
            onClick={() => handlerSearch("inpSearchHome")}
            type="text"
            id="inpSearchHome"
            required
          />
        </div>
      </div>
      <div className="main">
        <div className="wrapper-card d-flex-center-x">
          <CardBox
            logo={LogoGuarante}
            heading="Best Price Guarantee"
            text="A small river named Duren flows by their place and supplies"
          />
          <Gap width={70} />
          <CardBox
            logo={LogoHeart}
            heading="Best Price Guarantee"
            text="A small river named Duren flows by their place and supplies"
          />
          <Gap width={70} />
          <CardBox
            variant="card"
            logo={LogoAgent}
            heading="Best Price Guarantee"
            text="A small river named Duren flows by their place and supplies"
          />
          <Gap width={70} />
          <CardBox
            logo={LogoSupport}
            heading="Best Price Guarantee"
            text="A small river named Duren flows by their place and supplies"
          />
          <img className="p-absolute hibicus-icon" src={IconHibicus} alt="" />
        </div>
        <Gap height={72} />
        <div className="group-tour">
          <img className="p-absolute" src={IconPalm} alt="" />
          <h2 className="text-center">Group Tour</h2>
          <Gap height={77} />
          <div className="row">
            {dataTripOnly.map((item) => (
              <ContentBox
                key={item.id}
                className="col-4 col-s-6"
                variant="content"
                item={item}
                onClick={() => history.push("/detail-trip/" + item.id)}
              />
            ))}
          </div>
        </div>
        <Gap height={121} />
      </div>
    </div>
  );
};

export default Home;
