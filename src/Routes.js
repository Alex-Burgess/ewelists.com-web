import React from "react";
// import { Route, Switch } from "react-router-dom";
import { Switch } from "react-router-dom";
import LandingPage from "views/LandingPage/LandingPage.js";
import ErrorPage from "views/ErrorPage/ErrorPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ResetPasswordPage from "views/ResetPasswordPage/ResetPasswordPage.js";
import LogoutPage from "views/LogoutPage/LogoutPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import PrivacyPage from "views/PrivacyPage/PrivacyPage.js";
import TermsPage from "views/TermsPage/TermsPage.js";
import ContactPage from "views/ContactUsPage/ContactUsPage.js";
import GiftListIdeas from "views/GiftListIdeas/GiftListIdeas.js";
import ArticleTravelGear from "views/ArticlePages/BabyTravelGear.js";
import ArticleHospitalBag from "views/ArticlePages/HospitalBag.js";
import ArticleNursery from "views/ArticlePages/Nursery.js";
import ArticleBathTime from "views/ArticlePages/BathTime.js";
import ArticleChristmasIdeasForToddlers from "views/ArticlePages/ChristmasIdeasForToddlers.js";
import ArticleBabyEssentials from "views/ArticlePages/BabyEssentials.js";
import ViewListPage from "views/ViewListPage/ViewListPage.js";
import EditListPage from "views/EditListPage/EditListPage.js";

import AppliedRoute from "./custom/Routes/AppliedRoute";
import AuthenticatedRoute from "./custom/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./custom/Routes/UnauthenticatedRoute";

export default ({childProps}) =>
  <Switch>
    <AppliedRoute path="/" exact component={LandingPage} props={childProps} />
    <AppliedRoute path="/terms" exact component={TermsPage} props={childProps} />
    <AppliedRoute path="/privacy" exact component={PrivacyPage} props={childProps} />
    <AppliedRoute path="/contact" exact component={ContactPage} props={childProps} />
    <AppliedRoute path="/list-ideas" exact component={GiftListIdeas} props={childProps} />
    <AppliedRoute path="/list-ideas/baby-travel-gear" exact component={ArticleTravelGear} props={childProps} />
    <AppliedRoute path="/list-ideas/hospital-bag-checklist" exact component={ArticleHospitalBag} props={childProps} />
    <AppliedRoute path="/list-ideas/nursery-list" exact component={ArticleNursery} props={childProps} />
    <AppliedRoute path="/list-ideas/baby-bath-time" exact component={ArticleBathTime} props={childProps} />
    <AppliedRoute path="/list-ideas/christmas-ideas-for-toddlers" exact component={ArticleChristmasIdeasForToddlers} props={childProps} />
    <AppliedRoute path="/list-ideas/newborn-baby-essentials-list" exact component={ArticleBabyEssentials} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={LoginPage} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={SignupPage} props={childProps} />
    <UnauthenticatedRoute path="/login/reset" exact component={ResetPasswordPage} props={childProps} />
    <AuthenticatedRoute path="/logout" exact component={LogoutPage} props={childProps} />
    <AuthenticatedRoute path="/lists/:id" exact component={ViewListPage} props={childProps} />
    <AuthenticatedRoute path="/edit/:id" exact component={EditListPage} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <AppliedRoute component={ErrorPage} props={childProps}/>
  </Switch>;
