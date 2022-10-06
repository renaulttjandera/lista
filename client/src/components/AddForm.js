import { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const AddForm = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskReminder, setTaskReminder] = useState(false);
  const history = useHistory();
  const [error, setError] = useState();

  const showSnackBar = () => {
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  const addToList = () => {
    Axios.post("http://localhost:3001/dashboard/add", { taskName, taskDate, taskTime, taskReminder, user: auth.user._id }).then((response) => {
      if (response.data.message) {
        setError(response.data.message);
        showSnackBar();
      } else {
        history.push("/dashboard");
      }
    });
  };

  return (
    <>
      <div id="snackbar">{error}</div>
      <div className="mb-3">
        <label className="form-label">Task Name</label>
        <input
          type="text"
          value={taskName}
          className="form-control"
          onChange={(event) => {
            setTaskName(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Task Date</label>
        <input
          type="date"
          value={taskDate}
          className="form-control"
          onChange={(event) => {
            setTaskDate(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Task Time</label>
        <input
          type="time"
          value={taskTime}
          className="form-control"
          onChange={(event) => {
            setTaskTime(event.target.value);
          }}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          checked={taskReminder}
          value={taskReminder}
          className="form-check-input"
          onChange={(event) => {
            setTaskReminder(event.currentTarget.checked);
          }}
        />
        <label className="form-check-label">Reminder?</label>
      </div>

      <button className="button-submit" onClick={addToList}>
        Add Task
      </button>
    </>
  );
};

export default AddForm;
