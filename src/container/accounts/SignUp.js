import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../../hocs/TextInputGroups";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    is_buyer: false,
    is_seller: false,
    errors: {},
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, password2 } = this.state;

    if (username === "") {
      this.setState({ errors: { username: "Username is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (password === "") {
      console.log("password");
      this.setState({ errors: { password: "Password is required" } });
      return;
    }
    if (password2 === "" || password !== password2) {
      console.log("password2");
      this.setState({ errors: { password2: "Password is doesnot match" } });
      return;
    }
    const newUser = {
      username,
      email,
      password,
      password2,
      is_buyer: true,
      is_seller: false,
    };

    console.log(newUser);
    this.props.signup(newUser);
    // Clear State
    this.setState({
      username: "",
      email: "",
      password: "",
      password2: "",

      errors: "",
    });

    // Redirect using history object
    this.props.history.push("/");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      username,
      email,

      password,
      password2,
      errors,
    } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header bg-dark text-white">Buyer SignUp</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Username"
              name="username"
              placeholder="Enter Name..."
              value={username}
              onChange={this.onChange}
              error={errors.username}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email..."
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password..."
              value={password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextInputGroup
              label="Password"
              name="password2"
              type="password"
              placeholder="Enter Password..."
              value={password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            <input type="submit" value="SignUp" className="btn btn-block" />
          </form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
};

export default connect(null, { signup })(SignUp);
