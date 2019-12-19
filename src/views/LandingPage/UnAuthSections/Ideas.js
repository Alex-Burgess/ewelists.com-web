import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RecentArticlesMain from "custom/GiftIdeas/RecentArticlesMain.js";

import styles from "assets/jss/custom/views/landingPage/ideasStyle.js";
const useStyles = makeStyles(styles);

export default function LandingIdeas(props) {
  const classes = useStyles();

  const recentArticles = [
    {title: "Christmas Ideas for Toddlers", url: "/listideas/christmasfortoddlers", img: 'christmastoddlers.jpg', img_position_left: true,
    description_short: "Great Christmas ideas for toddlers and young children",
    beginning_content: "If you are stuck wondering what to get a toddler for Christmas, here are some of our favourite ideas! Toddlers love to mimic adults and join in ‘helping’ with every day tasks. Here are some great ideas to encourage role play..."},
    {title: "Nursery List", url: "/listideas/nursery", img: 'nurserylist.jpg', img_position_left: false,
    description_short: "All the items you need for your baby’s bedroom",
    beginning_content: "Have you been gushing over the possibilities for the cute little nursery or area you want to create for your baby. The nesting phase is such a special time in the lead up to the arrival of your baby and choosing how to decorate your nursery can bring immense joy..."}
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
