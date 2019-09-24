import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ErrorPage from "views/ErrorPage/ErrorPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import ResetPasswordPage from "views/ResetPasswordPage/ResetPasswordPage.jsx";
import LogoutPage from "views/LogoutPage/LogoutPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";
import PrivacyPage from "views/PrivacyPage/PrivacyPage.jsx";
import TermsPage from "views/TermsPage/TermsPage.jsx";
import ContactPage from "views/ContactUsPage/ContactUsPage.jsx";
import ListIdeasPage from "views/ListIdeasPage/ListIdeasPage.jsx";
import ArticlePageTravelGear from "views/ArticlePageTravelGear/ArticlePageTravelGear.jsx";
import ArticlePageHospitalBag from "views/ArticlePageHospitalBag/ArticlePageHospitalBag.jsx";
import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.jsx";

import AppliedRoute from "./components/Routes/AppliedRoute";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";

export default ({childProps}) =>
  <Switch>
    <AppliedRoute path="/" exact component={LandingPage} props={childProps} />
    <AppliedRoute path="/terms" exact component={TermsPage} props={childProps} />
    <AppliedRoute path="/privacy" exact component={PrivacyPage} props={childProps} />
    <AppliedRoute path="/contact" exact component={ContactPage} props={childProps} />
    <AppliedRoute path="/lists" exact component={ListIdeasPage} props={childProps} />
    <AppliedRoute path="/lists/travelgear" exact component={ArticlePageTravelGear} props={childProps} />
    <AppliedRoute path="/lists/hospitalbag" exact component={ArticlePageHospitalBag} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={LoginPage} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={SignupPage} props={childProps} />
    <UnauthenticatedRoute path="/login/reset" exact component={ResetPasswordPage} props={childProps} />
    <AuthenticatedRoute path="/logout" exact component={LogoutPage} props={childProps} />
    <AuthenticatedRoute path="/create" exact component={ShoppingCartPage} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={ErrorPage} />
  </Switch>;
