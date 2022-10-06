import LoginForm from "./LoginForm";
import { Link, Redirect } from "react-router-dom";

const Login = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  return (
    <div className="app-container">
      <h1 className="welcome-text">Sign In</h1>
      <img src="login.svg" className="login" alt="Login" />
      <div className="auth-main">
        <LoginForm />
      </div>
      <Link to="/signup" className="signup-text">
        Doesn't Have An Account?
        <br />
        Sign Up Here.
      </Link>
      {auth && <Redirect to={{ pathname: "/dashboard", state: { message: "You Already Signed In" } }} />}
    </div>
  );
};

export default Login;
