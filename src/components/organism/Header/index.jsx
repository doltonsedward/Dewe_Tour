import "./Header.scss";
import { dropDown } from "../../../utils";
import { IconUser, IconBill, IconTrip } from "../../../assets";
import store from "../../../store";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// MUI component
import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

// MUI icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import { Login, Register } from "../..";
import { checkUser, setAuthToken } from "../../../config";

const Header = ({ logo }) => {
  const history = useHistory();
  const currentState = useSelector((state) => state);
  const isAdmin = currentState.user.role === "admin";

  const isLoginSession = useSelector((state) => state.isLogin);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  const logoutSession = () => {
    setIsLoginActive(false);
    store.dispatch({
      type: "LOGOUT",
    });

    history.push("/");
    toast.success("Logout success, welcome back anytime");
  };

  const handleSwitchOpenLogin = () => {
    setIsLoginActive(true);
    setIsRegisterActive(false);
  };

  const handleSwitchOpenRegis = () => {
    setIsLoginActive(false);
    setIsRegisterActive(true);
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  if (isAdmin) {
    return (
      <header className="d-flex-between">
        <img
          src={logo}
          className="c-pointer"
          alt="this is logo"
          onClick={() => history.push("/")}
        />
        <div className="section-button__header">
          <div className="profile" onClick={dropDown}>
            <IconButton onClick={() => history.push("/admin/message")}>
              <MailIcon />
            </IconButton>
            <img
              style={{ marginLeft: "5px" }}
              className="profile-image"
              src={currentState.user.avatar}
              alt="profile"
            />
            <div className="dropdown admin">
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  borderRadius: "5px",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton
                  onClick={() => history.push("/admin/dashboard")}
                >
                  <ListItemIcon>
                    <DashboardIcon sx={{ color: "#89B5AF" }} />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton onClick={() => history.push("/trip")}>
                  <ListItemIcon>
                    <img src={IconTrip} alt="profile" />
                  </ListItemIcon>
                  <ListItemText primary="Trip" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => history.push("/list-transaction")}
                >
                  <ListItemIcon>
                    <AccountBalanceWalletIcon sx={{ color: "#FDA856" }} />
                  </ListItemIcon>
                  <ListItemText primary="Transaction" />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={logoutSession}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: "#F73859" }} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </List>
            </div>
          </div>
        </div>
      </header>
    );
  } else if (isLoginSession) {
    return (
      <header className="d-flex-between">
        <img
          src={logo}
          className="c-pointer"
          alt="this is logo"
          onClick={() => history.push("/")}
        />
        <div className="section-button__header">
          <div className="profile" onClick={dropDown}>
            <IconButton onClick={() => history.push("/message")}>
              <MailIcon />
            </IconButton>
            <img
              style={{ marginLeft: "5px" }}
              className="profile-image"
              src={currentState.user.avatar}
              alt="profile"
            />
            <div className="dropdown">
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  borderRadius: "5px",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={() => history.push("/profile")}>
                  <ListItemIcon>
                    <img src={IconUser} alt="profile" />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton onClick={() => history.push("/payment")}>
                  <ListItemIcon>
                    <img src={IconBill} alt="pay if you ready to it" />
                  </ListItemIcon>
                  <ListItemText primary="Pay" />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={logoutSession}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: "#F73859" }} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </List>
            </div>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className="d-flex-between">
        <img
          src={logo}
          className="c-pointer"
          alt="this is logo"
          onClick={() => history.push("/")}
        />
        <div className="section-button__header">
          <Button className="btn-login" onClick={() => setIsLoginActive(true)}>
            Login
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: 2 }}
            onClick={() => setIsRegisterActive(true)}
          >
            Register
          </Button>

          <Login
            isOpen={isLoginActive}
            setIsOpen={setIsLoginActive}
            switchOpen={handleSwitchOpenRegis}
          />
          <Register
            isOpen={isRegisterActive}
            setIsOpen={setIsRegisterActive}
            switchOpen={handleSwitchOpenLogin}
          />
        </div>
      </header>
    );
  }
};

export default Header;
