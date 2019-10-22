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
/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import FooterDark from "components/Footer/FooterDark.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import RecentList from "components/RecentList/RecentList.jsx";
// sections for this page

import listIdeasPageStyle from "assets/jss/material-kit-pro-react/views/listIdeasPageStyle.jsx";

import image from "assets/img/sheep-with-shoes.jpg";

class ListIdeasPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      similarArticles: [
        {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
        description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
        {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
        description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
        {category: "BABY", title: "Bath Time", url: "/listideas/bathtime", img: 'bathtime.jpg',
        description_short: "Everything you need when bathing your baby."}
      ],
      recentArticles: [
        {title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg', img_position_left: true,
        description_short: "Great items to make travelling with your little ones no fuss!",
        beginning_content: "The compact stroller/buggy is one of the most useful items for travelling. They are handy for all sorts, such as effortlessly moving around the city hopping on and off public transport, taking with you through the airport, or just keeping in the car..."},
        {title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg', img_position_left: false,
        description_short: "Get set with everything you need for the all important hospital bag.",
        beginning_content: "What do you pack in that all important hospital bag, or is it bags? I like to be organised and took great pleasure in compartmentalising my two hospital bags many weeks out from the birth date. My top tips for what to pack in your bag..."},
        {title: "Nursery List", url: "/listideas/nurserylist", img: 'nurserylist.jpg', img_position_left: true,
        description_short: "All the items you need for your baby’s bedroom",
        beginning_content: "Have you been gushing over the possibilities for the cute little nursery or area you want to create for your baby. The nesting phase is such a special time in the lead up to the arrival of your baby and choosing how to decorate your nursery can bring immense joy..."},
        {title: "Bath Time", url: "/listideas/bathtime", img: 'bathtime.jpg', img_position_left: false,
        description_short: "Everyting you need when bathing your baby.",
        beginning_content: "It can be a daunting prospect when it comes to giving your new baby a bath. They are so small and slippery and you worry if they will like it. The first thing to say is that you don’t need to bathe your baby straight away or every day for that matter..."}
      ]
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  renderRecentArticles(classes, articles: Articles[]){
    let allArticles: Articles[] = [];

    return allArticles.concat(articles).map (
      (article, i) =>
        <RecentList
          title={article.title}
          url={article.url}
          img={require('assets/img/articles/' + article.img)}
          img_position_left={article.img_position_left}
          description_short={article.description_short}
          beginning_content={article.beginning_content}
        />
    )
  }

  renderSimilarArticles(classes, articles: Articles[]){
    let allArticles: Articles[] = [];

    return allArticles.concat(articles).map (
      (article, i) =>
        <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
          <Card plain blog>
            <CardHeader image plain>
              <a href={article.url}>
                <img src={require('assets/img/articles/' + article.img)} className={classes.listImage} alt="..." />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: "url(assets/img/articles/" + article.img + ")",
                  opacity: "1"
                }}
              />
            </CardHeader>
            <CardBody plain>
              <h4 className={classes.cardTitle}>
                <a href={article.url}>
                  {article.title}
                </a>
              </h4>
              <p className={classes.description}>
                {article.description_short}
                <a href={article.url} className={classes.link}> Read Article </a>
              </p>
            </CardBody>
          </Card>
        </GridItem>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          brand="Material Kit PRO React"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 200,
            color: "info"
          }}
        />
        <Parallax filter="infoBanner" verySmall>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
                <h2 className={classes.title}>
                  Gift List Ideas
                </h2>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classes.main}>
          <div className={classes.container}>
            <div className={classes.section}>
              <GridContainer>
                <GridItem xs={12} sm={10} md={10} className={classes.mlAuto + " " + classes.mrAuto}>
                  {this.renderRecentArticles(classes, this.state.recentArticles)}
                </GridItem>
              </GridContainer>
            </div>
            <div className={classes.section}>
              <h3 className={classes.sectionTitle + " " + classes.textCenter}>
                You may also be interested in
              </h3>
              <br />
              <GridContainer>
                {this.renderSimilarArticles(classes, this.state.similarArticles)}
              </GridContainer>
            </div>
          </div>
        </div>
        <FooterDark />
      </div>
    );
  }
}

ListIdeasPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(listIdeasPageStyle)(ListIdeasPage);
