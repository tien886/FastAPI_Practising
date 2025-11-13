from fastapi import FastAPI
from pydantic import BaseModel
import data_vault
api = FastAPI()
class TodoItem(BaseModel):
    task: str
    completed: bool
    
@api.get('/tien')
def get_root():
    return {"message": "it's ok"}
@api.get('/get_data')
def get_data():
    pass 
    return {"data": "sample data"}
@api.get('/todos/{todo_id}')
def get_todo(todo_id: int):
    for todo in data_vault.todos:
        if todo["todo_id"] == todo_id:
            return todo
    return {"error": "Todo not found"}
@api.get('/todos')
def get_todos(numbers_todo: int = None):
    if numbers_todo:
        return data_vault.todos[:numbers_todo]
    else:
        return data_vault.todos 
@api.post('/todos/create_todo')
def create_todo(todo: TodoItem):
    new_id = data_vault.find_AvailableID() 
    print(todo)
    new_todo = {
        "todo_id" : new_id,
        "task" : todo.task,
        "completed": todo.completed
        }
    data_vault.todos.append(new_todo)
    return {
        "result" : "Todo created successfully",
        "todo" : new_todo   
    }