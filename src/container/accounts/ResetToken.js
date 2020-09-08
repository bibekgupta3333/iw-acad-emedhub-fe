import { Helmet } from "react-helmet";
import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../../hocs/TextInputGroups";
import { connect } from "react-redux";
import { get_token, reset_token } from "../../actions/auth";

class ResetToken extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    errors: {},
  };
  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { email } = nextProps.auth;
    if (email == null) {
      this.props.history.push("/");
    } else {
      this.setState({
        email: email.email,
      });
    }
  }
  componentDidMount() {
    const { token } = this.props.match.params;
    this.props.get_token(token);
  }
  onSubmit = (e) => {
    e.preventDefault();

    const { email, password, password2 } = this.state;

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (password === "" || password.length <= 8 || email === password) {
      this.setState({
        errors: {
          password:
            "Password is required,password must not same as email and length must be greater than 8 letters",
        },
      });
      return;
    }
    if (password2 === "" || password !== password2) {
      this.setState({ errors: { password2: "Password doesnot match" } });
      return;
    }
    const { token } = this.props.match.params;

    const user = {
      token,
      password,
      password2,
    };
    this.props.reset_token(user);
    // Clear State
    this.setState({
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
    const { email, password, password2, errors } = this.state;
    document.body.style.background =
      "url('https://previews.123rf.com/images/redspruce/redspruce1506/redspruce150600031/40901625-seamless-health-care-and-medicine-doodle-background.jpg') no-repeat center center/cover";

    return (
      <React.Fragment>
        <Helmet>
          <title>ResetPassword | E-MEDHUB</title>
          <meta name="description" content="rest password" />
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
              Reset Password
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter Email..."
                  value={email}
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
                  value="Reset Password"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ResetToken.propTypes = {
  get_token: PropTypes.func.isRequired,
  reset_token: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { get_token, reset_token })(ResetToken);
