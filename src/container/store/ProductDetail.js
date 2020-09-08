import { Helmet } from "react-helmet";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get_product } from "../../actions/store";
import { create_order_product } from "../../actions/order";

import { Link } from "react-router-dom";
class ProductDetail extends Component {
  state = {
    id: null,
    name: "",
    slug: "",
    generic_name: "",
    description: "",
    image: "",
    price: "",
    mfg_company: "",
    mfg_month: "",
    mfg_year: "",
    exp_month: "",
    exp_year: "",
    errors: {},
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const {
      id,
      name,
      slug,
      generic_name,
      description,
      image,
      price,
      mfg_company,
      mfg_month,
      mfg_year,
      exp_month,
      exp_year,
    } = nextProps.store.product;
    this.setState({
      id,
      name,
      slug,
      generic_name,
      description,
      image,
      price,
      mfg_company,
      mfg_month,
      mfg_year,
      exp_month,
      exp_year,
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.get_product(id);
  }
  add_to_cart = (id) => {
    const user = Number(localStorage.getItem("id"));
    const product = {
      quantity: 1,
      user: user,
      product: Number(id),
    };
    this.props.create_order_product(product);
  };

  render() {
    const {
      id,
      name,
      slug,
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
    document.body.style.backgroundColor = "#fff";
    return (
      <React.Fragment>
        <Helmet>
          <title>{name ? name : ""} | E-MEDHUB</title>
          <meta name="description" content="product detail" />
        </Helmet>
        <div className="container">
          <nav>
            <ol className="breadcrumb bg-primary text-dark mt-3">
              <li
                className="breadcrumb-item active  text-dark"
                aria-current="page"
              >
                <Link className="text-light" to="/">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link className="text-light">Product</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link className="text-light" to={`/products/${slug}`}>
                  {name ? name.slice(0, 25) : ""}
                </Link>
              </li>
              <li
                className="breadcrumb-item active  text-light"
                aria-current="page"
              >
                <Link className="text-light" to="/"></Link>
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-8 ">
              <div
                className="card-body border-info "
                style={{ border: "dotted 6px" }}
              >
                <div
                  className="d-flex  justify-content-around flex-wrap shadow rounded"
                  style={{ backgroundColor: "#fff" }}
                >
                  <a href={image} data-fancybox="gallery" className="p-2">
                    <img
                      src={image}
                      alt={name}
                      style={{ width: "250px", height: "250px" }}
                    />{" "}
                  </a>

                  <div className="text-left text-info p-5">
                    <h6 className="font-weight-bold text-uppercase">
                      {name ? name.slice(0, 25) : ""}
                    </h6>
                    <h6>
                      {generic_name
                        ? `Generic ${generic_name.slice(0, 25)}`
                        : ""}
                    </h6>
                    <h6>{mfg_company}</h6>
                    <h6>
                      {mfg_year && mfg_month
                        ? `MFG-Date: ${mfg_month}/${mfg_year}`
                        : ""}
                    </h6>
                    <h6>
                      {exp_year && exp_month
                        ? `EXP-Date: ${exp_month}/${exp_year}`
                        : ""}
                    </h6>
                  </div>
                </div>

                <div
                  className="card-body my-3 shadow rounded"
                  style={{ backgroundColor: "#fff" }}
                >
                  <h2 className=" text-uppercase" style={{ fontSize: "20px" }}>
                    <span className="text-dark">Information About </span>
                    <span className="text-info">
                      {" "}
                      {name ? name.slice(0, 25) : ""}
                      <br />
                      {name ? name.slice(25) : ""}
                    </span>
                  </h2>
                  <div
                    className="bg-secondary btn-block"
                    style={{ height: "2px" }}
                  ></div>
                  <p className=" text-dark mt-3" style={{ fontSize: "16px" }}>
                    {generic_name ? `Generic ${generic_name.slice(0, 25)}` : ""}
                    {description ? description : "No Description"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div
                className="card-body  border-info shadow p-2"
                style={{ border: "dotted 6px" }}
              >
                <div
                  className="d-flex justify-content-between align-items-center p-3 rounded shadow"
                  style={{ backgroundColor: "#fff", height: "7rem" }}
                >
                  <p className="text-info font-weight-bold">Rs. {price}</p>
                  {localStorage.getItem("is_seller") === true ? (
                    ""
                  ) : (
                    <Link
                      onClick={this.add_to_cart.bind(this, id)}
                      className="btn btn-secondary"
                    >
                      Add
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ProductDetail.propTypes = {
  create_order_product: PropTypes.func.isRequired,
  get_product: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  store: state.store,
});
export default connect(mapStateToProps, { get_product, create_order_product })(
  ProductDetail
);
