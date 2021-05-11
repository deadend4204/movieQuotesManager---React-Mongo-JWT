import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
// import PublicRoute from "./components/routing/PublicRoute";

import QuoteState from "./context/quote/QuoteState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import "./App.css";

const App = () => {
  return (
    <AuthState>
      <QuoteState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <Alerts />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <PrivateRoute exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </QuoteState>
    </AuthState>
  );
};

export default App;
