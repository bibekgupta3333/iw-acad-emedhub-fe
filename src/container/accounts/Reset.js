import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../../hocs/TextInputGroups";
import { connect } from "react-redux";
import { reset } from "../../actions/auth";
class Reset extends Component {
  state = {
    email: "",
    errors: {},
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email } = this.state;

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    const newContact = {
      email,
    };
    this.props.reset(newContact);
    // Clear State
    this.setState({
      email: "",

      errors: "",
    });

    // Redirect using history object
    this.props.history.push("/");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { email, errors } = this.state;

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

            <input type="submit" value="Reset" className="btn btn-block" />
          </form>
        </div>
      </div>
    );
  }
}

Reset.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default connect(null, { reset })(Reset);
