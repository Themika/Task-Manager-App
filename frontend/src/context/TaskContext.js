import { createContext, useReducer } from "react";

export const TaskContext = createContext();

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "CREATE_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case "UPDATE_TASK_IMPORTANT":
      const updatedTasks = state.tasks.map((task) =>
        task._id === action.payload._id
          ? { ...task, important: action.payload.important }
          : task
      );
      return {
        ...state,
        tasks: updatedTasks.sort((a, b) => b.important - a.important),
      };
    case "UPDATE_TASK_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, completed: action.payload.completed }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload._id),
        deletedTasks: state.deletedTasks + 1,
      };
    default:
      return state;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: null,
    deletedTasks: 0,
  });
  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
