import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTasksByListId } from "../api";

function ListTasksPage() {
  const { listId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setStatus("Loading tasks...");
        console.log("Loading tasks for listId:", listId);
        const data = await getTasksByListId(listId);
        console.log("Loaded successfully" );
        setTasks(Array.isArray(data.todos) ? data.todos : []);
        setStatus("Loaded");
      } catch (err) {
        console.error(err);
        setStatus("Failed to load tasks");
      }
    }
    load();
  }, [listId]);

  return (
    <div className="card">
      <button className="view-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Tasks for list #{listId}</h2>

      <ul className="todo-list">
        {tasks.length === 0 && <li className="empty">No tasks in this list</li>}
        {tasks.map((task) => (
          <li key={task.id} className="todo-item">
            {task.task ?? task.taskname ?? task.title ?? JSON.stringify(task)}
          </li>
        ))}
      </ul>

      <p className="read-the-docs">{status}</p>
    </div>
  );
}

export default ListTasksPage;
