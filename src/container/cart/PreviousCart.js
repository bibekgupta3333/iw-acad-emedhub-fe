import { Helmet } from "react-helmet";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { get_checkouts } from "../../actions/order";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AccordionCart from "../../hocs/AccordionCart";

class PreviousCart extends Component {
  state = {
    count: 0,
    results: [],
    next: null,
    previous: null,
    showCartInfo: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { results, count, next, previous } = nextProps.order.checkouts;
    this.setState({
      count: count,
      next: next,
      previous: previous,
      results: results,
    });
  }
  componentDidMount(slug) {
    let pagescheck = localStorage.getItem("pagescheck");
    if (pagescheck) {
      this.props.get_checkouts(pagescheck);
    } else {
      localStorage.setItem("pagescheck", 1);
      this.props.get_checkouts(1);
    }
  }

  updatePage = (num) => {
    localStorage.setItem("pagescheck", num);
    this.componentDidMount();
  };
  onShowClick = () => {
    this.setState({ showCartInfo: !this.state.showCartInfo });
  };

  render() {
    if (
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("is_buyer") === "true"
    ) {
    } else {
      this.props.history.push("/");
    }
    // const { showCartInfo } = this.state;
    let { results } = this.state;
    let pageArr = [];
    for (let i = 1; i <= Math.ceil(this.state.count / 8); i++) {
      pageArr.push(i);
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Checkouts | E-MEDHUB</title>
          <meta name="description" content="checkouts" />
        </Helmet>
        <div className="container">
          <nav className="mt-3 ">
            <ol className="breadcrumb bg-primary text-dark">
              <li
                className="breadcrumb-item active  text-dark"
                aria-current="page"
              >
                <Link className="text-light" to="/">
                  Home
                </Link>
              </li>

              <li
                className="breadcrumb-item active  text-dark"
                aria-current="page"
              >
                <Link className="text-light" to="/checkout">
                  Checkouts
                </Link>
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-3">
              <div className="card mt-2 shadow border border-dark">
                <a
                  href="https://thumbs.dreamstime.com/b/shopping-trolley-pills-12064379.jpg"
                  data-fancybox="gallery"
                >
                  <img
                    src="https://thumbs.dreamstime.com/b/shopping-trolley-pills-12064379.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </a>
                <div className="card-body">
                  <h4 className="card-title">Checkout You Have Made</h4>
                  <p>Total Checkouts {this.state.count}</p>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <table className="table table-sm table-hover table-bordered text-center table-striped table-responsive-md mt-2 shadow">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Item</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results
                    ? results.map((product) => (
                        <tr>
                          <td>{product.created.slice(0, 10)}</td>
                          <td>{product.phone}</td>
                          <td>{product.shipping_address}</td>
                          <AccordionCart product={product} />

                          <td>Rs {Number(product.amount)}</td>
                          <td>
                            {" "}
                            {product.being_delivered === true
                              ? "Delivered"
                              : "Not Devivered"}
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>

          <div className="d-flex justify-content-center ">
            <ul className="pagination">
              <li
                className={`page-item ${
                  Number(localStorage.getItem("pagescheck")) === 1
                    ? "disabled"
                    : "active"
                }`}
              >
                <Link
                  onClick={this.updatePage.bind(
                    this,
                    Number(localStorage.getItem("pagescheck")) - 1 < 1
                      ? 1
                      : Number(localStorage.getItem("pagescheck")) - 1
                  )}
                  className="page-link"
                >
                  Previous
                </Link>
              </li>
              {pageArr.map((num) => (
                <li
                  className={`page-item ${
                    num !== Number(localStorage.getItem("pagescheck"))
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
                  Number(localStorage.getItem("pagescheck")) ===
                  Math.ceil(Number(this.state.count) / 8)
                    ? "disabled"
                    : "active"
                }`}
              >
                <Link
                  onClick={this.updatePage.bind(
                    this,
                    Number(localStorage.getItem("pagescheck")) + 1 <=
                      Math.ceil(Number(this.state.count) / 8)
                      ? Number(localStorage.getItem("pagescheck")) + 1
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

PreviousCart.propTypes = {
  get_checkouts: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, {
  get_checkouts,
})(PreviousCart);
