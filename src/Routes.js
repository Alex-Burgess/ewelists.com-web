import React from "react";
// import { Route, Switch } from "react-router-dom";
import { Switch } from "react-router-dom";
import AppliedRoute from "./custom/Routes/AppliedRoute";
import AuthenticatedRoute from "./custom/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./custom/Routes/UnauthenticatedRoute";

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
import ArticleOutdoorPlay from "views/ArticlePages/OutdoorPlay.js";
import ViewListPage from "views/ViewListPage/ViewListPage.js";
import EditListPage from "views/EditListPage/EditListPage.js";
import ReservedPage from "views/ReservedPage/ReservedPage.js";
import ListSettingsPage from "views/ListSettingsPage/ListSettingsPage.js";

export default function Routes({appProps}) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={LandingPage} props={appProps} />
      <AppliedRoute path="/terms" exact component={TermsPage} props={appProps} />
      <AppliedRoute path="/privacy" exact component={PrivacyPage} props={appProps} />
      <AppliedRoute path="/contact" exact component={ContactPage} props={appProps} />
      <AppliedRoute path="/list-ideas" exact component={GiftListIdeas} props={appProps} />
      <AppliedRoute path="/list-ideas/baby-travel-gear" exact component={ArticleTravelGear} props={appProps} />
      <AppliedRoute path="/list-ideas/hospital-bag-checklist" exact component={ArticleHospitalBag} props={appProps} />
      <AppliedRoute path="/list-ideas/nursery-list" exact component={ArticleNursery} props={appProps} />
      <AppliedRoute path="/list-ideas/baby-bath-time" exact component={ArticleBathTime} props={appProps} />
      <AppliedRoute path="/list-ideas/christmas-ideas-for-toddlers" exact component={ArticleChristmasIdeasForToddlers} props={appProps} />
      <AppliedRoute path="/list-ideas/newborn-baby-essentials-list" exact component={ArticleBabyEssentials} props={appProps} />
      <AppliedRoute path="/list-ideas/childrens-outdoor-play" exact component={ArticleOutdoorPlay} props={appProps} />
      <UnauthenticatedRoute path="/login" exact component={LoginPage} props={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={SignupPage} props={appProps} />
      <UnauthenticatedRoute path="/login/reset" exact component={ResetPasswordPage} props={appProps} />
      <AuthenticatedRoute path="/logout" exact component={LogoutPage} props={appProps} />
      <AppliedRoute path="/lists/:id" exact component={ViewListPage} props={appProps} />
      <AppliedRoute path="/reserve/:id" exact component={ReservedPage} props={appProps} />
      <AuthenticatedRoute path="/edit/:id" exact component={EditListPage} props={appProps} />
      <AuthenticatedRoute path="/settings/:id" exact component={ListSettingsPage} props={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <AppliedRoute component={ErrorPage} props={appProps}/>
    </Switch>
  );
}
