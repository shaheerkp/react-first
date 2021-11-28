import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Todo.css";

function Todo(props) {
  const [todoss, setTodoss] = useState([]);
  const [todo, setTodo] = useState("");
  const [userId, setUserId] = useState("");
  let data;
  useEffect(() => {
    let id = { id: props.data };
    setUserId(props.data);
    axios.post("http://localhost:4000/gettasks", id).then((res) => {
      data = res.data;
      console.log(...data);
      setTodoss([...data]);
    });
  }, [todoss]);

  console.log("todoss", todoss);

  const addTodo = () => {
    const add = {
      task: todo,
      userid: userId,
    };
    axios.post("http://localhost:4000/addtask", add).then((res) => {
      if (res.data.status) {
        alert(res.data.mes);
      } else {
        alert(res.data.mes);
      }
    });
  };

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
        <input
          value={todo}
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {todoss.map((value) => {
          return (
            <div className="todo">
              <div className="left">
                <input  checked={value.iscompleted} onChange={(e)=>{
                  axios.post("http://localhost:4000/changestatus",{date:value.date,userid:userId,iscompleted:value.iscompleted})

                }} type="checkbox" name="" id="" />
                <p style={value.iscompleted?{textDecoration:"line-through"}:null} >{value.task}</p>
              </div>
              <div className="right">
                <i className="fas fa-times"></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
