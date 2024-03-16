import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare as filledSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare as outlinedSquare } from "@fortawesome/free-regular-svg-icons";

const TaskDetail = ({ task }) => {
  const updateImportant = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/taskmanager/${task._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        important: !task.important,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Failed to update task:", data);
    }
  };

  const updateCompleted = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/taskmanager/${task._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !task.completed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Failed to update task:", data);
    }
  };

  return (
    <div className="task-details">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <div className="check-box">
        <FontAwesomeIcon
          icon={task.completed ? filledSquare : outlinedSquare}
          color={task.completed ? "green" : "grey"}
          size="lg" // Add this line to make the icon larger
          onClick={updateCompleted}
        />
      </div>
      <div className="star-icon">
        <FontAwesomeIcon
          icon={task.important ? faStar : faStarHalfAlt}
          color={task.important ? "gold" : "grey"}
          onClick={updateImportant}
        />
      </div>
      <p>
        <strong>{task.dueDate}</strong>
      </p>
    </div>
  );
};

export default TaskDetail;
