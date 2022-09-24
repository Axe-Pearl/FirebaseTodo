import React from 'react'
import "./Todo.css";
import AddTodo from '../AddTodo/AddTodo.js';
import ShowTodo from '../ShowTodo/ShowTodo';

function Todo() {
  
  return (
    <div className='todo-container'>
        <h1>React Todo</h1>
        <ShowTodo />
        <AddTodo />
    </div>
  )
}

export default Todo