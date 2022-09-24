import React from 'react'
import "./Todo.css";
import ShowTodo from '../ShowTodo/ShowTodo';

function Todo() {
  
  return (
    <div className='todo-container'>
        <h1>React Todo</h1>
        <ShowTodo />
    </div>
  )
}

export default Todo