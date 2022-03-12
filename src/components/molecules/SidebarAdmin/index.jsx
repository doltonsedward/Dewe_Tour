import "./SidebarAdmin.scss";
import { Gap } from "../..";
import { useHistory } from "react-router";

// MUI Component
import HomeIcon from "@mui/icons-material/Home";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";

const SidebarAdmin = ({ activein }) => {
  const history = useHistory();
  const style = "d-flex align-items-center";
  return (
    <ul className="list-sidebar">
      <li
        className={activein === "dashboard" ? style + " active" : style}
        onClick={() => history.push("/admin/dashboard")}
      >
        <div className="wrappeer-icon__sidebar">
          <HomeIcon />
        </div>
        <Gap width={5} />
        <p>Dashboard</p>
      </li>
      <li
        className={activein === "maintenance" ? style + " active" : style}
        onClick={() => history.push("/admin/dashboard/maintenance")}
      >
        <div className="wrappeer-icon__sidebar">
          <BuildCircleIcon />
        </div>
        <Gap width={5} />
        <p>Maintence</p>
      </li>
    </ul>
  );
};

export default SidebarAdmin;
