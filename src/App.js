import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./container/Home";
import Login from "./container/accounts/Login";
import ProductDetail from "./container/ProductDetail";
import Products from "./container/Products";
import Reset from "./container/accounts/Reset";
import ResetToken from "./container/accounts/ResetToken";
import CompanyProfile from "./container/accounts/CompanyProfile";
import UserProfile from "./container/accounts/UserProfile";
import SignUp from "./container/accounts/SignUp";
import SignUpSeller from "./container/accounts/SignUpSeller";
import Cart from "./container/Cart";
import Checkout from "./container/Checkout";
import NotFound from "./components/NotFound";
import Layout from "./hocs/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <div className="row">
            <div className="container">
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
                <Route exact path="/products" component={Products} />
                <Route exact path="/product/:id" component={ProductDetail} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signup_seller" component={SignUpSeller} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/checkout" component={Checkout} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
