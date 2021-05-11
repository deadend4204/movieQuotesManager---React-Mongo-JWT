import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();

  const authContext = useContext(AuthContext);

  const { isAuthenticated, loading } = authContext;

  if (isAuthenticated === true && loading === false) {
    return (
      <Route {...rest}>
        <Component />
      </Route>
    );
  } else {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }
};

export default PrivateRoute;
