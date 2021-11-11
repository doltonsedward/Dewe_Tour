import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import './assets/css/root.css';
import './assets/scss/_shortcut.scss';
import App from "./pages/App";
import store from './store'
import { Provider } from "react-redux";
require('dotenv').config()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
