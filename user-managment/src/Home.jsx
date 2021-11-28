import axios  from "axios";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import {  useNavigate } from "react-router-dom";
 

function Home() {
  
  const navigate = useNavigate();
  const [loaded,setLoaded] = useState(false);
  const [user,setUser]=useState('')
  const [userID,setUserID]=useState('')

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(localStorage.getItem("name"))
      setUserID(localStorage.getItem("id"))
      axios
      .get("http://localhost:4000/home", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          setLoaded(true)
        } else {
          navigate('/signin') 
        }
      });
    }
  }, []);


  return (
    <div> {
      loaded?
     <div>
      <nav class="navbar navbar-expand navbar-light bg-light fixed-top">
        <a class="navbar-brand ms-4" href="#">
          ..Todo..
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              Signout
             
            </li>
            <li class="nav-item ms-5 ">
              Welcome:{user}
       
            </li>
          </ul>
        </div>
      </nav>
      <Todo data={userID}></Todo>
     </div>
      :<h1>Wait</h1>
    }
  
 </div>
  );
}

export default Home;
