import { Gap } from "../../../components";
import GroupTourContainer from "./GroupTourContainer";
import CardContainer from "./CardContainer";

const MainSection = ({ dataTrip }) => {
  const dataTripOnly = dataTrip.filter((item) => item.filled !== 0);

  return (
    <div className="main">
      <CardContainer />
      <Gap height={72} />
      <GroupTourContainer dataTrip={dataTripOnly} />
      <Gap height={121} />
    </div>
  );
};

export default MainSection;
