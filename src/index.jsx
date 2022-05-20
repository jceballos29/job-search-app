import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.scss";
import App from "./App";

import AuthContext from "./context/AuthContext";
import axios from "axios";

axios.defaults.baseURL = "https://backendnodejstzuzulcode.uw.r.appspot.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </React.StrictMode>
);
