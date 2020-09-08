import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../../hocs/TextInputGroups";
import {
  get_order_products,
  delete_order_product,
  create_checkout_product,
} from "../../actions/order";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Cart extends Component {
  state = {
    count: 0,
    results: [],
    next: null,
    previous: null,

    products: [],
    phone: "",
    shipping_address: "",
    errors: {},
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    console.log("biebk", nextProps.order.order);
    const { results, count, next, previous } = nextProps.order.order;
    this.setState({
      count: count,
      next: next,
      previous: previous,
      results: results,
    });
  }
  componentDidMount(slug) {
    let pages = localStorage.getItem("pages");
    if (pages) {
      this.props.get_order_products(pages);
    } else {
      localStorage.setItem("pages", 1);
      this.props.get_order_products(1);
    }
  }

  updatePage = (num) => {
    localStorage.setItem("pages", num);
    this.componentDidMount();
  };

  delete_product = (id) => {
    console.log(id);
    this.props.delete_order_product(id);
    const results = this.state.results.filter((item) => id !== item.id);
    this.setState({ results: results });
    this.props.history.push("/cart");
    localStorage.setItem("pages", 1);
    setTimeout(() => {
      setTimeout(() => {}, 2000);
    }, 2000);
  };
  onSubmit = (e) => {
    e.preventDefault();
    let { shipping_address, phone } = this.state;

    if (
      phone === "" ||
      phone.length !== 10 ||
      typeof Number(phone) !== "number"
    ) {
      this.setState({ errors: { phone: "Phone is required exactly ten" } });
      return;
    }

    if (shipping_address === "") {
      this.setState({
        errors: { shipping_address: "Shipping Address is required" },
      });
      return;
    }
    console.log(this.state);
    let product = [];
    for (let i = 0; i < this.state.results.length; i++) {
      product.push(Number(this.state.results[i].id));
    }
    const newUser = {
      user: localStorage.getItem("id"),
      products: product,
      phone,
      shipping_address,
    };

    console.log(newUser);
    this.props.create_checkout_product(newUser);
    // Clear State
    this.setState({
      products: [],
      phone: "",
      shipping_address: "",
      errors: "",
    });
    setTimeout(() => {
      this.props.history.push("/checkout");
      document.location.reload();
    }, 2000);
    // Redirect using history object
    this.props.history.push("/checkout");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("is_buyer") === "true"
    ) {
    } else {
      this.props.history.push("/");
    }
    let { phone, shipping_address, errors } = this.state;
    console.log("cart", this.state);
    const results = this.state.results;
    console.log(results);
    let pageArr = [];
    for (let i = 1; i <= Math.ceil(this.state.count / 8); i++) {
      pageArr.push(i);
    }
    let total_price = 0;
    if (results) {
      for (let i = 0; i < results.length; i++) {
        total_price =
          total_price +
          Number(results[i].quantity) * Number(results[i].product.price);
      }
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Cart | E-MEDHUB</title>
          <meta name="description" content="cart" />
        </Helmet>
        <div className="container">
          <div className="mt-3 ">
            <ol className="breadcrumb bg-primary text-light">
              <li className="breadcrumb-item active  " aria-current="page">
                <Link className="text-light " to="/">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active  " aria-current="page">
                <Link className="text-light ">Cart</Link>
              </li>
              <li className="breadcrumb-item active  " aria-current="page">
                <Link className="text-light " to="/cart">
                  Checkout
                </Link>
              </li>
            </ol>
          </div>
          <div className="row mb-5">
            <div className="col-md-8">
              <table className="table table-sm table-hover table-bordered table-striped table-responsive-md mt-2 shadow">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">total</th>
                    <th scope="col">Update</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {results
                    ? results.map((product) => (
                        <tr>
                          <td>{product.created.slice(0, 10)}</td>
                          <td>{product.product.name.slice(0, 20)}</td>
                          <td>{product.quantity}</td>
                          <td>{Number(product.product.price)}</td>
                          <td>
                            {Number(product.quantity) *
                              Number(product.product.price)}
                          </td>
                          <td>
                            <Link
                              target="_blank"
                              to={`/cart/${product.id}`}
                              className="btn btn-info"
                            >
                              Update
                            </Link>
                          </td>
                          <td>
                            <a
                              onClick={this.delete_product.bind(
                                this,
                                `${product.id}`
                              )}
                              className="btn btn-danger"
                            >
                              Remove
                            </a>
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
            <div className="col-md-4 mt-2 ">
              <div className="card border border-dark shadow">
                <div className="card-body">
                  <h3 className="text-secondary">Ordered by you</h3>
                  <p className="text-secondary">
                    Total Products: {this.state.count}
                    <form onSubmit={this.onSubmit}>
                      <TextInputGroup
                        label="Phone"
                        name="phone"
                        placeholder="Enter Phone..."
                        value={phone}
                        onChange={this.onChange}
                        error={errors.phone}
                      />
                      <TextInputGroup
                        label="Shipping Address"
                        name="shipping_address"
                        placeholder="Enter Shipping Address..."
                        value={shipping_address}
                        onChange={this.onChange}
                        error={errors.shipping_address}
                      />
                      <h6 className="text-center text-dark py-2">
                        Delvery Method is Cash On Delevery Mode.
                      </h6>
                      <h6 className="text-center text-dark py-2">
                        Total Cost of your product is Rs {total_price}
                      </h6>
                      <input
                        type="submit"
                        value="Checkout"
                        className="btn btn-primary btn-block"
                      />
                    </form>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-start mt-3 ">
            <ul className="pagination">
              <li
                className={`page-item ${
                  Number(localStorage.getItem("pages")) === 1
                    ? "disabled"
                    : "active"
                }`}
              >
                <Link
                  onClick={this.updatePage.bind(
                    this,
                    Number(localStorage.getItem("pages")) - 1 < 1
                      ? 1
                      : Number(localStorage.getItem("pages")) - 1
                  )}
                  className="page-link"
                >
                  Previous
                </Link>
              </li>
              {pageArr.map((num) => (
                <li
                  className={`page-item ${
                    num !== Number(localStorage.getItem("pages"))
                      ? num
                      : "active"
                  }`}
                >
                  <Link
                    onClick={this.updatePage.bind(this, num)}
                    className="page-link"
                  >
                    {`${num}`}
                  </Link>
                </li>
              ))}

              <li
                className={`page-item ${
                  Number(localStorage.getItem("pages")) ===
                  Math.ceil(Number(this.state.count) / 8)
                    ? "disabled"
                    : "active"
                }`}
              >
                <Link
                  onClick={this.updatePage.bind(
                    this,
                    Number(localStorage.getItem("pages")) + 1 <=
                      Math.ceil(Number(this.state.count) / 8)
                      ? Number(localStorage.getItem("pages")) + 1
                      : Math.ceil(Number(this.state.count) / 8)
                  )}
                  className="page-link"
                >
                  Next
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Cart.propTypes = {
  get_order_products: PropTypes.func.isRequired,
  delete_order_product: PropTypes.func.isRequired,
  create_checkout_product: PropTypes.func.isRequired,

  order: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, {
  get_order_products,
  delete_order_product,
  create_checkout_product,
})(Cart);
