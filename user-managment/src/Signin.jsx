import React, { useState } from "react";
import axios from "axios";

function Signin() {

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
    console.log(register);
    axios.post("http://localhost:4000/signin", register).then((response) => {
      console.log(response);
    });
  };


  return (
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
        <a href="signup">create account</a>
      </p>
    </form>
  );
}

export default Signin;
