import "./Search.scss";

import { ContentBox, Gap, Text } from "../../components";
import { muiButton } from "../../utils";
import { useHistory } from "react-router";

// mui component
import { Button } from "@mui/material";

const Search = () => {
  const history = useHistory();
  const dataTour = JSON.parse(localStorage.getItem("searchData"));

  if (dataTour.length === 0) {
    return (
      <div className="header-default">
        <div className="hero"></div>
        <div className="data-search-not-found">
          <Text variant="h1" fontSize={25} className="text-center">
            We can't find the data you mean
          </Text>
          <Gap height={20} />
          <Button
            variant="contained"
            sx={muiButton}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="header-default">
        <div className="hero"></div>
        <Gap height={100} />
        <Text variant="h1" fontSize={25} className="text-center">
          Search result
        </Text>
        <div className="row">
          {dataTour.map((item) => (
            <ContentBox
              key={item.id}
              className="col-4 col-s-6"
              item={item}
              subtext="Australia"
              onClick={() => history.push("/detail-trip/" + item.id)}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Search;
