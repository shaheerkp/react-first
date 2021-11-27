import React, { useState } from "react";
import './Todo.css';



function Todo() {
  const [todos,setTodos]=useState([])
  const [todo,setTodo]=useState('')

  return (
    <div className="app">
      <div className="mt-5 mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={todo}  type="text" onChange={(e)=>setTodo(e.target.value)} placeholder="🖊️ Add item..." />
        <i className="fas fa-plus"></i>
      </div>
      <div className="todos">
        <div className="todo">
          <div className="left">
            <input type="checkbox" name="" id="" />
            <p>Rect tutorial</p>
          </div>
          <div className="right">
            <i onClick={()=>setTodos([...todos,todo])} className="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
