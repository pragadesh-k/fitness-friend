import ReactDom from "react-dom";
import { HashRouter } from "react-router-dom";
// BrowserRouter

import App from "./App";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDom.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
