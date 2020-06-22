import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RecentArticles from "components/Articles/RecentArticles.js";

import styles from "assets/jss/material-kit-pro-react/views/landingPage/ideasStyle.js";
const useStyles = makeStyles(styles);

export default function LandingIdeas(props) {
  const classes = useStyles();

  const recentArticles = [
    'newborn-baby-essentials-list',
    'hospital-bag-checklist'
  ];

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <RecentArticles
          articles={
            recentArticles
          }
        />
      </div>
    </div>
  );
}
