import React, { Component } from "react";
import { Link } from "react-router-dom";
class NotFound extends Component {
  render() {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div
          className="card mb-3 shadow border border-dark"
          style={{ width: "60vh" }}
        >
          <div
            className="card-header text-center bg-danger font-weight-bold text-white"
            style={{ fontSize: "1rem" }}
          >
            <h1>NotFound</h1>
            <p>Sorry this page does not exists</p>
            <p>
              <Link to="/" className="text-light">
                {" "}
                Click Here To Go Back Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
