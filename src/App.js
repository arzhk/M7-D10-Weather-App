import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SideMenu from "./Components/SideMenu/SideMenu";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Router>
      <Route path="/" component={SideMenu} />
      <Route path="/" component={Home} />
    </Router>
  );
}

export default App;
