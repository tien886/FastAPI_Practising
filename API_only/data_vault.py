todos = [
    {"todo_id": 1, "task": "Learn FastAPI", "completed": False},
    {"todo_id": 2, "task": "Learn SQL", "completed": False},
    {"todo_id": 3, "task": "Do gym", "completed": True},
    {"todo_id": 4, "task": "Play game", "completed": False},
    {"todo_id": 5, "task": "Sleep", "completed": True}
]

def find_AvailableID():
    return todos.__len__() + 1