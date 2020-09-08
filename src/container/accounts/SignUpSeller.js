import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../../hocs/TextInputGroups";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { signup } from "../../actions/auth";

class SignUpSeller extends Component {
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
    if (
      password === "" ||
      password.length <= 8 ||
      email === password ||
      username === password
    ) {
      this.setState({
        errors: {
          password:
            "Password is required,password must not same as email or username and length must be greater than 8 letters",
        },
      });
      return;
    }
    if (password2 === "" || password !== password2) {
      this.setState({ errors: { password2: "Password  doesnot match" } });
      return;
    }
    const newUser = {
      username,
      email,
      password,
      password2,
      is_buyer: false,
      is_seller: true,
    };

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
    if (localStorage.getItem("isAuthenticated") === "true") {
      this.props.history.push("/");
    }
    document.body.style.background =
      "url('https://previews.123rf.com/images/redspruce/redspruce1506/redspruce150600031/40901625-seamless-health-care-and-medicine-doodle-background.jpg') no-repeat center center/cover";
    const {
      username,
      email,

      password,
      password2,
      errors,
    } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Seller SignUp | E-MEDHUB</title>
          <meta name="description" content="seller signup" />
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
              Seller SignUp
            </div>
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
                <input
                  type="submit"
                  value="SignUp"
                  className="btn btn-block btn-primary"
                />
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SignUpSeller.propTypes = {
  signup: PropTypes.func.isRequired,
};

export default connect(null, { signup })(SignUpSeller);
