import { Helmet } from "react-helmet";

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
    if (localStorage.getItem("isAuthenticated") === "true") {
      this.props.history.push("/");
    }
    const { email, password, errors } = this.state;
    document.body.style.background =
      "url('https://previews.123rf.com/images/redspruce/redspruce1506/redspruce150600031/40901625-seamless-health-care-and-medicine-doodle-background.jpg') no-repeat center center/cover";

    return (
      <React.Fragment>
        <Helmet>
          <title>Login | E-MEDHUB</title>
          <meta name="description" content="login" />
        </Helmet>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <div
            className="card mb-3 shadow border border-dark"
            style={{ width: "60vh" }}
          >
            <div
              className="card-header text-center bg-dark font-weight-bold text-white"
              style={{ fontSize: "1rem" }}
            >
              Login
            </div>
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

                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block"
                />
              </form>
              <div className="d-flex flex-row justify-content-between text-light pt-4">
                <Link to="/signup" className=" btn btn-dark shadow ">
                  SignUp
                </Link>

                <Link to="/reset" className="btn btn-dark shadow ">
                  Reset
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
