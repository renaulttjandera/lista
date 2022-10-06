import Tasks from "./Tasks";
import Header from "./Header";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import pushJs from "push.js";

const Dashboard = () => {
  const [taskList, setTaskList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      Axios.get("http://localhost:3001/dashboard/" + auth.user._id).then((response) => {
        setTaskList(response.data);
      });
    }
  }, []);

  const showSnackBar = () => {
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setMessage(location.state.message);
      showSnackBar();
    }
  }, [location]);

  const deleteTask = async (id) => {
    setTaskList(taskList.filter((task) => task._id !== id));
    Axios.delete(`http://localhost:3001/dashboard/delete/${id}`);
  };

  const updateTask = (id) => {
    const updatedTask = taskList.find((task) => task._id === id);

    setTaskList(taskList.map((task) => (task._id === id ? { ...task, taskDone: !task.taskDone } : task)));

    Axios.put("http://localhost:3001/dashboard/update", { id: id, taskDone: !updatedTask.taskDone });
  };

  const reminder = (id) => {
    const task = taskList.find((task) => task._id === id);

    const isoDate = task.taskDate;
    const isoTime = task.taskTime;

    const date = new Date(parseInt(isoDate.substring(0, 4)), parseInt(isoDate.substring(5, 7)) - 1, parseInt(isoDate.substring(8, 10)), parseInt(isoTime.substring(0, 2)), parseInt(isoTime.substring(3, 5)));

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dayWord = days[date.getDay()];
    const day = date.getDate();
    const month = date.toLocaleString("en-us", { month: "short" });
    const year = date.getFullYear();

    pushJs.create(`It's Time For ${task.taskName}`, {
      body: `${dayWord}, ${day} ${month} ${year}, ${task.taskTime}`,
    });

    updateTask(id);
    Axios.put("http://localhost:3001/dashboard/notify", { id: id, alreadyNotified: true });
  };

  return (
    <div className="app-container">
      <div id="snackbar">{message}</div>
      <Header icon="fas fa-plus" link="/dashboard/add" />
      {localStorage.getItem("auth") && (
        <div className="dashboard-main">
          {taskList.find((task) => task.taskDone === false) && <h2 className="heading">Unfinished Tasks</h2>}
          <Tasks task={taskList} onDelete={deleteTask} onUpdate={updateTask} caption="unfinished" onReminder={reminder} />
          {taskList.find((task) => task.taskDone === true) && <h2 className="heading">Finished Tasks</h2>}
          <Tasks task={taskList} onDelete={deleteTask} onUpdate={updateTask} caption="finished" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
