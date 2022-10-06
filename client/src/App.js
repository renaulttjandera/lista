import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Add from "./components/Add";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact render={(props) => <Home version="1.0.0" />} />
      <Route path="/dashboard" exact render={(props) => <Dashboard />} />
      <Route path="/dashboard/add" exact render={(props) => <Add />} />
      <Route path="/signin" exact render={(props) => <Login />} />
      <Route path="/signup" exact render={(props) => <SignUp />} />
    </Router>
  );
};

export default App;
