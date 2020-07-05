import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../../components/layout/Header";
import AdminHeader from "../../components/layout/AdminHeader";

const PrivateRoute = (props) => {
  const { component: Component, layout, auth, ...rest } = props;
  const actualRouteComponent = (
    <Route
      {...rest}
      render={(props) =>
        auth.user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
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
          <AdminHeader />
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
