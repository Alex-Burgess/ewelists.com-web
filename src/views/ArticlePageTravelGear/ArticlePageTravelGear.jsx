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
import FormatAlignLeft from "@material-ui/icons/FormatAlignLeft";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import FooterLarge from "components/Footer/FooterLarge.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
// sections for this page
import SectionContent from "./Content.jsx";
import SectionSimilarList from "components/SimilarList/SimilarList.jsx";

import articlePageStyle from "assets/jss/material-kit-pro-react/views/articlePageStyle.jsx";


class ArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Travel Gear',
      subtitle: 'Our favourite gear to make travelling with your little ones no fuss!',
      backgroundImg: 'travelgear.jpg',
      similarArticles: [
        {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
        description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
        {category: "BABY", title: "Bath Time", url: "/listideas/bathtime", img: 'bathtime.jpg',
        description_short: "Everything you need when bathing your baby."},
        {category: "NURSERY", title: "The Nursery List", url: "/listideas/nursery", img: 'nurserylist.jpg',
        description_short: "What to buy for your baby’s bedroom."}
      ],
      shopTheStory: [
        {brand: 'BABYBJÖRN', url: 'https://www.amazon.co.uk/dp/B01H24LM58', price: '£189.99', description: 'Travel Cot Easy Go, Anthracite, with transport bag.', img: 'https://images-na.ssl-images-amazon.com/images/I/81qYpf1Sm2L._SX679_.jpg'},
        {brand: 'Micralite', url: 'https://www.amazon.co.uk/dp/B07PN49Q4S', price: '£175.00', description: 'Micralite Travel Cot 3 in 1 Sleep & Go Portable Travel Cot - Carbon/Grey.', img: 'https://images-na.ssl-images-amazon.com/images/I/51oQcQG0CKL._SX355_.jpg'},
        {brand: 'BABYZEN', url: 'https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291', price: '£389.00', description: 'BABYZEN YOYO+ Pushchair, Grey/Black.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/237457570?$rsp-pdp-port-640$'},
        {brand: 'Mamas & Papas', url: 'https://www.amazon.co.uk/dp/B07FBYHY7L', price: '£189.00', description: 'Acro Compact Buggy, Black.', img: 'https://images-na.ssl-images-amazon.com/images/I/81LJ-0%2BSKVL._SY450_.jpg'},
        {brand: 'Micralite', url: 'https://www.amazon.co.uk/dp/B07PM6ZD1C', price: '£175.00', description: 'Micralite ProFold Compact Lightweight Carbon Stroller.', img: 'https://images-na.ssl-images-amazon.com/images/I/71hqy17iYuL._SY550_.jpg'},
        {brand: 'BABYBJÖRN', url: 'https://www.amazon.co.uk/dp/B07937WXKD', price: '£119.99', description: 'BABYBJÖRN Baby Carrier One Air, 3D Mesh, Navy Blue, 2018 Edition.', img: 'https://images-na.ssl-images-amazon.com/images/I/91hX32oi5LL._SX355_.jpg'},
        {brand: 'LittleLife', url: 'https://www.amazon.co.uk/dp/B0792Y5L7K', price: '£79.00', description: 'LittleLife Ranger S2 Child Carrier.', img: 'https://images-na.ssl-images-amazon.com/images/I/81KydgdpFmL._SY679_.jpg'},
        {brand: 'Phil and Teds', url: 'https://www.amazon.co.uk/dp/B0019AC8GE', price: '69.95', description: 'Phil and Teds Lobster Highchair Red.', img: 'https://images-na.ssl-images-amazon.com/images/I/91SA-D7wIUL._SX355_.jpg'},
        {brand: 'Munchkin', url: 'https://www.amazon.co.uk/dp/B01M6XGKV1', price: '£20.83', description: 'Munchkin Portable Travel Child Booster Seat, (Blue/Grey).', img: 'https://images-na.ssl-images-amazon.com/images/I/7178PGluPOL._SY355_.jpg'}
      ]
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  renderShopTheStory(classes, products: Products[]){
    let allProducts: Products[] = [];

    return allProducts.concat(products).map (
      (product, i) =>
        <GridItem md={4} sm={4} key={i}>
          <Card plain product>
            <CardHeader noShadow image>
              <a href={product.url}>
                <img src={product.img} className={classes.productImage} alt=".." />
              </a>
            </CardHeader>
            <CardBody plain>
              <a href={product.url}>
                <h4 className={classes.cardTitle}>{product.brand}</h4>
              </a>
              <p className={classes.description}>
                {product.description}
              </p>
              <div className={classes.priceContainer}>
                <span className={classes.price}> {product.price}</span>
              </div>
            </CardBody>
          </Card>
        </GridItem>
    )
  }

  renderSimilarArticles(classes, articles: Articles[]){
    let allArticles: Articles[] = [];

    return allArticles.concat(articles).map (
      (article, i) =>
        <GridItem xs={12} sm={4} md={4}>
          <SectionSimilarList
            category={article.category}
            title={article.title}
            url={article.url}
            img={require('assets/img/articles/' + article.img)}
            description_short={article.description_short}
          />
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
        <Parallax image={require('assets/img/articles/' + this.state.backgroundImg)} filter="dark" className={classes.articleBg}>
        </Parallax>
        <div className={classes.main}>
          <div className={classes.container}>
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={10} md={10}>
                  <h1 className={classes.title}>
                    {this.state.title}
                  </h1>
                  <h2 className={classes.subtitle}>
                    {this.state.subtitle}
                  </h2>
                  <div className={classes.content}>
                    <SectionContent />
                  </div>
                </GridItem>
              </GridContainer>
            </div>
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={10} md={10}>
                  <h3 className={classes.title}>Shop The Story</h3>

                  <GridContainer>
                    {this.renderShopTheStory(classes, this.state.shopTheStory)}
                  </GridContainer>
                  <br />

                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <div className={classes.sectionSimilarLists}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem md={12}>
                <h2 className={classes.title + " " + classes.textCenter}>
                  Similar Articles
                </h2>
                <br />
                <GridContainer>
                  {this.renderSimilarArticles(classes, this.state.similarArticles)}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <FooterLarge />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(articlePageStyle)(ArticlePage);
