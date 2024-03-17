import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare as filledSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare as outlinedSquare } from "@fortawesome/free-regular-svg-icons";
import { useTaskContext } from "../hooks/useTaskContext";
import {
  faStar,
  faStarHalfAlt,
  faPenSquare,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const TaskDetail = ({ task }) => {
  const { dispatch } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    important: task.important,
  });
  const updateImportant = async (e) => {
    e.preventDefault();
    setEditedTask({ ...editedTask, important: !editedTask.important });
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
    if (res.ok) {
      dispatch({
        type: "UPDATE_TASK_IMPORTANT",
        payload: { _id: task._id, important: !task.important },
      });
    } else {
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
    if (res.ok) {
      dispatch({
        type: "UPDATE_TASK_COMPLETED",
        payload: { _id: task._id, completed: !task.completed },
      });
    } else {
      console.error("Failed to update task:", data);
    }
  };

  const handleClick = async (e) => {
    const res = await fetch(`/api/taskmanager/${task._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch({
        type: "DELETE_TASK",
        payload: { _id: task._id },
      });
    }
  };
  const updateAndDelete = async (e) => {
    e.preventDefault();
    await updateCompleted(e);

    await handleClick(e);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const res = await fetch(`/api/taskmanager/${task._id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...task, ...editedTask }), // Spread task and editedTask
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({
        type: "UPDATE_TASK",
        payload: { _id: task._id, ...editedTask },
      });
    } else {
      console.error("Failed to update task:", data);
    }
    setIsEditing(false);
  };
  return (
    <div className="task-details">
      {isEditing ? (
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
        />
      ) : (
        <h4>{task.title}</h4>
      )}
      {isEditing ? (
        <input
          type="text"
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask({ ...editedTask, description: e.target.value })
          }
        />
      ) : (
        <p>{task.description}</p>
      )}
      <div className="check-box">
        <FontAwesomeIcon
          icon={task.completed ? filledSquare : outlinedSquare}
          color={task.completed ? "green" : "grey"}
          size="lg"
          onClick={updateAndDelete}
        />
      </div>
      <div className="star-icon">
        <FontAwesomeIcon
          icon={task.important ? faStar : faStarHalfAlt}
          color={task.important ? "gold" : "grey"}
          onClick={updateImportant}
        />
      </div>
      <div className="edit-icon">
        <FontAwesomeIcon
          icon={faPenSquare}
          color="grey"
          onClick={isEditing ? handleSave : handleEdit}
          size="lg"
        />{" "}
      </div>
      <p>
        {isEditing ? (
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
          />
        ) : (
          <p>
            <strong>{task.dueDate}</strong>
          </p>
        )}{" "}
      </p>
    </div>
  );
};

export default TaskDetail;
