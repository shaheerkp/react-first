import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./SignUp";
import Signin from "./Signin";
import Home from "./Home";
// import SignUp from "./components/signup.component";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="outer ">
          <Routes>
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
