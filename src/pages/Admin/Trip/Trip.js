import "./_Trip.scss";

import { useEffect, useState } from "react";
import { Gap, Text, Group, ContentBox } from "../../../components";
import { useHistory } from "react-router";
import { muiButton } from "../../../utils";

// import api
import { API } from "../../../config";

// MUI component
import Button from "@mui/material/Button";

const Trip = () => {
  console.clear();
  // MUI logic
  const handleClick = () => setOpen((prev) => !prev);

  const [open, setOpen] = useState(false);
  // close MUI session

  const history = useHistory();

  const [dataTrip, setDataTrip] = useState([]);
  const [isActButton, setIsActButton] = useState("hidden");

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
  }, [open]);

  const actionButton = () => {
    isActButton === "hidden"
      ? setIsActButton("active")
      : setIsActButton("hidden");
    handleClick();
  };

  const newMuiButton = {
    ...muiButton,
    marginLeft: "10px",
  };

  return (
    <div className="header-default">
      <div className="hero"></div>
      <Gap height={105} />
      <div className="wrapper-list-trip">
        <Group variant="space-between">
          <Text variant="h1" fontSize={36}>
            Income Trip
          </Text>
          <div>
            <Button
              variant="contained"
              sx={muiButton}
              onClick={() => history.push("/add-trip")}
            >
              add trip
            </Button>
            <Button
              variant="contained"
              sx={newMuiButton}
              onClick={() => history.push("/add-country")}
            >
              add country
            </Button>
          </div>
        </Group>
        <div className="row">
          {dataTrip.map((item) => {
            const wrapperBox = `wrapper-box__trip ${isActButton}`;
            return (
              <div className={wrapperBox}>
                <ContentBox
                  key={item.id}
                  className="col-4 col-s-6"
                  item={item}
                  subtext="Australia"
                />
              </div>
            );
          })}
        </div>
      </div>
      <Gap height={121} />
    </div>
  );
};

export default Trip;
