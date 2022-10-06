import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signUpError, setSignUpError] = useState("");

  const history = useHistory();

  const showSnackBar = () => {
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", { name, email, password, confirmPassword }).then((response) => {
      if (response.data.message) {
        setSignUpError(response.data.message);
        showSnackBar();
      } else {
        history.push({ pathname: "/signin", state: { message: "Sign Up Success" } });
      }
    });
  };
  return (
    <>
      <div id="snackbar">{signUpError}</div>
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          value={name}
          className="form-control"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input
          type="text"
          value={email}
          className="form-control"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          value={password}
          className="form-control"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          className="form-control"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
      </div>

      <button className="auth-submit" onClick={signUp}>
        Sign Up
      </button>
    </>
  );
};

export default SignUpForm;
