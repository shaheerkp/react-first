import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Signin() {
  const [loaded,setLoaded] = useState(false);
  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
      .get("http://localhost:4000/home", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setLoaded(true);
        console.log(res);
        if (res.data.status) {
          navigate("/");
        } else {
          setLoaded(true);
        }
      });
    }else{
     setLoaded(true)
    }
  }, []);
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changePassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };
  const changeEmail = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const userSignIn = (e) => {
    e.preventDefault();
    const register = {
      email: user.email,
      password: user.password,
    };
    axios.post("http://localhost:4000/signin", register).then((response) => {
      console.log("asdasdasdasdasdasdasdasd",response.data.user);
    
      if (response.data.status) {
        localStorage.setItem("token", "Bearer " + response.data.token);
        localStorage.setItem("name",response.data.user.fullName);
        localStorage.setItem("id",response.data.user._id);

        userAuthenticaion();
        // navigate("/")
      } else {
        alert("login failed");
      }
    });
  };

  const userAuthenticaion = () => {
    alert("user auth");
    axios
      .get("http://localhost:4000/home", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((res) => {
     
        console.log(res);
        if (res.data.status) {
          navigate("/");
        } else {
          
        }
      });
  };

  return (
    <div className="inner ">
      {
      loaded?
      <form onSubmit={userSignIn}>
      <h3>Log in</h3>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          onChange={changeEmail}
          value={user.email}
          className="form-control form-group"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={changePassword}
          value={user.password}
          className="form-control form-group"
        />
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">
        Sign in
      </button>
      <p className="forgot-password text-right">
        <Link to="/signup">Create Account</Link>
      </p>
    </form>:<h1>Wait</h1>
      }
     
    </div>
  );
}

export default Signin;
