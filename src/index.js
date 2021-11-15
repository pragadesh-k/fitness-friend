import ReactDom from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";

import App from "./App";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDom.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
