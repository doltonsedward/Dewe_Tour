import { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { Gap, Text } from "../../../components";
import { toast } from "react-toastify";
import ContentListTour from "./ContentListTour";

import { API } from "../../../config";

const MainSection = () => {
  const history = useHistory();
  const { id } = useParams();

  // memoized id
  const idParams = useRef(id);

  const [detailTrip, setDetailTrip] = useState({});

  const getDetailTrip = async () => {
    try {
      const response = await API.get("/trip/" + idParams.current);
      setDetailTrip(response.data.data);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || "Unknow error");
    }
  };

  useEffect(() => {
    getDetailTrip();
  }, []);

  if (!Number(idParams.current)) {
    history.push("/");
  }

  return (
    <div className="main">
      <div className="listTour">
        <Text variant="h1" fontSize={48}>
          {detailTrip?.title}
        </Text>
        <Text variant="p" className="color-second">
          {detailTrip?.country?.name}
        </Text>
        <Gap height={27} />
        <ContentListTour
          image={detailTrip?.image}
          accomodation={detailTrip?.accomodation}
          transportation={detailTrip?.transportation}
          eat={detailTrip?.eat}
          tourDateTime={`${detailTrip?.day} Day ${detailTrip?.night} Night`}
          dateTrip={detailTrip?.dateTrip}
          description={detailTrip?.description}
          price={detailTrip?.price}
          type={detailTrip?.type}
          filled={detailTrip?.filled}
          idParams={idParams.current}
        />
      </div>
    </div>
  );
};

export default MainSection;
