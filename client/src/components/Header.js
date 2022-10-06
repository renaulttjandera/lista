import { Link, Redirect, useHistory } from "react-router-dom";
import Axios from "axios";

const Header = ({ icon, link }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const history = useHistory();

  const logout = () => {
    Axios.post("http://localhost:3001/logout");
    localStorage.clear();
    history.push("/signin");
  };

  return (
    <>
      <div className="dashboard-header">
        <Link to={link}>
          <i className={icon}></i>
        </Link>
        <div className="btn-group">
          <img src={process.env.PUBLIC_URL + "/default-profile.jpg"} alt="Profile" className="profile dropdown-toggle" data-bs-toggle="dropdown" />
          <ul className="dropdown-menu dropdown-menu-end">
            {/* <li>
              <a className="dropdown-item" href="/profile">
                My Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/profile/edit">
                Edit Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li> */}
            <li>
              <button className="dropdown-item" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      {auth && (
        <div className="profile-header">
          <h1 className="greeting-text">Welcome back, {auth.user.name.split(" ")[0] + " " + auth.user.name.split(" ")[1][0] + "."}</h1>
        </div>
      )}
      {!auth && <Redirect to={{ pathname: "/signin", state: { message: "Please Sign In First" } }} />}
    </>
  );
};

export default Header;
