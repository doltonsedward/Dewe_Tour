import { Gap, Input } from "../../../../components";

import { useHistory } from "react-router";

const InputSection = ({ dataTrip }) => {
  const history = useHistory();

  const handleSearch = (id) => {
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

  return (
    <div className="section-input__hero">
      <Gap height={64} />
      <Input
        label="Find great place to holiday"
        variant="search-btn"
        onClick={() => handleSearch("inpSearchHome")}
        type="text"
        id="inpSearchHome"
        required
      />
    </div>
  );
};

export default InputSection;
