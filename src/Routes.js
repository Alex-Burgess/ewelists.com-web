import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";

import HomePage from "views/HomePage/HomePage.js";
import ErrorPage from "views/ErrorPages/ErrorPage.js";
import AboutPage from "views/AboutPage/AboutPage.js";
import HowItWorksPage from "views/HowItWorksPage/HowItWorksPage.js";
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
import ArticleNewbornFeeding from "views/ArticlePages/NewbornFeeding.js";
import ArticleBabyShower from "views/ArticlePages/BabyShower.js";
import ArticleVirtualBabyShower from "views/ArticlePages/VirtualBabyShower.js";
import ArticleWeaningAndBeyond from "views/ArticlePages/WeaningAndBeyond.js"

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" exact component={AboutPage} />
      <Route path="/how-it-works" exact component={HowItWorksPage} />
      <Route path="/terms" exact component={TermsPage} />
      <Route path="/privacy" exact component={PrivacyPage} />
      <Route path="/cookies" exact component={CookiesPage} />
      <Route path="/contact" exact component={ContactPage} />
      <Route path="/list-ideas" exact component={IdeasPage} />
      <Route path="/list-ideas/baby-travel-gear" exact component={ArticleTravelGear} />
      <Route path="/list-ideas/hospital-bag-checklist" exact component={ArticleHospitalBag} />
      <Route path="/list-ideas/nursery-list" exact component={ArticleNursery} />
      <Route path="/list-ideas/baby-bath-time" exact component={ArticleBathTime} />
      <Route path="/list-ideas/christmas-ideas-for-toddlers" exact component={ArticleChristmasIdeasForToddlers} />
      <Route path="/list-ideas/newborn-baby-essentials-list" exact component={ArticleBabyEssentials} />
      <Route path="/list-ideas/childrens-outdoor-play" exact component={ArticleOutdoorPlay} />
      <Route path="/list-ideas/childrens-indoor-play" exact component={ArticleIndoorPlay} />
      <Route path="/list-ideas/play-room-ideas" exact component={ArticlePlayRoom} />
      <Route path="/list-ideas/newborn-baby-feeding" exact component={ArticleNewbornFeeding} />
      <Route path="/list-ideas/baby-shower" exact component={ArticleBabyShower} />
      <Route path="/list-ideas/virtual-baby-shower" exact component={ArticleVirtualBabyShower} />
      <Route path="/list-ideas/weaning-and-beyond" exact component={ArticleWeaningAndBeyond} />
      <UnauthenticatedRoute path="/login" exact component={LoginPage} />
      <UnauthenticatedRoute path="/signup" exact component={SignupPage} />
      <UnauthenticatedRoute path="/signup-complete" exact component={SocialConfirmationPage} />
      <UnauthenticatedRoute path="/reset" exact component={ResetPasswordPage} />
      <AuthenticatedRoute path="/logout" exact component={LogoutPage} />
      <Route path="/lists/:id" exact component={ViewListPage} />
      <Route path="/reserve/:id" exact component={ReservedPage} />
      <AuthenticatedRoute path="/edit/:id" exact component={EditListPage} />
      <AuthenticatedRoute path="/settings/:id" exact component={ListSettingsPage} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={ErrorPage}/>
    </Switch>
  );
}
