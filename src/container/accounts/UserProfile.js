import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../../hocs/TextInputGroups";
import { connect } from "react-redux";
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
    const { username, email } = nextProps.auth.profile.user;
    // console.log(email, "frontend");
    // console.log(nextProps.auth.profile);
    this.setState({
      username,
      email,
      phone,
      address,
      photo,
      bio,
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.get_profile(id);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, bio, photo, address } = this.state;

    if (username === "") {
      this.setState({ errors: { username: "Username is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      console.log("password");
      this.setState({
        errors: {
          phone: "Phone is required and length must be equal to 10",
        },
      });
      return;
    }
    if (address === "") {
      console.log("password2");
      this.setState({ errors: { address: "Address is doesnot match" } });
      return;
    }
    const { id } = this.props.match.params;
    // this.props.get_token(id);

    // let user = this.props.auth.profile;
    // user.phone = phone;
    // user.address = address;
    // user.photo = photo;
    // user.bio = bio;
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
    console.log(this.state.photo);
  };

  render() {
    const { username, email, phone, address, photo, bio, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header bg-dark text-white">User Profile</div>
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
            <div className="form-group">
              <label htmlFor="profile">Current Profile Pic</label>
              <br />
              <img
                width="100px"
                height="100px"
                name="profile"
                src={`http://127.0.0.1:8000${photo}`}
                alt={`${photo ? photo.name : "no image"}`}
              />
            </div>
            <div className="custom-file">
              <input
                name="photo"
                type="file"
                accept="image/png, image/jpeg,image/jpg"
                onChange={this.onChange}
                className="custom-file-input"
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
              error={errors.address}
            />
            <input type="submit" value="SignUp" className="btn btn-block" />
          </form>
        </div>
      </div>
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
