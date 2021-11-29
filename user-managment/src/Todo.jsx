import axios from "axios";
import React, { useEffect, useState } from "react";
import { getTasks } from "./hadler/handler";
import "./Todo.css";

function Todo(props) {
  const [todoss, setTodoss] = useState([]);
  const [todo, setTodo] = useState("");
  const [userId, setUserId] = useState("");
  const [select,setSelect]=useState("")
  let data;
  var d = new Date();
  var n = d.getDay();
  let weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    let id = { id: props.data };
    setUserId(props.data);
    axios.post("http://localhost:4000/gettasks", id).then((res) => {
      data = res.data;
      console.log(...data);
      setTodoss([...data]);
    });
  }, []);

  console.log("todoss", todoss);

  const addTodo = () => {
    const add = {
      task: todo,
      userid: userId,
    };
    axios.post("http://localhost:4000/addtask", add).then((res) => {
      if (res.data.status) {
        setTodoss([...todoss, add]);
        setTodo("");
      } else {
        alert(res.data.mes);
      }
    });
  };

  const  getFilteredData=async(value)=>{
    alert(value)
    getTasks(userId,value,(data)=>{
      console.log(data,"dataaaa");
      setTodoss([...data])

    });

  }

  return (
    <div className="app">
      <div className="mt-5 mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {weeks[n]} 🌝 ☕ </h2>
      </div>
      <div style={{ display: "flex" }}>
        <div className="input">
          <input
            value={todo}
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            placeholder="🖊️ Add item..."
          />
          <i onClick={addTodo} className="fas fa-plus"></i>
        </div>
        <select
          onChange={(e) => {
            getFilteredData(e.target.value)
            
          }}
          class="form-select ms-5 mt-2"
          style={{ width: "15rem" }}
          aria-label="Default select example"
        >
           <option  value="all">Select</option>
          <option  value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
      </div> 
 
      <div className="todos">
        {todoss.map((value, index) => {
          return (
            <div className="todo">
              <div className="left">
                <input
                  checked={value.iscompleted}
                  onChange={(e) => {
                    axios.post("http://localhost:4000/changestatus", {
                      date: value.date,
                      userid: userId,
                      iscompleted: value.iscompleted,
                    });
                    todoss[index].iscompleted = !value.iscompleted;
                    setTodoss([...todoss]);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p
                  style={
                    value.iscompleted
                      ? { textDecoration: "line-through" }
                      : null
                  }
                >
                  {value.task}
                </p>
              </div>
              <div className="right">
                <i
                  onClick={() => {
                    todoss.splice(index, 1);
                    setTodoss([...todoss]);
                    axios.post("http://localhost:4000/delete", {
                      date: value.date,
                      userid: userId,
                    });
                  }}
                  className="fas fa-times"
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
