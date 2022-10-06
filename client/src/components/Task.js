const Task = ({ task, onDelete, onUpdate, onReminder }) => {
  // Date and Time
  const isoDate = task.taskDate;
  const isoTime = task.taskTime;

  const date = new Date(parseInt(isoDate.substring(0, 4)), parseInt(isoDate.substring(5, 7)) - 1, parseInt(isoDate.substring(8, 10)), parseInt(isoTime.substring(0, 2)), parseInt(isoTime.substring(3, 5)));

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dayWord = days[date.getDay()];
  const day = date.getDate();
  const month = date.toLocaleString("en-us", { month: "short" });
  const year = date.getFullYear();

  const today = new Date();

  if (date <= today && task.alreadyNotified === false && task.taskDone === false) {
    onReminder(task._id);
  }

  return (
    <div className="task">
      <div className="info" onDoubleClick={() => onUpdate(task._id)}>
        <h3 className={`task-name ${task.taskDone ? "strike-through" : ""}`}>{task.taskName}</h3>
        <p className={`task-date ${task.taskDone ? "strike-through" : ""}`}>
          {dayWord + ", " + day + " " + month + " " + year}, {task.taskTime}
        </p>
        <p className={`task-reminder ${task.taskDone ? "strike-through" : ""}`}>Reminder: {task.taskReminder ? "ON" : "OFF"}</p>
      </div>
      <div className="delete">
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default Task;
