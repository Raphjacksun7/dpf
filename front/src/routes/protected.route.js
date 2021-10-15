import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as AuthService from "../services/base-http.service";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = AuthService.isAuthenticated();
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
