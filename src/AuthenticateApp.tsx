import Admin from "@/page/Admin";
import { Provider } from "react-redux";
import store from "./redux";
import { BrowserRouter } from "react-router-dom";
const AuthenticateApp = () => {
  return (
    <div data-testid="authenticateApp">123</div>
    // 	<Provider store={store}>
    // 	{/* 有登录态了给路由 */}
    // 	<BrowserRouter>
    // 		<Admin />
    // 	</BrowserRouter>
    // </Provider>
  );
};
export default AuthenticateApp;
