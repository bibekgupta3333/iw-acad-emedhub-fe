import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./container/Home";
import Login from "./container/accounts/Login";
import ProductDetail from "./container/store/ProductDetail";
import Reset from "./container/accounts/Reset";
import ResetToken from "./container/accounts/ResetToken";
import CompanyProfile from "./container/accounts/CompanyProfile";
import UserProfile from "./container/accounts/UserProfile";
import SignUp from "./container/accounts/SignUp";
import SignUpSeller from "./container/accounts/SignUpSeller";
import Cart from "./container/cart/Cart";
import UpdateCart from "./container/cart/UpdateCart";
import PreviousCart from "./container/cart/PreviousCart";
import ProductCreate from "./container/store/ProductCreate";
import ProductUpdate from "./container/store/ProductUpdate";
import UserProducts from "./container/store/UserProducts";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Layout from "./hocs/Layout";
import Alert from "./components/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/reset" component={Reset} />
            <Route exact path="/resettoken/:token" component={ResetToken} />
            <Route
              exact
              path="/company_profile/:id"
              component={CompanyProfile}
            />
            <Route exact path="/user_profile/:id" component={UserProfile} />
            <Route exact path="/products/:id" component={ProductDetail} />
            <Route exact path="/product/create" component={ProductCreate} />
            <Route exact path="/product/update/:id" component={ProductUpdate} />
            <Route exact path="/product/user" component={UserProducts} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signup_seller" component={SignUpSeller} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/cart/:id" component={UpdateCart} />
            <Route exact path="/checkout" component={PreviousCart} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
