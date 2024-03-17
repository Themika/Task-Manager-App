import { createContext, useReducer } from "react";

export const TaskContext = createContext();

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: action.payload,
      };
    case "CREATE_TASK":
      return {
        tasks: [action.payload, ...state.tasks],
      };
    case "UPDATE_TASK_IMPORTANT":
      return {
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, important: action.payload.important }
            : task
        ),
      };
    case "UPDATE_TASK_COMPLETED":
      return {
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, completed: action.payload.completed }
            : task
        ),
      };
    default:
      return state;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: null,
  });
  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
