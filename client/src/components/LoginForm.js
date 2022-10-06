import { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");

  const history = useHistory();

  Axios.defaults.withCredentials = true;

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setLoginError(location.state.message);
      showSnackBar();
    }
  }, [location]);

  const showSnackBar = () => {
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  const signIn = () => {
    Axios.post("http://localhost:3001/signin", { email, password }).then((response) => {
      if (response.data.message) {
        setLoginError(response.data.message);
        showSnackBar();
      } else {
        localStorage.setItem("auth", JSON.stringify(response.data));
        history.push({ pathname: "/dashboard", state: { message: "Sign In Success" } });
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/signin");
  }, []);

  return (
    <>
      <div id="snackbar">{loginError}</div>
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

      <button className="auth-submit" onClick={signIn}>
        Sign In
      </button>
    </>
  );
};

export default LoginForm;
