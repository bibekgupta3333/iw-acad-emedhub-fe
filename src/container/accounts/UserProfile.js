import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../../hocs/TextInputGroups";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { get_profile, update_profile } from "../../actions/auth";
class UserProfile extends Component {
  state = {
    username: "",
    email: "",
    photo: "",
    phone: "",
    address: "",
    bio: "",
    errors: {},
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { phone, photo, address, bio } = nextProps.auth.profile;

    // console.log(email, "frontend");
    // console.log(nextProps.auth.profile);
    this.setState({
      username: nextProps.auth.profile.user
        ? nextProps.auth.profile.user.username
        : this.componentDidMount(),
      email: nextProps.auth.profile.user
        ? nextProps.auth.profile.user.email
        : "",
      phone,
      address,
      photo,
      bio,
    });
  }
  componentDidMount() {
    if (
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("is_buyer") === "true"
    ) {
      const { id } = this.props.match.params;
      if (localStorage.getItem("id") == id) {
        this.props.get_profile(id);
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

    const { username, email, phone, bio, photo, address } = this.state;

    if (username === "") {
      this.setState({ errors: { username: "Username is required" } });
      return;
    }

    if (username === "" || username.includes("@") || username.length <= 8) {
      this.setState({
        errors: {
          username:
            "Username is required,must not contain @ and length must be greater than 8 letters",
        },
      });
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
    const { id } = this.props.match.params;

    let form_data = new FormData();
    if (typeof photo === "object") {
      form_data.append("photo", photo, photo.name);
    }
    form_data.append("address", address);
    form_data.append("phone", phone);
    form_data.append("bio", bio);
    let users = [id, form_data];
    this.props.update_profile(users);

    // Clear State
    this.setState({
      username: "",
      email: "",
      photo: "",
      phone: "",
      address: "",
      errors: "",
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
    const { username, email, phone, address, photo, bio, errors } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>User Profile | E-MEDHUB</title>
          <meta name="description" content="user profile" />
        </Helmet>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ paddingTop: "8vh" }}
        >
          <div
            className="card mb-3 shadow border border-dark"
            style={{ width: "70vw" }}
          >
            <div
              className="card-header text-uppercase text-center bg-dark font-weight-bold text-white"
              style={{ fontSize: "1rem" }}
            >
              User Profile
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  label="Username"
                  name="username"
                  placeholder="Enter Name..."
                  value={username ? username : ""}
                  error={errors.username}
                />
                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter Email..."
                  value={email ? email : ""}
                  error={errors.email}
                />
                <div className="form-group">
                  <label htmlFor="profile">Current Profile Pic</label>
                  <br />
                  <img
                    width="100px"
                    height="100px"
                    name="profile"
                    src={`http://bibekgupta4444.pythonanywhere.com${
                      photo ? photo : ""
                    }`}
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
                  <label htmlFor="">BIO</label>
                  <textarea
                    name="bio"
                    value={bio}
                    onChange={this.onChange}
                    className="form-control"
                    row="4"
                  ></textarea>
                </div>
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
                  required="true"
                  onChange={this.onChange}
                  error={errors.address}
                />
                <input
                  type="submit"
                  value="Update Profile"
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

UserProfile.propTypes = {
  get_profile: PropTypes.func.isRequired,
  update_profile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { get_profile, update_profile })(
  UserProfile
);
