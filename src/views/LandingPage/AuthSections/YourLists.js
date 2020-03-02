import React, { useState, useEffect } from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import ViewIcon from "@material-ui/icons/Visibility";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Info from "components/Typography/Info.js";
// Custom Buttons
import CreateButton from "custom/Buttons/CreateButton.js";
import CreatePopOut from "./CreatePopOut.js";

import { GetLists } from "./YourListsApi";

import styles from "assets/jss/custom/views/landingPage/yourListsStyle.js";
const useStyles = makeStyles(styles);

export default function YourLists(props) {
  const classes = useStyles();

  const { showCreate } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [ownedLists, setOwnedLists] = useState([]);
  const [createModal, setCreateModal] = useState(showCreate);

  useEffect( () => {
    async function getLists(){
      const response = await GetLists();
      setOwnedLists(response.owned);
    }

    getLists();
    setIsLoading(false);
  }, []);

  const renderYourLists = (lists: Lists[]) => {
    let allLists: Lists[] = [];

    return allLists.concat(lists).map (
      (list, i) =>
        <GridItem xs={12} sm={4} md={4} key={i}>
          <Card profile>
            <CardHeader image>
              <a href={"/lists/" + list.listId}>
                <img src={list.imageUrl} className={classes.listImage} alt="..." />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: `url(${list.imageUrl})`,
                  opacity: "1"
                }}
              />
            </CardHeader>
            <CardBody>
              <Info>
                <a href={"/lists/" + list.listId}>
                  <h6 className={classes.cardCategory}>{list.title}</h6>
                </a>
              </Info>
              <p className={classes.cardDescription}>
                {list.occasion}
              </p>
            </CardBody>
              <CardFooter profile className={classes.justifyContentCenter}>
                <a href={"/lists/" + list.listId}>
                  <Button round color="info" className={classes.customButton}>
                    <ViewIcon /> View
                  </Button>
                </a>
                <a href={"/edit/" + list.listId}>
                  <Button round color="success" className={classes.customButton}>
                    <Icon>mode_edit</Icon> Edit
                  </Button>
                </a>
              </CardFooter>
          </Card>
        </GridItem>
    )
  }


  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h1 className={classes.title}>Your lists</h1>
        <br />
        <GridContainer>
          {!isLoading && renderYourLists(ownedLists)}
          <GridItem xs={12} sm={4} md={4}>
            <CreateButton
              text="Create a New List"
              onClick={() => setCreateModal(true)}
            />
            {<CreatePopOut open={createModal} setCreateModal={setCreateModal} />}
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

YourLists.propTypes = {
  showCreate: PropTypes.bool,
};
