import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";

import { Provider } from "react-redux";
import store from "./store/store";

import Navbar from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Register from "./containers/auth/Register";
import Login from "./containers/auth/Login";
import Dashboard from "./containers/dashboard/Dashboard";

import AdminRoute from "./components/private-route/AdminRoute";
import RegisteredRoute from "./components/private-route/RegisteredRoute";
import CustomerServiceRoute from "./components/private-route/CustomerServiceRoute";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <CustomerServiceRoute
                exact
                path="/dashboard"
                component={Dashboard}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
