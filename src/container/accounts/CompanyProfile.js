import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../../hocs/TextInputGroups";
import { connect } from "react-redux";
import {
  get_company_profile,
  update_company_profile,
} from "../../actions/auth.js";
import { Helmet } from "react-helmet";
import { setAlert } from "../../actions/alert";

class CompanyProfile extends Component {
  state = {
    username: "",
    email: "",
    photo: "",
    phone: "",
    address: "",
    bio: "",
    company_name: "",
    errors: {},
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { phone, photo, address, bio, company_name } = nextProps.auth.profile;

    this.setState({
      username: nextProps.auth.profile.user
        ? nextProps.auth.profile.user.username
        : "",
      email: nextProps.auth.profile.user
        ? nextProps.auth.profile.user.email
        : "",
      phone,
      address,
      photo,
      bio,
      company_name,
    });
  }
  componentDidMount() {
    if (
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("is_seller") === "true"
    ) {
      const { id } = this.props.match.params;
      if (localStorage.getItem("id") == id) {
        this.props.get_company_profile(id);
      } else {
        this.props.history.push("/");
        this.props.setAlert("this is not your profile", "danger");
      }
    } else {
      this.props.history.push("/");
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {
      username,
      email,
      phone,
      bio,
      photo,
      company_name,
      address,
    } = this.state;

    if (username === "") {
      this.setState({ errors: { username: "Username is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({
        errors: {
          phone: "Phone is required and length must be equal to 10",
        },
      });
      return;
    }
    if (address === "") {
      this.setState({ errors: { address: "Address is doesnot match" } });
      return;
    }
    if (company_name === "") {
      this.setState({
        errors: { company_name: "Enter your company name complete" },
      });
      return;
    }
    const { id } = this.props.match.params;
    let form_data = new FormData();
    if (typeof photo === "object") {
      form_data.append("photo", photo, photo.name);
    }
    form_data.append("address", address);
    form_data.append("phone", phone);
    form_data.append("bio", bio);
    form_data.append("company_name", company_name);
    let users = [id, form_data];
    this.props.update_company_profile(users);

    // Clear State
    this.setState({
      username: "",
      email: "",
      photo: "",
      phone: "",
      address: "",
      errors: "",
      company_name: "",
    });

    // Redirect using history object
    this.props.history.push("/");
  };

  onChange = (e) => {
    e.target.name === "photo"
      ? this.setState({ [e.target.name]: e.target.files[0] })
      : this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("is_seller") === "true"
    ) {
    } else {
      this.props.history.push("/");
    }
    const {
      username,
      email,
      phone,
      address,
      photo,
      bio,
      company_name,
      errors,
    } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Company Profile| E-MEDHUB</title>
          <meta name="description" content="Profile about company" />
        </Helmet>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ paddingTop: "10vh" }}
        >
          <div
            className="card mb-3 shadow border border-dark"
            style={{ width: "90vw" }}
          >
            <div
              className="card-header text-uppercase text-center bg-dark font-weight-bold text-white"
              style={{ fontSize: "1rem" }}
            >
              company Profile
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  label="Username"
                  name="username"
                  placeholder="Enter Name..."
                  value={username}
                  error={errors.username}
                />
                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  extraclass="disable"
                  placeholder="Enter Email..."
                  value={email}
                  error={errors.email}
                />
                <div className="form-group">
                  <label htmlFor="profile">Current Profile Pic</label>
                  <br />
                  <img
                    width="100px"
                    height="100px"
                    name="profile"
                    src={`http://bibekgupta4444.pythonanywhere.com${photo}`}
                    alt={`${photo ? photo.name : "no image"}`}
                  />
                </div>
                <div className="custom-file">
                  {photo
                    ? document
                        .getElementById("photo1")
                        .removeAttribute("required")
                    : ""}
                  <input
                    id="photo1"
                    name="photo"
                    type="file"
                    accept="image/png, image/jpeg,image/jpg"
                    onChange={this.onChange}
                    className="custom-file-input"
                    required
                  />
                  <label htmlFor="" className="custom-file-label">
                    Choose new profile pic
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="">Bio</label>
                  <textarea
                    name="bio"
                    value={bio}
                    onChange={this.onChange}
                    className="form-control"
                    row="4"
                  ></textarea>
                </div>
                <TextInputGroup
                  label="Company Name"
                  name="company_name"
                  required="true"
                  type="text"
                  placeholder="Enter Company Name..."
                  value={company_name ? company_name : ""}
                  onChange={this.onChange}
                  error={errors.company_name}
                />
                <TextInputGroup
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder="Enter Phone..."
                  value={phone}
                  required="true"
                  onChange={this.onChange}
                  error={errors.phone}
                />
                <TextInputGroup
                  label="Address (street,city,country)"
                  name="address"
                  type="text"
                  placeholder="Enter Address..."
                  value={address || ""}
                  onChange={this.onChange}
                  required="true"
                  error={errors.address}
                />
                <input
                  type="submit"
                  value="Update Profile"
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

CompanyProfile.propTypes = {
  get_company_profile: PropTypes.func.isRequired,
  update_company_profile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  get_company_profile,
  update_company_profile,
  setAlert,
})(CompanyProfile);
