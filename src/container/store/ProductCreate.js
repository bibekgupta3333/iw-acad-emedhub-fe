import { Helmet } from "react-helmet";
import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../../hocs/TextInputGroups";
import { connect } from "react-redux";
import {
  create_product,
  get_category,
  get_sub,
  get_brand,
} from "../../actions/store";
import classnames from "classnames";
import { setAlert } from "../../actions/alert";

class ProductCreate extends Component {
  state = {
    name: "",
    generic_name: "",
    description: "",
    image: "",
    price: "",
    available: "",
    mfg_company: "",
    mfg_month: "",
    mfg_year: "",
    exp_month: "",
    exp_year: "",
    category: [],
    sub_category: [],
    brand: [],
    errors: {},
  };
  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { category, brand, sub_category } = nextProps.store;
    this.setState({
      category: category,
      brand: brand,
      sub_category: sub_category,
    });
  }
  componentDidMount() {
    this.props.get_category();
    this.props.get_sub();
    this.props.get_brand();
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      generic_name,
      description,
      image,
      price,
      mfg_company,
      mfg_month,
      mfg_year,
      exp_month,
      exp_year,
    } = this.state;
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (image === null) {
      this.setState({ errors: { image: "Image is required" } });
      return;
    }

    if (price === "") {
      this.setState({
        errors: {
          price: "Price is required",
        },
      });
      return;
    }
    if (mfg_month) {
      if (Number(mfg_month) < 1 || Number(mfg_month) > 12) {
        this.setState({
          errors: { mfg_month: "MFG Month must be between 1 to 12" },
        });
        return;
      }
    }
    if (mfg_year) {
      if (Number(mfg_year) < 2000 || Number(mfg_year) > 2100) {
        this.setState({
          errors: { mfg_year: "MFG Year must be between 2000 to 2100" },
        });
        return;
      }
    }
    if (exp_month) {
      if (Number(exp_month) < 1 || Number(exp_month) > 12) {
        this.setState({
          errors: { exp_month: "EXP Month must be between 1 to 12" },
        });
        return;
      }
    }
    if (exp_year) {
      if (Number(exp_year) < 2000 || Number(exp_year) > 2100) {
        this.setState({
          errors: { exp_year: "EXP Year must be between 2000 to 2100" },
        });
        return;
      }
    }

    let category = document.getElementById("category");
    category = category.value;

    let sub_category = document.getElementById("sub_category");
    sub_category = sub_category.value;
    let brand = document.getElementById("brand");
    brand = brand.value;

    const { user } = localStorage.getItem("id");

    var formData = new FormData();
    if (typeof image === "object") {
      formData.append("image", image, image.name);
    }
    formData.append("user", Number(localStorage.getItem("id")));
    formData.append("name", name);
    formData.append("generic_name", generic_name);
    formData.append("description", description);
    formData.append("price", Number(price));
    mfg_company ? formData.append("mfg_company", mfg_company) : console.log();
    mfg_month ? formData.append("mfg_month", mfg_month) : console.log();
    mfg_year ? formData.append("mfg_year", mfg_year) : console.log();
    exp_year ? formData.append("exp_year", exp_year) : console.log();
    exp_month ? formData.append("exp_month", exp_month) : console.log();
    category ? formData.append("category", Number(category)) : console.log();
    sub_category
      ? formData.append("sub_category", Number(sub_category))
      : console.log();
    brand ? formData.append("brand", Number(brand)) : console.log();

    this.props.create_product([formData]);

    // Clear State

    this.setState({
      name: "",
      generic_name: "",
      description: "",
      image: "",
      price: "",
      available: "",
      mfg_company: "",
      mfg_month: "",
      mfg_year: "",
      exp_month: "",
      exp_year: "",
    });

    setTimeout(() => {
      // Redirect using history object
      window.location.reload();
      this.props.history.push("/");
      this.props.setAlert("Product Created Successfully", "success");
    }, 3000);
    this.props.history.push("/");
  };

  onChange = (e) => {
    e.target.name === "image"
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
    let category = this.state.category,
      sub_category = this.state.sub_category,
      brand = this.state.brand;
    const {
      name,
      generic_name,
      description,
      image,
      price,
      mfg_company,
      mfg_month,
      mfg_year,
      exp_month,
      exp_year,
      errors,
    } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Create Product | E-MEDHUB</title>
          <meta name="description" content="create product" />
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
              Create Product
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  label="Name"
                  name="name"
                  placeholder="Enter Name..."
                  value={name}
                  onChange={this.onChange}
                  required="true"
                  error={errors.name}
                />
                <TextInputGroup
                  label="Generic Name"
                  name="generic_name"
                  type="text"
                  placeholder="Enter Generic Name..."
                  value={generic_name ? generic_name : ""}
                  onChange={this.onChange}
                  error={errors.generic_name}
                />
                <div className="form-group">
                  <label htmlFor="image">Current Product Pic</label>
                  <br />
                  <img
                    className="d-inline-block"
                    width={`${image ? "250px" : "250px"}`}
                    height={`${image ? "30px" : "30px"}`}
                    name="image"
                    src={`http://bibekgupta4444.pythonanywhere.com/${image}`}
                    alt={`${image ? image.name : "no image"}`}
                  />
                  {image ? (
                    <p className="text-success">Uploaded</p>
                  ) : (
                    <p className="text-danger ">Not Uploaded</p>
                  )}
                  <p className="text-seondary m-0" style={{ fontSize: "12px" }}>
                    Size less 20 MB
                  </p>
                </div>
                <div className="custom-file">
                  <input
                    name="image"
                    type="file"
                    accept="image/png, image/jpeg,image/jpg"
                    onChange={this.onChange}
                    className="custom-file-input"
                    required
                  />
                  <label htmlFor="" className="custom-file-label">
                    Choose new product pic
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="">Description</label>
                  <textarea
                    name="description"
                    value={description ? description : ""}
                    onChange={this.onChange}
                    className="form-control"
                    row="4"
                  ></textarea>
                </div>
                <TextInputGroup
                  label="Manufacture Company Name"
                  name="mfg_company"
                  type="text"
                  placeholder="Enter Manufacture Company Name..."
                  value={mfg_company ? mfg_company : ""}
                  onChange={this.onChange}
                  error={errors.company_name}
                />
                <TextInputGroup
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="Enter Price of Product..."
                  value={price}
                  required="true"
                  onChange={this.onChange}
                  error={errors.price}
                />
                <TextInputGroup
                  label="Manufacture Month"
                  name="mfg_month"
                  type="text"
                  placeholder="Enter Manufacture Month..."
                  value={mfg_month ? mfg_month : ""}
                  onChange={this.onChange}
                  error={errors.mfg_month}
                />

                <TextInputGroup
                  label="Manufacture Year"
                  name="mfg_year"
                  type="text"
                  placeholder="Enter Manufacture Year..."
                  value={mfg_year ? mfg_year : ""}
                  onChange={this.onChange}
                  error={errors.mfg_year}
                />
                <TextInputGroup
                  label="Expire Month"
                  name="exp_month"
                  type="text"
                  placeholder="Enter Expire Month..."
                  value={exp_month ? exp_month : ""}
                  onChange={this.onChange}
                  error={errors.exp_month}
                />
                <TextInputGroup
                  label="Expire Year"
                  name="exp_year"
                  type="text"
                  placeholder="Enter Expire Year..."
                  value={exp_year ? exp_year : ""}
                  onChange={this.onChange}
                  error={errors.exp_year}
                />
                <div className="form-group">
                  <select
                    name="category"
                    id="category"
                    className="custom-select"
                    required
                  >
                    <option value="">Select Category</option>
                    {category.map((item) => (
                      <option
                        className={classnames("form-control ", {
                          "is-invalid": errors.category,
                        })}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="invalid-feedback">{errors.category}</div>
                  )}
                </div>
                <div className="form-group">
                  <select
                    name="sub_category"
                    id="sub_category"
                    className="custom-select"
                  >
                    <option value="">Select Sub Category</option>
                    {sub_category.map((item) => (
                      <option
                        className={classnames("form-control ", {
                          "is-invalid": errors.sub_category,
                        })}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.sub && (
                    <div className="invalid-feedback">
                      {errors.sub_category}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <select name="brand" id="brand" className="custom-select">
                    <option value="">Select Brand</option>
                    {brand.map((item) => (
                      <option
                        className={classnames("form-control ", {
                          "is-invalid": errors.brand,
                        })}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <div className="invalid-feedback">{errors.brand}</div>
                  )}
                </div>

                <input
                  type="submit"
                  value="Create Product"
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

ProductCreate.propTypes = {
  create_product: PropTypes.func.isRequired,
  get_category: PropTypes.func.isRequired,
  get_brand: PropTypes.func.isRequired,
  get_sub: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  store: state.store,
});

export default connect(mapStateToProps, {
  create_product,
  get_category,
  get_sub,
  get_brand,
  setAlert,
})(ProductCreate);
