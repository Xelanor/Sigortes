import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";

import { Provider } from "react-redux";
import store from "./store/store";

import Homepage from "./components/layout/Homepage";
import Register from "./containers/auth/Register";
import Login from "./containers/auth/Login";
import ForgotPassword from "./containers/auth/ForgotPassword";
import ResetPassword from "./containers/auth/ResetPassword";
import CustomerServicePage from "./containers/customer-service/CustomerServicePage";
import AdminPage from "./containers/admin/AdminPage";
import MeetingsPage from "./containers/admin/MeetingsPage";
import Payment from "./containers/dashboard/payment/PaymentTest";
import ProfilePage from "./containers/dashboard/ProfilePage";
import VideoMeeting from "./containers/video/MeetingPage";
import VideoMeetingTest from "./containers/video/VideoMeetingTest";

import AdminRoute from "./components/private-route/AdminRoute";
import RegisteredRoute from "./components/private-route/RegisteredRoute";
import CustomerServiceRoute from "./components/private-route/CustomerServiceRoute";
import DynamicLayoutRoute from "./components/private-route/DynamicLayoutRoute";

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
            <Switch>
              <DynamicLayoutRoute
                exact
                path="/"
                component={Homepage}
                layout="NAV"
              />
              <DynamicLayoutRoute exact path="/login" component={Login} />
              <DynamicLayoutRoute exact path="/register" component={Register} />
              <RegisteredRoute exact path="/profil" component={ProfilePage} />
              <DynamicLayoutRoute
                exact
                path="/sifremi-unuttum"
                component={ForgotPassword}
              />
              <DynamicLayoutRoute
                exact
                path="/sifre-reset/:token"
                component={ResetPassword}
              />
              <AdminRoute
                exact
                path="/admin"
                component={AdminPage}
                layout="DASHBOARD_NAV"
              />
              <AdminRoute
                exact
                path="/admin/meetings"
                component={MeetingsPage}
                layout="DASHBOARD_NAV"
              />
              <AdminRoute
                exact
                path="/admin/settings"
                component={() => (
                  <div className="text-3xl justify-center flex">Ayarlar</div>
                )}
                layout="DASHBOARD_NAV"
              />
              <AdminRoute
                exact
                path="/admin/payment"
                component={Payment}
                layout="DASHBOARD_NAV"
              />
              <DynamicLayoutRoute
                exact
                path="/video-gorusme"
                component={VideoMeeting}
              />
              <DynamicLayoutRoute
                exact
                path="/video-gorusme-test"
                component={VideoMeetingTest}
              />
              <CustomerServiceRoute
                exact
                path="/customer-service"
                component={CustomerServicePage}
              />
              <DynamicLayoutRoute
                component={() => (
                  <div className="text-3xl justify-center flex">404 Page</div>
                )}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
