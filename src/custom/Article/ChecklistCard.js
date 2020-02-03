import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/icons
import AssignmentTurnedIn from "@material-ui/icons/ListAlt";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/custom/components/article/checklistCardStyle.js";
const useStyles = makeStyles(styles);

export default function ChecklistCard(props) {
  const { items, packing } = props;
  const classes = useStyles();

  const title = () => {
    if (packing) {
        return "Items for your packing list"
    } else {
      return "Items for your list"
    }
  }

  return (
    <Card className={classes.checklistCard}>
      <CardBody color>
        <h5 className={classes.cardCategorySocialWhite}>
          <AssignmentTurnedIn />
          {title()}
        </h5>
        <h5 className={classes.cardTitleWhite}>
          <GridContainer >
            <GridItem xs={12} sm={6} md={6}>
              <ul className={classes.ulCustom}>
                {items.map((item, i) =>
                  i % 2
                  ? null
                  : <li className={classes.listSpacing} key={i}>{item}</li>
                )}
              </ul>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <ul className={classes.ulCustom}>
                {items.map((item, i) =>
                  i % 2
                  ? <li className={classes.listSpacing} key={i}>{item}</li>
                  : null
                )}
              </ul>
            </GridItem>
          </GridContainer>
        </h5>
      </CardBody>
    </Card>
  );
}

ChecklistCard.propTypes = {
  items: PropTypes.array,
  packing: PropTypes.bool
};
