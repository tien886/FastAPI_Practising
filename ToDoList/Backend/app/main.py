from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated, Optional
import model
from database import SessionLocal, engine
from sqlalchemy.orm import Session
app = FastAPI()
model.Base.metadata.create_all(bind=engine)
     
class ToDoBase(BaseModel):
    task: str
    description: str
    listodo_id: int
class ListToDoBase(BaseModel):
    todos: List[ToDoBase]
    nameoflist: str
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
db_dependency = Annotated[Session, Depends(get_db)]
@app.get('/todos/{todolist_id}')
async def read_todolist(todolist_id: int, db: db_dependency):
    db_todolist = db.query(model.ListToDo).filter(model.ListToDo.id == todolist_id).first()
    if not db_todolist:
        raise HTTPException(status_code=404, detail="ToDo list not found")
    return db_todolist
@app.get('/todos/todo/{todo_id}')
async def read_todo(todo_id: int, db: db_dependency):
    db_todo = db.query(model.ToDoItem).filter(model.ToDoItem.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="ToDo item not found")
    return db_todo
@app.post('/todos/create_todos')
async def create_todos(todos: ListToDoBase, db: db_dependency):
    db_todolist = model.ListToDo(nameoflist=todos.nameoflist, numoftask=len(todos.todos))
    db.add(db_todolist)
    db.commit()
    db.refresh(db_todolist)
    print(todos)
    for todo in todos.todos:
        db_todo = model.ToDoItem(task=todo.task, description=todo.description, listodo_id=db_todolist.id)
        db.add(db_todo)
    db.commit()
    return {"result": "Todos created successfully"}
@app.put('/todos/update_todo/{todo_id}')
async def update_todo(todo_id: int, todo: ToDoBase, db: db_dependency):
    db_todo = db.query(model.ToDoItem).filter(model.ToDoItem.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="ToDo item not found")
    db_todo.task = todo.task
    db_todo.description = todo.description
    if db_todo.listodo_id != todo.listodo_id:
        db_listtodo = db.query(model.ListToDo).filter(model.ListToDo.id == todo.listodo_id).first()
        if db_listtodo:
            print("Increasing old list task count")
            db_listtodo.numoftask += 1
    db_todo.listodo_id = todo.listodo_id
    db.commit()
    db.refresh(db_todo)
    return {"result": "Todo updated successfully", "todo": db_todo}
@app.delete('/todos/delete_todo/{todo_id}')
async def delete_todo(todo_id: int, db: db_dependency):
    db_todo = db.query(model.ToDoItem).filter(model.ToDoItem.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="ToDo item not found")
    db.delete(db_todo)
    db.commit()
    return {"result": "Todo deleted successfully"}