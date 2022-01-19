import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

// If user is logged in and also it is activated then only redirect to rooms
const ProtectedRoute = ({ children, ...rest }) => {
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
            <Redirect
            to={{
                pathname: '/activate',
                state: {from: location}
            }} />
        ) : (
            children
        )
      }}
    />
  );
};

export default ProtectedRoute;
