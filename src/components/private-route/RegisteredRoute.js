import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../../components/layout/Header";

const PrivateRoute = (props) => {
  const { component: Component, layout, auth, ...rest } = props;
  const actualRouteComponent = (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );

  switch (layout) {
    case "NAV": {
      return (
        <>
          <Header />
          {actualRouteComponent}
        </>
      );
    }
    case "DASHBOARD_NAV": {
      return (
        <>
          <Header />
          {actualRouteComponent}
        </>
      );
    }
    default: {
      return (
        <>
          <Header />
          {actualRouteComponent}
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
