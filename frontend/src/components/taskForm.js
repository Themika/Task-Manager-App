import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const tasks = {
      title,
      description,
      completed,
      important,
      dueDate,
    };

    const res = await fetch("/api/taskmanager/", {
      method: "POST",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json ",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      setError(null);
      console.log("Task created successfully");
      setTitle("");
      setDescription("");
      setCompleted(false);
      setImportant(false);
      setDueDate("");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new task</h3>
      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></input>
      <label>description</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></input>
      <label>dueDate</label>
      <input
        type="date"
        onChange={(e) => setDueDate(e.target.value)}
        value={dueDate}
      ></input>
      <div className="checkboxes-container">
        <div className="checkbox-container">
          <label className="completed">Completed</label>
          <FontAwesomeIcon
            icon={completed ? faCheckSquare : faSquare}
            onClick={() => setCompleted(!completed)}
            color={completed ? "green" : "grey"}
          />
        </div>
        <div className="checkbox-container">
          <label className="important">Important</label>
          <span
            className="star-checkbox"
            onClick={() => setImportant(!important)}
            style={{ color: important ? "gold" : "gray" }}
          >
            {important ? "★" : "☆"}
          </span>
        </div>
      </div>
      <button type="submit">Add task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
