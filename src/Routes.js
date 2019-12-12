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
import GiftIdeasMain from "views/ArticlePages/GiftIdeasMain.jsx";
import ArticleTravelGear from "views/ArticlePages/TravelGear.jsx";
import ArticleHospitalBag from "views/ArticlePages/HospitalBag.jsx";
import ArticleNursery from "views/ArticlePages/Nursery.jsx";
import ArticleBathTime from "views/ArticlePages/BathTime.jsx";
import ArticleChristmasIdeasForToddlers from "views/ArticlePages/ChristmasIdeasForToddlers.jsx";
import ViewListPage from "views/ViewListPage/ViewListPage.jsx";
import EditListPage from "views/EditListPage/EditListPage.jsx";

import AppliedRoute from "./components/Routes/AppliedRoute";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";

export default ({childProps}) =>
  <Switch>
    <AppliedRoute path="/" exact component={LandingPage} props={childProps} />
    <AppliedRoute path="/terms" exact component={TermsPage} props={childProps} />
    <AppliedRoute path="/privacy" exact component={PrivacyPage} props={childProps} />
    <AppliedRoute path="/contact" exact component={ContactPage} props={childProps} />
    <AppliedRoute path="/listideas" exact component={GiftIdeasMain} props={childProps} />
    <AppliedRoute path="/listideas/travelgear" exact component={ArticleTravelGear} props={childProps} />
    <AppliedRoute path="/listideas/hospitalbag" exact component={ArticleHospitalBag} props={childProps} />
    <AppliedRoute path="/listideas/nursery" exact component={ArticleNursery} props={childProps} />
    <AppliedRoute path="/listideas/bathtime" exact component={ArticleBathTime} props={childProps} />
    <AppliedRoute path="/listideas/christmasfortoddlers" exact component={ArticleChristmasIdeasForToddlers} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={LoginPage} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={SignupPage} props={childProps} />
    <UnauthenticatedRoute path="/login/reset" exact component={ResetPasswordPage} props={childProps} />
    <AuthenticatedRoute path="/logout" exact component={LogoutPage} props={childProps} />
    <AuthenticatedRoute path="/lists/:id" exact component={ViewListPage} props={childProps} />
    <AuthenticatedRoute path="/edit/:id" exact component={EditListPage} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={ErrorPage} />
  </Switch>;
