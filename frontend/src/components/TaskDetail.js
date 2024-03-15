const TaskDetail = ({ task }) => {
  return (
    <div className="task-details">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>{task.completed ? "Completed" : "Not Completed"}</p>{" "}
      {/* Replace this line above with a icon */}
      <p>{task.completed ? "Important" : "Not Important"}</p>{" "}
      {/* Replace the line above with a icon */}
      <p>
        <strong>{task.dueDate}</strong>
      </p>
    </div>
  );
};

export default TaskDetail;
