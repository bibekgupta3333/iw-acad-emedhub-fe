import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-sm navbar-primary text-center bg-primary h-25"
        style={{ width: "100%" }}
      >
        <h6 className="navbar-brand text-light text-center mx-auto" href="">
          &copy; Copyright 2020 E-MedHub owned by Bibek Gupta
        </h6>
      </nav>
    );
  }
}
