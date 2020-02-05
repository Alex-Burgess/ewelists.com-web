import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RecentArticlesMain from "custom/GiftIdeas/RecentArticlesMain.js";

import styles from "assets/jss/custom/views/landingPage/ideasStyle.js";
const useStyles = makeStyles(styles);

export default function LandingIdeas(props) {
  const classes = useStyles();

  const recentArticles = [
    {title: "Newborn Baby Essentials List", url: "/list-ideas/newborn-baby-essentials-list", img: 'newborn-baby-essentials-list.jpg', img_position_left: true,
    description_short: "What are the basic items that you need for your new arrival?",
    beginning_content: "There is so much 'stuff' out there for babies and deciding which of it you really need can seem like a huge task. The good news is that babies actually don't need that much for the first few months of their life, meaning you can keep things..."},
    {title: "Hospital Bag Checklist", url: "/list-ideas/hospital-bag-checklist", img: 'hospital-bag-checklist.jpg', img_position_left: false,
    description_short: "Get set with everything you need for the all important hospital bag.",
    beginning_content: "Whether you like to be super organised and prepared for anything or you are just looking for some ideas to get you started, these top tips and hospital bag checklists will help you stay ahead of the game. You can pack your bag as early as you..."}
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
