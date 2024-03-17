import { useEffect, useState } from "react";
import { useTaskContext } from "../hooks/useTaskContext.js";
/// components
import TaskDetail from "../components/TaskDetail.js";
import TaskForm from "../components/taskForm";

const Home = () => {
  const [search, setSearch] = useState("");
  const { tasks, dispatch } = useTaskContext();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/taskmanager");
        const data = await res.json();
        if (res.ok) {
          dispatch({ type: "SET_TASKS", payload: data });
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedTasks = filteredTasks?.sort((a, b) => b.important - a.important);

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        value={search}
        onChange={handleSearch}
      />
      <div className="tasks">
        <div>
          {sortedTasks &&
            sortedTasks.map((task) => (
              <TaskDetail key={task._id} task={task} />
            ))}
        </div>
        <TaskForm />
      </div>
    </div>
  );
};

export default Home;
