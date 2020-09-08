import { Helmet } from "react-helmet";
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
    if (localStorage.getItem("isAuthenticated") === "true") {
      this.props.history.push("/");
    }
    const { email, errors } = this.state;
    document.body.style.background =
      "url('https://previews.123rf.com/images/redspruce/redspruce1506/redspruce150600031/40901625-seamless-health-care-and-medicine-doodle-background.jpg') no-repeat center center/cover";

    return (
      <React.Fragment>
        <Helmet>
          <title>Reset Account | E-MEDHUB</title>
          <meta name="description" content="reset" />
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
              Reset Account
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

                <input
                  type="submit"
                  value="Reset"
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

Reset.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default connect(null, { reset })(Reset);
