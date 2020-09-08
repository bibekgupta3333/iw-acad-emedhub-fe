import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { create_order_product } from "../actions/order";
import { connect } from "react-redux";
class Card extends Component {
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
      price,
      image,
      mfg_company,
    } = this.props;

    return (
      <div
        className="card d-inline-block bg-white text-center m-2  pt-3 shadow"
        style={{ width: "180px", height: "300px" }}
      >
        <Link to={`/products/${slug}`}>
          <img
            style={{ height: "100px", width: "100px" }}
            src={image}
            alt=""
            className="card-img-top"
          />
        </Link>
        <div className="card-body d-flex flex-column justitfy-content-center align-content-end ">
          <Link to={`/products/${slug}`}>
            <h6
              style={{ fontSize: "12px", height: "1.5rem" }}
              className="text-primary "
            >
              {name}
            </h6>
          </Link>
          <h6
            style={{ fontSize: "12px", height: "1.5rem" }}
            className="text-muted"
          >
            {generic_name ? generic_name : ""}
          </h6>
          <h6
            style={{ fontSize: "12px", height: "1.5rem" }}
            className="text-muted"
          >
            {mfg_company ? mfg_company : ""}
          </h6>
          <div className="d-flex justify-content-between pt-3">
            <p className="price font-weight-bold" style={{ fontSize: "12px" }}>
              Rs {price}
            </p>
            {localStorage.getItem("is_buyer") === true ? (
              <React.Fragment></React.Fragment>
            ) : (
              <Link
                onClick={this.add_to_cart.bind(this, id)}
                className="btn btn-sm btn-secondary"
              >
                Add
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  generic_name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  mfg_company: PropTypes.string.isRequired,
  create_order_product: PropTypes.func.isRequired,
};

export default connect(null, { create_order_product })(Card);
