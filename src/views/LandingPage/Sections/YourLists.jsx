/*!

=========================================================
* Material Kit PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { API } from "aws-amplify";
import { withRouter } from 'react-router-dom'
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Subject from "@material-ui/icons/Subject";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CreateButton from "components/CreateButton/CreateButton.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Info from "components/Typography/Info.jsx";

import createStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/yourListsStyle.jsx";

import oscar1 from "assets/img/examples/oscar-birthday.jpg";
import oscar2 from "assets/img/examples/oscar-christmas.jpg";

class SectionLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  createList = async event => {
    this.setState({ isLoading: true });

    const response = await this.createListRequest();

    const listId = response.listId;
    console.log("List was created with ID (" + listId + "), redirecting to edit page for list.")

    this.props.history.push('/edit/' + listId);
  }

  createListRequest() {
    return API.post("lists", "/");
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h1 className={classes.title}>Your lists</h1>
              <br />
              <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                  <Card profile>
                    <CardHeader image>
                      <a href="/lists/viewexample">
                        <img src={oscar1} className={classes.listImage} alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${oscar1})`,
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody>
                      <Info>
                        <a href="/lists/viewexample">
                          <h6 className={classes.cardCategory}>Oscar's Birthday</h6>
                        </a>
                      </Info>
                      <p className={classes.cardDescription}>
                        Oscar's second birthday wish list.
                      </p>
                    </CardBody>
                    <CardFooter
                      profile
                      className={classes.justifyContentCenter}
                    >
                      <a href="/lists/viewexample">
                        <Button round justIcon color="info">
                          <Subject />
                        </Button>
                      </a>
                      <a href="/edit/editexample">
                        <Button round justIcon color="success">
                          <Icon>mode_edit</Icon>
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Card profile>
                    <CardHeader image>
                      <a href="/lists/viewexample">
                        <img src={oscar2} className={classes.listImage} alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${oscar2})`,
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody>
                      <Info>
                        <a href="/lists/viewexample">
                          <h6 className={classes.cardCategory}>Oscar's Christmas</h6>
                        </a>
                      </Info>
                      <p className={classes.cardDescription}>
                        Oscar's second Christmas wish list.
                      </p>
                    </CardBody>
                    <CardFooter
                      profile
                      className={classes.justifyContentCenter}
                    >
                      <a href="/lists/viewexample">
                        <Button round justIcon color="info">
                          <Subject />
                        </Button>
                      </a>
                      <a href="/edit/editexample">
                        <Button round justIcon color="success">
                          <Icon>mode_edit</Icon>
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <CreateButton
                    text="Create a New List"
                    onClick={this.createList}
                    isLoading={this.state.isLoading}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

SectionLists.propTypes = {
  classes: PropTypes.object
};

export default withRouter(withStyles(createStyle)(SectionLists));
