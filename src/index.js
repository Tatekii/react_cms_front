import ReactDOM from "react-dom";
import App from "./App";
import "tailwindcss/tailwind.css";
// 加入auth provider
import { AppProviders } from "./auth/index";

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);
