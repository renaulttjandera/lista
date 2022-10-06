import Task from "./Task";

const Tasks = ({ task, onDelete, onUpdate, caption, onReminder }) => {
  return (
    <div className="tasks">
      {task.map((val, key) => {
        if (caption === "unfinished" && val.taskDone === false) {
          return <Task task={val} key={key} onDelete={onDelete} onUpdate={onUpdate} onReminder={onReminder} />;
        } else if (caption === "finished" && val.taskDone === true) {
          return <Task task={val} key={key} onDelete={onDelete} onUpdate={onUpdate} />;
        }
        return null;
      })}
    </div>
  );
};

export default Tasks;
