import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ErrorPage from "views/ErrorPage/ErrorPage.jsx";

export default () =>
  <Switch>
    <Route path="/" exact component={LandingPage} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={ErrorPage} />
  </Switch>;
