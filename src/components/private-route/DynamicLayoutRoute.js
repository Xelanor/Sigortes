import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer";

const PrivateRoute = (props) => {
  const { component: Component, layout, auth, ...rest } = props;
  const actualRouteComponent = (
    <Route {...rest} render={(props) => <Component {...props} />} />
  );

  switch (layout) {
    case "NAV": {
      return (
        <>
          <Header />
          {actualRouteComponent}
          <Footer />
        </>
      );
    }
    case "DASHBOARD_NAV": {
      return (
        <>
          <Header />
          {actualRouteComponent}
          <Footer />
        </>
      );
    }
    default: {
      return (
        <>
          <Header />
          {actualRouteComponent}
          <Footer />
        </>
      );
    }
  }
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
