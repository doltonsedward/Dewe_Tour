import "./Home.scss";
import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import MainSection from "./MainSection";
import { toast } from "react-toastify";

import { API } from "../../config";

const Home = () => {
  document.title = "DeweTour";
  const [dataTrip, setDataTrip] = useState([]);

  const getTrips = async () => {
    try {
      const response = await API.get("/trips");
      setDataTrip(response.data.data);
    } catch (error) {
      toast.error(error?.message || "Opps!, Something went wrong");
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <div className="home-page">
      <HeroSection dataTrip={dataTrip} />
      <MainSection dataTrip={dataTrip} />
    </div>
  );
};

export default Home;
