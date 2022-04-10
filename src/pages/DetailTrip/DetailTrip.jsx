import "./DetailTrip.scss";
import { Gap } from "../../components";
import MainSection from "./MainSection";

const DetailTrip = () => {
  console.clear();
  document.title = `DeweTour | Detail Trip`;

  return (
    <div className="detail-trip">
      <div className="hero"></div>
      <Gap height={66} />
      <MainSection />
    </div>
  );
};

export default DetailTrip;
