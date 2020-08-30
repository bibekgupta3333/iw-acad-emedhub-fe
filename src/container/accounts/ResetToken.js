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
    console.log(email, "what is good");
    this.setState({
      email: email,
    });
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
    const { email, password, password2, errors } = this.state;

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

ResetToken.propTypes = {
  get_token: PropTypes.func.isRequired,
  reset_token: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { get_token, reset_token })(ResetToken);
