import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

function SignUp() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    err: "",
  });

  const changeFullname = (e) => {
    setUser({ ...user, fullName: e.target.value });
  };
  const changeUsername = (e) => {
    setUser({ ...user, userName: e.target.value });
  };
  const changePassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };
  const changeEmail = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const validate=()=>{
    if(!user.email.includes('@')){
      setUser({...user,err:"invalid email"})
      return false
  
    }
    else if(!user.fullName){
      setUser({...user,err:"Full name cannot be blank"})
      return false

    }
    else if(!user.userName){
      setUser({...user,err:"User name cannot be blank"})
      return false

    }   
   
    else if(!user.password){
      setUser({...user,err:"Password cannot be blank"})
      return false

    }
    else{
      setUser({...user,err:""})
      return true

    }

  }

  const userSignUp = (e) => {
    e.preventDefault();
    const valid=validate()
    if(valid){
      const register = {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        password: user.password,
      };
      console.log(register);
      axios.post("http://localhost:4000/signup", register).then((response) => { 
        console.log(response)  
        if(!response.data.err){
          navigate("/");

        }   
        else{
          alert("user already exsist")
        }
              
      });
    }
    else{
      alert("Enter all fields correctly")
    }

  };

  return (
    <div className="inner ">
    <div className="container ">
      <form onSubmit={userSignUp}>
        <h3>Register</h3>
        {user.err?(<h5 className="text-center text-danger ">{user.err}</h5>):null}

        <div className="form-group ">
          <label>Full name</label>
          <input
            type="text"
            placeholder="fullname"
            onChange={changeFullname}
            value={user.fullName}
            className="form-control form-group"
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            placeholder="username"
            onChange={changeUsername}
            value={user.userName}
            className="form-control form-group"
          />
        </div>

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
          Register
        </button>
        <p className="forgot-password text-right">
          Already registered  <Link to="/signin">Click here</Link>
        </p>
      </form>
    </div>
    </div>

  );
}

export default SignUp;
