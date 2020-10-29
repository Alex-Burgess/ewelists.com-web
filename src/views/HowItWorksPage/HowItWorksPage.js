import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ShareIcon from "@material-ui/icons/People";
import SearchIcon from "@material-ui/icons/Search";
import PasteIcon from "@material-ui/icons/TouchApp";
import AddListIcon from "@material-ui/icons/PlaylistAdd";
import ReserveIcon from "@material-ui/icons/Redeem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TrackIcon from "@material-ui/icons/PlaylistAddCheck";
// PostAdd
// core components
import HeaderWhite from "components/Header/HeaderWhite.js";
import FooterDark from "components/Footer/FooterDark.js";
// Sections for this page
import Hero from "./Sections/Hero.js";
import Create from "./Sections/Create.js";
import CarouselFeature from "./Sections/CarouselFeature.js";
import SimpleFeature from "./Sections/SimpleFeature.js";
import BasicFeature from "./Sections/BasicFeature.js";

import styles from "assets/jss/material-kit-pro-react/views/howItWorksPage/howItWorksStyle.js";
const useStyles = makeStyles(styles);

export default function HowItWorksPage(props) {
  const classes = useStyles();
  return (
    <div>
      <HeaderWhite />
      <div className={classes.main}>
        <Hero />
        <SimpleFeature
          title='Create your wish list'
          description='Create a wish list for any occasion and have multiple lists at once. Keep a list for each of your
           little ones and one for yourself too.'
          stepTitle='Create list'
          stepIcon={AddIcon}
          image='how-it-works-create.png'
        />
        <CarouselFeature
          title='Add items that work for you'
          description='Ewelists allows you to add items from any online store. You can choose products that suit
           your taste and lifestyle.'
         stepOneTitle='Find gift'
         stepOneIcon={SearchIcon}
         imageOne='how-it-works-find.png'
         stepTwoTitle='Paste link'
         stepTwoIcon={PasteIcon}
         imageTwo='how-it-works-paste.png'
         stepThreeTitle='Add gift'
         stepThreeIcon={AddListIcon}
         imageThree='how-it-works-add.png'
        />
        <SimpleFeature
          title='Share your ideas'
          description='Help friends and family know what you need so they can choose from a range of meaningful gifts.'
          stepTitle='Share list'
          stepIcon={ShareIcon}
          image='how-it-works-share.png'
        />
        <CarouselFeature
          title='Keep track'
          description=
          'When a gift is reserved we will send you a notification.  You can see which gifts have been reserved and those still available.'
         stepOneTitle='Reserve gift'
         stepOneIcon={ReserveIcon}
         imageOne='how-it-works-reserve.png'
         stepTwoTitle='Get notified'
         stepTwoIcon={NotificationsIcon}
         imageTwo='how-it-works-notify.png'
         stepThreeTitle='Keep track'
         stepThreeIcon={TrackIcon}
         imageThree='how-it-works-track.png'
        />
        <BasicFeature
          title='Enjoy the gifts'
          description='Feel the delight of receiving gifts that suit your needs, and the awesomeness that you’ve done
           your bit for the environment by reducing unwanted gifts.'
        />
        <Create />
      </div>
      <FooterDark />
    </div>
  );
}
