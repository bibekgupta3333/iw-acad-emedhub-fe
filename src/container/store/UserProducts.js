import { Helmet } from "react-helmet";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { get_user_product, delete_user_product } from "../../actions/store";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UserProducts extends Component {
  state = { count: 0, results: [], next: null, previous: null };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { results, count, next, previous } = nextProps.store.user_product;
    this.setState({
      count: count,
      next: next,
      previous: previous,
      results: results,
    });
  }
  componentDidMount(slug) {
    let pageUser = localStorage.getItem("pageUser");
    if (pageUser) {
      this.props.get_user_product(pageUser);
    } else {
      localStorage.setItem("pageUser", 1);
      this.props.get_user_product(1);
    }
  }

  updatePage = (num) => {
    localStorage.setItem("pageUser", num);
    this.componentDidMount();
  };
  delete_product = (slug) => {
    this.props.delete_user_product(slug);

    setTimeout(() => {
      document.location.reload();
      setAlert("product Delected Successfully", "success");
    }, 3000);
    this.props.history.push("/product/user");

    setAlert("product Delected Successfully", "success");
  };

  render() {
    if (
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("is_seller") === "true"
    ) {
    } else {
      this.props.history.push("/");
    }
    const { results } = this.state;

    let pageArr = [];
    for (let i = 1; i <= this.state.count / 8 + 1; i++) {
      pageArr.push(i);
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Products User | E-MEDHUB</title>
          <meta name="description" content="product user" />
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
                <Link className="text-light" to="/product/user">
                  Products
                </Link>
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-4 mt-5">
              <div className="card border border-dark shadow">
                <div className="card-body">
                  <h3 className="text-secondary">Product Created by You</h3>
                  <p>Total Products: {this.state.count}</p>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <table className="table table-sm table-hover table-bordered   table-striped table-responsive-md mt-5 shadow ">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Mfg_company</th>
                    <th scope="col">Price</th>
                    <th scope="col">Views</th>
                    <th scope="col">Preview</th>
                    <th scope="col">Update</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {results
                    ? results.map((product) => (
                        <tr>
                          <td>
                            {product.name ? product.name.slice(0, 25) : ""}
                          </td>
                          <td>{product.mfg_company}</td>
                          <td>{product.price}</td>
                          <td>{product.views}</td>
                          <td>
                            <Link
                              target="_blank"
                              to={`/products/${product.slug}`}
                              className="btn btn-info"
                            >
                              Preview
                            </Link>
                          </td>
                          <td>
                            <Link
                              target="_blank"
                              to={`/product/update/${product.slug}`}
                              className="btn btn-info"
                            >
                              Update
                            </Link>
                          </td>
                          <td>
                            <a
                              onClick={this.delete_product.bind(
                                this,
                                `${product.slug}`
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
          </div>
          <div className="d-flex justify-content-center ">
            <ul className="pagination">
              <li
                className={`page-item ${
                  Number(localStorage.getItem("pageUser")) === 1
                    ? "disabled"
                    : "active"
                }`}
              >
                <Link
                  onClick={this.updatePage.bind(
                    this,
                    Number(localStorage.getItem("pageUser")) - 1 < 1
                      ? 1
                      : Number(localStorage.getItem("pageUser")) - 1
                  )}
                  className="page-link"
                >
                  Previous
                </Link>
              </li>
              {pageArr.map((num) => (
                <li
                  className={`page-item ${
                    num !== Number(localStorage.getItem("pageUser"))
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
                  Number(localStorage.getItem("pageUser")) === this.state.count
                    ? "disabled"
                    : "active"
                }`}
              >
                <Link
                  onClick={this.updatePage.bind(
                    this,
                    Number(localStorage.getItem("pageUser")) + 1 >
                      Number(this.state.count)
                      ? Number(this.state.count)
                      : Number(localStorage.getItem("pageUser")) + 1
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

UserProducts.propTypes = {
  get_user_product: PropTypes.func.isRequired,
  delete_user_product: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  store: state.store,
});

export default connect(mapStateToProps, {
  get_user_product,
  delete_user_product,
})(UserProducts);
