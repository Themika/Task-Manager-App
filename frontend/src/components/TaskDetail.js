import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare as filledSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare as outlinedSquare } from "@fortawesome/free-regular-svg-icons";
const TaskDetail = ({ task }) => {
  return (
    <div className="task-details">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <div className="check-box">
        <FontAwesomeIcon
          icon={task.completed ? filledSquare : outlinedSquare}
          color={task.completed ? "green" : "grey"}
          size="lg" // Add this line to make the icon larger
        />
      </div>
      <div className="star-icon">
        <FontAwesomeIcon
          icon={task.important ? faStar : faStarHalfAlt}
          color={task.important ? "gold" : "grey"}
        />
      </div>
      <p>
        <strong>{task.dueDate}</strong>
      </p>
    </div>
  );
};

export default TaskDetail;
