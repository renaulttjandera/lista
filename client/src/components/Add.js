import AddForm from "./AddForm";
import Header from "./Header";
import { Redirect } from "react-router-dom";

const Add = ({ task }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  return (
    <div className="app-container">
      <Header icon="fas fa-less-than" link="/dashboard" />
      <div className="add-main">
        <h2 className="heading">Add Task</h2>
        {auth && <AddForm />}
      </div>
      {!auth && <Redirect to={{ pathname: "/signin", state: { message: "Please Sign In First" } }} />}
    </div>
  );
};

export default Add;
