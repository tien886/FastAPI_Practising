from sqlalchemy import Boolean, Column, Integer, String, ForeignKey 
from database import Base 
class ListToDo(Base):
    __tablename__ = 'ListToDo'
    
    id = Column(Integer, primary_key=True, index=True)
    nameoflist = Column(String, index=True, nullable=False)
    numoftask = Column(Integer, index=True, nullable=False)
class ToDoItem(Base):
    __tablename__ = 'ToDoItem'
    
    id = Column(Integer, primary_key=True, index=True)
    task = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    listodo_id = Column(Integer, ForeignKey('ListToDo.id'))