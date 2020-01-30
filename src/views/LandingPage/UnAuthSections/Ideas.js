import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RecentArticlesMain from "custom/GiftIdeas/RecentArticlesMain.js";

import styles from "assets/jss/custom/views/landingPage/ideasStyle.js";
const useStyles = makeStyles(styles);

export default function LandingIdeas(props) {
  const classes = useStyles();

  const recentArticles = [
    {title: "The Essentials Baby List", url: "/listideas/babyessentials", img: 'baby-essentials.jpg', img_position_left: true,
    description_short: "What are the basic items that you need for your new arrival?",
    beginning_content: "There is so much ‘stuff’ out there for babies and deciding which of it you really need can seem like a huge task. The good news is that babies really don’t need that much for the first few months of their life meaning..."},
    {title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospital-bag.jpg', img_position_left: false,
    description_short: "Get set with everything you need for the all important hospital bag.",
    beginning_content: "What do you pack in that all important hospital bag, or is it bags? I like to be organised and took great pleasure in compartmentalising my two hospital bags many weeks out from the birth date. My top tips for what to pack in your bag..."},

  ];

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <RecentArticlesMain
          articles={
            recentArticles
          }
        />
      </div>
    </div>
  );
}
