import { IconPalm } from "../../../../assets";
import { Gap, ContentBox } from "../../../../components";

import { useHistory } from "react-router";

const GroupTourContainer = ({ dataTrip }) => {
  const history = useHistory();

  return (
    <div className="group-tour">
      <img className="p-absolute" src={IconPalm} alt="section group tour" />
      <h2 className="text-center">Group Tour</h2>
      <Gap height={77} />
      <div className="row">
        {dataTrip.map((item) => (
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
  );
};

export default GroupTourContainer;
