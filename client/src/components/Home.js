import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import pushJs from "push.js";

const Home = ({ version }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [notiError, setNotiError] = useState("");

  const showSnackBar = () => {
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  if (!pushJs.Permission.has()) {
    pushJs.Permission.request(
      () => {},
      () => {
        setNotiError("You Must Grant Notification Access");
        showSnackBar();
      }
    );
  }

  return (
    <div className="app-container">
      <div id="snackbar">{notiError}</div>
      <h1 className="welcome-text">
        Welcome to
        <br />
        Lista!
      </h1>
      <img src="landing.svg" className="landing" alt="Landing" />
      <h1 className="main-text">
        Manage your <br />
        daily tasks easily
      </h1>
      <Link to="/signup" className="get-started-btn">
        Get Started
      </Link>

      <p className="version">Version {version}.</p>
      {auth && <Redirect to={{ pathname: "/dashboard", state: { message: "You Already Signed In" } }} />}
    </div>
  );
};

export default Home;
