const TaskDetail = ({ task }) => {
  return (
    <div className="task-details">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>{task.completed}</p>
      <p>{task.important}</p>
      <p>
        <strong>{task.dueDate}</strong>
      </p>
    </div>
  );
};

export default TaskDetail;
