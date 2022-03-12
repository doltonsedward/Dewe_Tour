import React from "react";
import ReactDOM from "react-dom";
import {} from "dotenv/config";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./assets/css/root.css";
import "./assets/scss/_shortcut.scss";
import { ToastContainer } from "react-toastify";
import App from "./pages/App";
import store from "./store";
import { Provider } from "react-redux";

// import MUI component
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFAF00",
      contrastText: "rgba(255, 255, 255, 1)",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer position="top-right" />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
