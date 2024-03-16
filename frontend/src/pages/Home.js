import { useEffect, useState } from "react";

// components
import TaskDetail from "../components/TaskDetail.js";
import TaskForm from "../components/taskForm";

const Home = () => {
  const [tasks, setTasks] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/taskmanager/");
        const data = await res.json();
        if (res.ok) {
          setTasks(data);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

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
          {filteredTasks &&
            filteredTasks.map((task) => (
              <TaskDetail key={task._id} task={task} />
            ))}
        </div>
        <TaskForm />
      </div>
    </div>
  );
};

export default Home;
