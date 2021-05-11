// import React, { useContext } from "react";
// import { Redirect, Route, useLocation } from "react-router-dom";

// import AuthContext from "../../context/auth/authContext";

// const PublicRoute = ({ component: Component, restricted, ...rest }) => {
//   const location = useLocation();

//   const authContext = useContext(AuthContext);

//   const { isAuthenticated, loading } = authContext;

//   if (isAuthenticated && loading && restricted === true) {
//     return (
//       <Route {...rest}>
//         <Redirect to={{ pathname: "/", state: { from: location } }} />
//       </Route>
//     );
//   } else {
//     return (
//       <Route {...rest}>
//         <Component />
//       </Route>
//     );
//   }
// };

// export default PublicRoute;
