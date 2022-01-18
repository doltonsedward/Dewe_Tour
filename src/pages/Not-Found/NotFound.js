import "./NotFound.scss";

import { Button } from "@mui/material";
import { useHistory } from "react-router";
import { Gap, Text } from "../../components";
import { ImgPageNotFound } from "../../assets";
import { muiButton } from "../../utils";

const NotFound = () => {
  const history = useHistory();

  muiButton.width = "150px";

  return (
    <div className="header-default">
      <div className="hero"></div>
      <div className="not-found-page">
        <div className="text-center">
          <img
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
            src={ImgPageNotFound}
            alt=""
          />
          <Text variant="p" fontSize={20}>
            Maybe you accessed the{" "}
            <span style={{ fontWeight: 800 }}>Wrong address</span>.{" "}
          </Text>
        </div>
        <Gap height={10} />
        <p className="text-center">
          <Button
            variant="contained"
            sx={muiButton}
            onClick={() => history.goBack()}
          >
            back
          </Button>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
