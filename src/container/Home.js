import React, { Component } from "react";
import Card from "../components/Card";
import PropTypes from "prop-types";
import { get_products } from "../actions/store";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends Component {
  state = { results: [] };
  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { results, count, next, previous } = nextProps.product;
    this.setState({
      count: count,
      results: results,
      next: next,
      previous: previous,
      search: "",
    });
  }
  componentDidMount(q) {
    let page = localStorage.getItem("page");
    if (page && q) {
      this.props.get_products([page, q]);
    } else if (page) {
      this.props.get_products([page, ""]);
    } else {
      this.props.get_products([1, ""]);
    }
  }

  updatePage = (num) => {
    localStorage.setItem("page", num);
    this.componentDidMount();
  };
  onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("page", 1);

    this.componentDidMount(this.state.search);
  };
  onCategory = (q) => {
    localStorage.setItem("page", 1);
    this.componentDidMount(q);
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    document.body.style.background = "#fff no-repeat center center/cover";
    const results = this.state.results;

    let pageArr = [];
    for (let i = 1; i <= Math.ceil(this.state.count / 8); i++) {
      pageArr.push(i);
    }
    const search = this.state.search;
    return (
      <React.Fragment>
        <Helmet>
          <title>Home | E-MEDHUB</title>
          <meta name="description" content="home" />
        </Helmet>
        <div
          className=" d-block jumbotron jumbotron-fluid text-danger border-bottom border-dark h-25"
          style={{
            background:
              "url('https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') no-repeat center center/cover",
            backgroundAttachment: "fixed",
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div className="container d-flex flex-column justify-content-center align-items-center">
            <p
              style={{ textShadow: "5px 5px 5px #444" }}
              className="h1 text-light text-justify font-weight-bold"
            >
              Search Your Medicine In <span class="text-light"> E-MEDHUB</span>
            </p>
            <p
              style={{ textShadow: "5px 5px 5px #222" }}
              className="lead text-light font-weight-bold text-justify"
            >
              Fast Delevery Service With Minimal Cost And Multi Brand Products
              ...
            </p>

            <div className="text-center">
              <form
                onSubmit={this.onSubmit.bind(this)}
                className="form-inline  my-lg-0 d-flex flex-column"
              >
                <div className="form-group">
                  <input
                    value={search}
                    className="form-control mr-sm-2 mb-3 py-4 px-5"
                    name="search"
                    type="search"
                    id="search"
                    placeholder="Search"
                    onChange={this.onChange}
                  />
                </div>
                <input
                  className="btn  btn-primary px-4"
                  type="submit"
                  value="Search"
                />
              </form>
            </div>
          </div>
        </div>

        <div className="container">
          <nav>
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
                className="breadcrumb-item active  text-light"
                aria-current="page"
              >
                <Link className="text-light" to="/"></Link>
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-3">
              <div className="card mt-2 shadow">
                <div className="card-header bg-primary text-light font-weight-bold">
                  Featured
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link onClick={this.onCategory.bind(this, "Medicine")}>
                      Medicine
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link onClick={this.onCategory.bind(this, "Baby Products")}>
                      Baby Products
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      onClick={this.onCategory.bind(this, "Beauty Products")}
                    >
                      Beauty Products
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link onClick={this.onCategory.bind(this, "Suppliments ")}>
                      Suppliments{" "}
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      onClick={this.onCategory.bind(this, "Medical Equipments")}
                    >
                      Medical Equipments
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-9 d-flex flex-wrap">
              {results.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  generic_name={product.generic_name}
                  price={product.price}
                  image={product.image}
                  mfg_company={product.mfg_company}
                />
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-center ">
            <ul className="pagination">
              <li
                className={`page-item ${
                  Number(localStorage.getItem("page")) === 1
                    ? "disabled"
                    : "active"
                }`}
              >
                <Link
                  onClick={this.updatePage.bind(
                    this,
                    Number(localStorage.getItem("page")) - 1 < 1
                      ? 1
                      : Number(localStorage.getItem("page")) - 1
                  )}
                  className="page-link"
                >
                  Previous
                </Link>
              </li>
              {pageArr.map((num) => (
                <li
                  className={`page-item ${
                    num !== Number(localStorage.getItem("page"))
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
                  Number(localStorage.getItem("page")) ===
                  Math.ceil(Number(this.state.count) / 8)
                    ? "disabled"
                    : "active"
                }`}
              >
                <Link
                  onClick={this.updatePage.bind(
                    this,
                    Number(localStorage.getItem("page")) + 1 <=
                      Math.ceil(Number(this.state.count) / 8)
                      ? Number(localStorage.getItem("page")) + 1
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

Home.propTypes = {
  get_products: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.store,
});

export default connect(mapStateToProps, { get_products })(Home);
