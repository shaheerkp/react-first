import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
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

  const userSignUp = (e) => {
    e.preventDefault();
    const register = {
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      password: user.password,
    };
    console.log(register);
    axios.post("http://localhost:4000/signup", register).then((response) => {
      console.log(response);
    });
  };
  return (
    <div className="container ">
      <form onSubmit={userSignUp}>
        <h3>Register</h3>

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
          Already registered <a href="/signin">log in</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
