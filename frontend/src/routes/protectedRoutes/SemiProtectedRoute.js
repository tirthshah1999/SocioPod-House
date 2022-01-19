import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

const SemiProtectedRoute = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
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
