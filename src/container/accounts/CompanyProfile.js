import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../../hocs/TextInputGroups";
import { connect } from "react-redux";
import {
  get_company_profile,
  update_company_profile,
} from "../../actions/auth.js";
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
    const { username, email } = nextProps.auth.profile.user;
    console.log(email, "frontend");
    console.log(nextProps.auth.profile);
    this.setState({
      username,
      email,
      phone,
      address,
      photo,
      bio,
      company_name,
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.get_company_profile(id);
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
    if (company_name === "") {
      console.log("password2");
      this.setState({
        errors: { company_name: "Enter your company name complete" },
      });
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
    console.log(this.state.photo);
  };

  render() {
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

CompanyProfile.propTypes = {
  get_company_profile: PropTypes.func.isRequired,
  update_company_profile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  get_company_profile,
  update_company_profile,
})(CompanyProfile);
