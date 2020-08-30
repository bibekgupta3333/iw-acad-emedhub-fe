import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextInputGroup from "../../hocs/TextInputGroups";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (password === "") {
      console.log("password");
      this.setState({ errors: { password: "Password is required" } });
      return;
    }
    const user = {
      email,
      password,
    };
    this.props.login(user);
    // Clear State
    this.setState({
      email: "",
      password: "",
      errors: "",
    });

    // Redirect using history object
    this.props.history.push("/");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header bg-dark text-white">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
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

            <input type="submit" value="SignUp" className="btn btn-block" />
          </form>
          <div className="d-flex flex-row justify-content-between text-light">
            <Link to="/signup" className=" btn btn-secondary shadow px-3">
              <i className="fas fa-question" /> SignUp
            </Link>

            <Link to="/reset" className="btn btn-secondary shadow px-3">
              <i className="fas fa-question" /> Reset
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
