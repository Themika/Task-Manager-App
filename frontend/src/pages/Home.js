import { useEffect, useState } from "react";

// components
import TaskDetail from "../components/TaskDetail.js";

const Home = () => {
  const [tasks, setTasks] = useState(null);

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

  return (
    <div className="home">
      <div className="tasks">
        {tasks &&
          tasks.map((task) => <TaskDetail key={task._id} task={task} />)}
      </div>
    </div>
  );
};

export default Home;
