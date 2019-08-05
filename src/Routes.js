import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import NotFound from "./components/NotFound/NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={LandingPage} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
