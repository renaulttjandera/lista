import SignUpForm from "./SignUpForm";
import { Link, Redirect } from "react-router-dom";

const SignUp = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  return (
    <div className="app-container">
      <h1 className="welcome-text">Sign Up</h1>
      <img src="signup.svg" className="login" alt="Sign Up" />
      <div className="auth-main">
        <SignUpForm />
      </div>
      <Link to="/signin" className="signup-text">
        Already Have An Account?
        <br />
        Sign In Here.
      </Link>
      {auth && <Redirect to={{ pathname: "/dashboard", state: { message: "You Already Signed In" } }} />}
    </div>
  );
};

export default SignUp;
