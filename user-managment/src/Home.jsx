import React from "react";
import { Link } from "react-router-dom";
import './Todo'
import Todo from "./Todo";

function Home() {
  return (
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
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "black" }}
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    <Todo></Todo>
    </div>

  );
}

export default Home;
