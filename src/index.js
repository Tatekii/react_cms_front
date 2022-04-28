import ReactDOM from "react-dom";
import App from "./App";
// 加入auth provider
import { AppProviders } from "./auth/index";
import "./index.css";

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);
