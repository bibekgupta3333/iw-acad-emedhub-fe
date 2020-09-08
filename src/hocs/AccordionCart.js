import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class AccordionCart extends Component {
  state = {
    showCartInfo: false,
  };
  onShowClick = () => {
    this.setState({ showCartInfo: !this.state.showCartInfo });
  };
  render() {
    const product = this.props.product;
    const { showCartInfo } = this.state;
    return (
      <td scope="row">
        <button onClick={this.onShowClick} className="btn btn-block btn-light">
          Click to view cart <i class="fas fa-sort-down fa-lg"></i>
        </button>
        {showCartInfo ? (
          <table className="table table-sm table-light table-responsive-sm table-hover table-bordered">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Price</th>
                <th>Name</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {product.products.map((item) => (
                <React.Fragment>
                  {" "}
                  <tr>
                    <td>{item.quantity}</td>
                    <td>{item.product.price}</td>
                    <td>
                      <Link to={`/products/${item.product.slug}`}>
                        {" "}
                        {item.product.name
                          ? item.product.name.slice(0, 20)
                          : ""}
                      </Link>
                    </td>
                    <td>
                      Rs {Number(item.product.price) * Number(item.quantity)}
                    </td>
                  </tr>{" "}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : null}
      </td>
    );
  }
}
AccordionCart.propTypes = {
  product: PropTypes.array.isRequired,
};
export default AccordionCart;
