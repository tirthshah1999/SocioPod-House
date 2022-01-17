import React from "react";
import { Route, Redirect } from "react-router-dom";

const SemiProtectedRoute = ({ children, ...rest }) => {
  const isAuth = false;
  const user = {
      activated: false
  }
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          children
        ) : (
            <Redirect
            to={{
                pathname: '/rooms',
                state: {from: location}
            }} />
        )
      }}
    />
  );
};

export default SemiProtectedRoute;
