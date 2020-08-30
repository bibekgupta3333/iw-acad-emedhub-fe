import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
class Navbar extends Component {
  logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("is_seller");
    localStorage.removeItem("is_buyer");
    this.props.logout();
  };
  render() {
    const { branding } = this.props;
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");
    let isAuthenticated = localStorage.getItem("isAuthenticated");
    let is_seller = localStorage.getItem("is_seller");
    let is_buyer = localStorage.getItem("is_buyer");
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light border-bottom ">
        <div className="container">
          <a className="navbar-brand" href="/">
            {branding}
          </a>

          <div>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="fas fa-home" /> Home
                </Link>
              </li>
              {isAuthenticated ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link to={`/company_profile/${id}`} className="nav-link">
                      <i className="fas fa-question" /> Company
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/user_profile/${id}`} className="nav-link">
                      <i className="fas fa-question" /> User
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/" onClick={this.logoutUser} className="nav-link">
                      Logout
                    </a>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      <i className="fas fa-question" /> SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup_seller" className="nav-link">
                      <i className="fas fa-question" /> Seller SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <i className="fas fa-question" /> Login
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  branding: PropTypes.string.isRequired,
};

// Show them without the prop
Navbar.defaultProps = {
  branding: "My App",
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
