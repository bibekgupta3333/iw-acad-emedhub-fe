import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

import { get_company_profile, get_profile } from "../actions/auth.js";
class Navbar extends Component {
  logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("is_seller");
    localStorage.removeItem("is_buyer");
    this.props.logout();
  };

  componentDidMount() {
    if (localStorage.getItem("id")) {
      if (localStorage.getItem("is_seller")) {
        this.props.get_company_profile(localStorage.getItem("id"));
      } else {
        this.props.get_profile(localStorage.getItem("id"));
      }
    }
  }

  render() {
    const { branding } = this.props;
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");
    let isAuthenticated = localStorage.getItem("isAuthenticated");
    let is_seller = localStorage.getItem("is_seller");
    let is_buyer = localStorage.getItem("is_buyer");
    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark bg-primary border-bottom border-bottom border-dark "
        style={{ height: "4.5rem", width: "100vw" }}
      >
        <div className="container">
          <a
            className="navbar-brand font-weight-bold"
            style={{ fontSize: "2.5rem" }}
            href="/e-medhub"
          >
            <i class=" fas fa-clinic-medical"></i> {branding}
          </a>
          <button
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse bg-primary "
            style={{ width: "100%", zIndex: "1" }}
            id="navbarNav"
          >
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0 d-flex justify-content-center align-items-center">
              <li className="nav-item">
                <Link to="/" className="nav-link text-light font-weight-bold">
                  Home
                </Link>
              </li>
              {isAuthenticated ? (
                localStorage.getItem("is_seller") === "true" ? (
                  <React.Fragment>
                    <li className="nav-item">
                      <Link
                        to="/product/create"
                        className="nav-link text-light font-weight-bold"
                      >
                        Create
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/product/user"
                        className="nav-link text-light font-weight-bold"
                      >
                        Product
                      </Link>
                    </li>
                    <li className="nav-item dropdown d-flex justify-content-center align-items-center">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <img
                          src={`http://bibekgupta4444.pythonanywhere.com${this.props.auth.profile.photo}`}
                          alt=""
                          className="rounded-circle m-0"
                          style={{ height: "2.5rem" }}
                        />
                      </a>
                      <div class="dropdown-menu w-100">
                        <Link
                          to={`/company_profile/${id}`}
                          className="nav-link text-dark font-weight-bold "
                        >
                          Company
                        </Link>
                        <div className="dropdown-divider"></div>

                        <Link
                          to="/"
                          onClick={this.logoutUser}
                          className="nav-link  text-dark font-weight-bold "
                        >
                          Logout
                        </Link>
                      </div>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li className="nav-item">
                      <Link
                        to="/cart"
                        className="nav-link text-light font-weight-bold"
                      >
                        Cart
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/checkout"
                        className="nav-link text-light font-weight-bold"
                      >
                        Checkouts
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <img
                          src={`http://bibekgupta4444.pythonanywhere.com${this.props.auth.profile.photo}`}
                          alt=""
                          className="rounded-circle m-0"
                          style={{ height: "2.5rem" }}
                        />
                      </a>
                      <div class="dropdown-menu">
                        <Link
                          to={`/user_profile/${id}`}
                          className="nav-link  text-dark font-weight-bold"
                        >
                          User
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link
                          to="/"
                          onClick={this.logoutUser}
                          className="nav-link  text-dark font-weight-bold "
                        >
                          Logout
                        </Link>
                      </div>
                    </li>
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <li className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      SignUp
                    </a>
                    <div class="dropdown-menu">
                      <Link
                        to="/signup"
                        className="nav-link  font-weight-bold text-dark"
                      >
                        Buyer
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link
                        to="/signup_seller"
                        className="nav-link font-weight-bold text-dark"
                      >
                        Seller
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link  text-light font-weight-bold"
                    >
                      Login
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
  get_company_profile: PropTypes.object.isRequired,
  get_profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  logout,
  get_profile,
  get_company_profile,
})(Navbar);
