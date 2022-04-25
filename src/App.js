import Login from "@/page/Login/Login.jsx";
import Admin from "@/page/Admin/Admin.jsx";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
    </>
  );
}

export default App;
