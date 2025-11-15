const API_URL_BASE = "http://localhost:8000"

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  // if no body
  if (res.status === 204) return null;
  return res.json();
}
export async function getTasksByListId(listId) {
  const data = await fetch(`${API_URL_BASE}/todos/${listId}`);
  console.log("get todolist data from backend:", data); 
  return handleResponse(data);
}
export async function getTodos() {
  const res = await fetch(`${API_URL_BASE}/todos`); 
  const data = await handleResponse(res);
  console.log("getTodos data from backend:", data); 
  return data;
}
export async function createTodos(todoname) {
  const res = await fetch(`${API_URL_BASE}/todos/create_todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todoname }),
  });
  return handleResponse(res);
}
export async function createTodo(task, description, listodo_id) {
  const res = await fetch(`${API_URL_BASE}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, description, listodo_id }),
  });
  return handleResponse(res);
}
export async function updateTodo(id, patch) {
  const res = await fetch(`${API_URL_BASE}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return handleResponse(res);
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_URL_BASE}/todos/delete_todos/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}