import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ListToDoPage.css";
import { 
        getTodos, 
        createTodos, 
        updateTodo, 
        deleteTodo } 
        from "../api";
function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  async function load() {
      try {
        setLoading(true);
        setStatus("Loading todos...");
        console.log("Todos loaded in App.jsx:");
        const data = await getTodos();
        console.log("Todos loaded in App.jsx:", data);  
        setTodos(data);
        setStatus("Loaded");
      } catch (err) {
        console.error(err);
        setStatus("Failed to load todos");
      } finally {
        setLoading(false);
      }
    }
  useEffect(() => {
    load();
  }, []);
  async function handleAdd(e) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    try {
      setStatus("Creating todo...");
      const created = await createTodos(title);
      setTodos((prev) => [...prev, created]);
      setNewTitle("");
      setStatus("Todo created");
      await load();
    } catch (err) {
      console.error(err);
      setStatus("Failed to create todo");
    }
    
  }
  
  async function handleDelete(id) {
    try {
      setStatus("Deleting todo...");
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setStatus("Todo deleted");
    } catch (err) {
      console.error(err);
      setStatus("Failed to delete todo");
    }
  }
  return (
    <>
      <div className="card">
        <h1>My Todos (Postgres)</h1>

        <form onSubmit={handleAdd} className="todo-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            Add
          </button>
        </form>

        {loading && <p>Loading…</p>}

        <ul className="todo-list">
          {todos.length === 0 && !loading && (
            <li className="empty">No todos yet. Add one above 👆</li>
          )}

          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <label>
                <span className={todo.completed ? "done" : ""}>
                  {todo.nameoflist}
                </span>
                <span className="badge">
                  {todo.numoftask ?? 0}
                </span>
              </label>

              <div>
              <button
                type="button"
                className="view-btn"
                onClick={() => navigate(`/lists/${todo.id}`)}
              >
                View
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
            </li>
          ))}
        </ul>

        <p className="read-the-docs">{status}</p>
      </div>
    </>
  );
}

export default App
