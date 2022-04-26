import Admin from "page/Admin/Admin";
import { Provider } from "react-redux";
import store from "./redux";
import { BrowserRouter } from "react-router-dom";
const AuthenticateApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    </Provider>
  );
};
export default AuthenticateApp;
