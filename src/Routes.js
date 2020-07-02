import React from "react";
// import { Route, Switch } from "react-router-dom";
import { Switch } from "react-router-dom";
import AppliedRoute from "./components/Routes/AppliedRoute";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";

import HomePage from "views/HomePage/HomePage.js";
import ErrorPage from "views/ErrorPages/ErrorPage.js";
import AboutPage from "views/AboutPage/AboutPage.js";
import LoginPage from "views/AuthPages/LoginPage.js";
import SignupPage from "views/AuthPages/SignupPage.js";
import SocialConfirmationPage from "views/AuthPages/SocialConfirmationPage.js";
import ResetPasswordPage from "views/AuthPages/ResetPasswordPage.js";
import LogoutPage from "views/AuthPages/LogoutPage.js";
import PrivacyPage from "views/LegalPages/PrivacyPage.js";
import TermsPage from "views/LegalPages/TermsPage.js";
import CookiesPage from "views/LegalPages/CookiesPage.js";
import ContactPage from "views/ContactUsPage/ContactUsPage.js";
import ViewListPage from "views/ViewListPage/ViewListPage.js";
import EditListPage from "views/EditListPage/EditListPage.js";
import ReservedPage from "views/ReservedPage/ReservedPage.js";
import ListSettingsPage from "views/ListSettingsPage/ListSettingsPage.js";
import IdeasPage from "views/IdeasPage/IdeasPage.js";
import ArticleTravelGear from "views/ArticlePages/BabyTravelGear.js";
import ArticleHospitalBag from "views/ArticlePages/HospitalBag.js";
import ArticleNursery from "views/ArticlePages/Nursery.js";
import ArticleBathTime from "views/ArticlePages/BathTime.js";
import ArticleChristmasIdeasForToddlers from "views/ArticlePages/ChristmasIdeasForToddlers.js";
import ArticleBabyEssentials from "views/ArticlePages/BabyEssentials.js";
import ArticleOutdoorPlay from "views/ArticlePages/OutdoorPlay.js";
import ArticleIndoorPlay from "views/ArticlePages/IndoorPlay.js";
import ArticlePlayRoom from "views/ArticlePages/PlayRoom.js";

export default function Routes({appProps}) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={HomePage} props={appProps} />
      <AppliedRoute path="/about" exact component={AboutPage} props={appProps} />
      <AppliedRoute path="/terms" exact component={TermsPage} props={appProps} />
      <AppliedRoute path="/privacy" exact component={PrivacyPage} props={appProps} />
      <AppliedRoute path="/cookies" exact component={CookiesPage} props={appProps} />
      <AppliedRoute path="/contact" exact component={ContactPage} props={appProps} />
      <AppliedRoute path="/list-ideas" exact component={IdeasPage} props={appProps} />
      <AppliedRoute path="/list-ideas/baby-travel-gear" exact component={ArticleTravelGear} props={appProps} />
      <AppliedRoute path="/list-ideas/hospital-bag-checklist" exact component={ArticleHospitalBag} props={appProps} />
      <AppliedRoute path="/list-ideas/nursery-list" exact component={ArticleNursery} props={appProps} />
      <AppliedRoute path="/list-ideas/baby-bath-time" exact component={ArticleBathTime} props={appProps} />
      <AppliedRoute path="/list-ideas/christmas-ideas-for-toddlers" exact component={ArticleChristmasIdeasForToddlers} props={appProps} />
      <AppliedRoute path="/list-ideas/newborn-baby-essentials-list" exact component={ArticleBabyEssentials} props={appProps} />
      <AppliedRoute path="/list-ideas/childrens-outdoor-play" exact component={ArticleOutdoorPlay} props={appProps} />
      <AppliedRoute path="/list-ideas/childrens-indoor-play" exact component={ArticleIndoorPlay} props={appProps} />
      <AppliedRoute path="/list-ideas/play-room-ideas" exact component={ArticlePlayRoom} props={appProps} />
      <UnauthenticatedRoute path="/login" exact component={LoginPage} props={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={SignupPage} props={appProps} />
      <UnauthenticatedRoute path="/signup-complete" exact component={SocialConfirmationPage} props={appProps} />
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
