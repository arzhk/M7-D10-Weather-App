import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./Components/Main";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" component={Main} />
    </Router>
  );
}

export default App;
