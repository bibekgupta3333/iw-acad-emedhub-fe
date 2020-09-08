import { Helmet } from "react-helmet";
import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../../hocs/TextInputGroups";
import { connect } from "react-redux";
import { get_order_product, update_order_product } from "../../actions/order";

class UpdateCart extends Component {
  state = {
    quantity: 0,
    product: "",
    ordered: "",
    errors: {},
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { quantity, product, ordered } = nextProps.order.ord;

    this.setState({
      quantity: Number(quantity),
      product: product,
      ordered: ordered,
    });
  }
  componentDidMount() {
    if (
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("is_buyer") === "true"
    ) {
      const { id } = this.props.match.params;
      this.props.get_order_product(id);
    } else {
      this.props.history.push("/");
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { quantity, product, ordered } = this.state;

    if (quantity === null) {
      this.setState({ errors: { quantity: "quantity is required" } });
      return;
    }

    const { id } = this.props.match.params;

    const users = {
      id: Number(id),
      quantity: Number(quantity),
    };
    this.props.update_order_product(users);
    setTimeout(() => {}, 2000);
    setTimeout(() => {}, 2000);
    this.props.history.push("/cart");
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { quantity, errors } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Update Quantity | E-MEDHUB</title>
          <meta name="description" content="update quantity" />
        </Helmet>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ paddingTop: "10vh", paddingBottom: "20vh" }}
        >
          <div
            className="card mb-3 shadow border border-dark mb-5"
            style={{ width: "40vw" }}
          >
            <div
              className="card-header text-uppercase text-center bg-dark font-weight-bold text-white"
              style={{ fontSize: "1rem" }}
            >
              {" "}
              Update Quantity of Product
            </div>
            <div className="card-body">
              <h1>{this.state.product.name}</h1>

              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  label="Quantity"
                  name="quantity"
                  type="number"
                  placeholder="Enter Quantity..."
                  value={Number(quantity)}
                  onChange={this.onChange}
                  error={errors.quantity}
                />

                <input
                  type="Submit"
                  value="Update Quantity"
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

UpdateCart.propTypes = {
  update_order_product: PropTypes.func.isRequired,
  get_order_product: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  order: state.order,
});
export default connect(mapStateToProps, {
  get_order_product,
  update_order_product,
})(UpdateCart);
