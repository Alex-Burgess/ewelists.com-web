import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ErrorPage from "views/ErrorPage/ErrorPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";
import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.jsx";

export default () =>
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/signup" exact component={SignupPage} />
    <Route path="/create" exact component={ShoppingCartPage} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={ErrorPage} />
  </Switch>;
