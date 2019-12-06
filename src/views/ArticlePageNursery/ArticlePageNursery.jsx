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
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
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
      title: 'The Nursery List',
      subtitle: 'What to buy for your baby’s bedroom.',
      backgroundImg: 'nurserylist.jpg',
      similarArticles: [
        {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
        description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
        {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
        description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
        {category: "BABY", title: "Bath Time", url: "/listideas/bathtime", img: 'bathtime.jpg',
        description_short: "Everything you need when bathing your baby."}
      ],
      shopTheStory: [
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/wicker-moses-basket-welcome-to-the-world/p/770035001', price: '£74.25', description: 'Wicker Moses Basket - Welcome to the World.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/770035000_WTTW_Moses_Basket/Nursery/Nursery+Decor/Decor+Collections/Welcome+To+The+World?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/pram-fitted-sheet-2-pack-white/p/776502702', price: '£15', description: 'Pram Fitted Sheet (2 pack) - White.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/775502701_Cotbed_Fitted_Sheets_White/Nursery/Nursery+Bedding/Baby+Bedding?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/moses-fitted-sheets-pack-of-2-white/p/775502703', price: '£9', description: 'Moses Fitted Sheets (Pack of 2) - White.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/775502701_Cotbed_Fitted_Sheets_White/Nursery/Nursery+Bedding/Baby+Bedding?$pdpimagemobile$'},
        {brand: 'Snuzpod', url: 'https://www.mamasandpapas.com/en-gb/snuzpod-3-bedside-crib-white/p/264402700', price: '£199.95', description: 'Snuzpod 3 Bedside Crib - White.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/264402700_1/Nursery/Nursery+Furniture/Cots+%26+Cot+Beds?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/crib-fitted-sheets-pack-of-2-white/p/777502702', price: '£11.25', description: 'Crib Fitted Sheets (Pack of 2) - White.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/775502701_Cotbed_Fitted_Sheets_White/Nursery/Nursery+Bedding/Baby+Bedding?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/dover-adjustable-cot-to-toddler-bed-white/p/cbdo02700', price: '£269.10', description: 'Dover Adjustable Cot to Toddler Bed - White.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/CBDO02700_LS_3/Nursery/Nursery+Furniture/Furniture+Collections/Dover?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/premium-pocket-spring-cotbed-mattress/p/prpsmcb01', price: '£126.65', description: 'Premium Pocket Spring Cotbed Mattress.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/PRPSMMC01_Premium_PLspring/Nursery/Mattresses/All+Mattresses+%26+Covers/Cot+Bed+Mattresses?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/dover-adjustable-height-cot-white/p/ctdo02701', price: '£161.10', description: 'Dover Adjustable Height Cot - White.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/CTDO02701_1/Nursery/Nursery+Furniture/Furniture+Collections/Dover?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/pocket-sprung-premium-cot-mattress/p/prpsmmc00', price: '£69.30', description: 'Pocket Sprung Premium Cot Mattress.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/PRPSMMC00_N/Offers/Clearance/Furniture+Clearance?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/anti-allergy-mattress-protector-cotbed/p/mc0002703', price: '£14.25', description: 'Anti-allergy Mattress Protector (Cotbed).', img: 'https://media.mamasandpapas.com/i/mamasandpapas/MC0002700_baby-bedding_terry_protector/Nursery/Mattresses/Mattress+Protectors+%26+Covers?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/dream-upon-a-cloud-nursery-bundle/p/z90936300', price: '£175', description: 'Dream Upon a Cloud Nursery Bundle.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/Z90936300_BUMPER_NEW/Nursery/Nursery+Decor/Decor+Collections/Dream+Upon+A+Cloud?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/millie-boris-nursery-bundle-pink/p/z909h6900', price: '£200', description: 'Millie & Boris Nursery Bundle - Pink.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/Z909H6900_NEW/Nursery/Nursery+Decor/Decor+Collections/Millie+%26+Boris+Girls?$pdpimagemobile$'},
        {brand: 'The Gro Company', url: 'https://www.amazon.co.uk/Company-Grosnug-Swaddle-Newborn-Grobag/dp/B0114SQOR4', price: '£25.50', description: 'The Gro Company Grey Marl Grosnug 2-in-1 Swaddle and Newborn Grobag, 0-3 Months, Cosy.', img: 'https://images-na.ssl-images-amazon.com/images/I/61FYuA7Y9nL._SY355_.jpg'},
        {brand: 'John Lewis & Partners', url: 'https://www.johnlewis.com/john-lewis-partners-safari-mobile/p3439165', price: '£30.00', description: 'John Lewis & Partners Safari Mobile.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/237244063?$rsp-pdp-port-640$'},
        {brand: 'Infinity Wall Art Ltd', url: 'https://www.amazon.co.uk/Nursery-Stickers-Sticker-PD267-Direction/dp/B075J3RW4S', price: '£19.99', description: 'Nursery Tree Wall Stickers Animal Monkey Jungle Safari Kids Wall Art Decals Sticker.', img: 'https://images-na.ssl-images-amazon.com/images/I/51nDSDggZKL._SY355_.jpg'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/dover-3-drawer-dresser-changer-unit-white/p/dcdo02700', price: '£279.00', description: 'Dover 3 Drawer Dresser & Changer Unit - White.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/DCDO02700_LS_1/Nursery/Nursery+Furniture/Furniture+Collections/Dover?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/dover-2-door-nursery-wardrobe-white/p/wrdo02700', price: '£297.00', description: 'Dover 2 Door Nursery Wardrobe - White.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/WRDO02700_LS_1/Nursery/Nursery+Furniture/Furniture+Collections/Dover?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/dover-3-piece-cot-bed-range-with-dresser-and-wardrobe-grey/p/rado46800', price: '£719.00', description: 'Dover 3 Piece Cot Bed Range with Dresser and Wardrobe - Grey.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/rado46800_dover_cotbed_grey_3_piece/Nursery/Nursery+Furniture/Furniture+Collections/Dover?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/hilston-nursing-chair-duck-egg/p/chnsoa100', price: '£499.00', description: 'Hilston Nursing Chair - Silver.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/CHNSOA100_LS_5/Nursery/Nursery+Furniture?$pdpimagemobile$'},
        {brand: 'Mamas & Papas', url: 'https://www.mamasandpapas.com/en-gb/hilston-nursery-footstool-sand/p/slnsoa100', price: '£149.00', description: 'Hilston Nursery Footstool - Silver.', img: 'https://media.mamasandpapas.com/i/mamasandpapas/SLNSOA100_LS_2?$pdpimagemobile$'},
        {brand: 'VAVA', url: 'https://www.amazon.co.uk/VAVA-Charging-Rechargeable-Bedside-Breastfeeding/dp/B07JNHJFVP', price: '£19.99', description: 'VAVA Night Lights for Kids with Stable Charging Pad, Rechargeable Bedside Table Lamp for Breastfeeding.', img: 'https://images-na.ssl-images-amazon.com/images/I/51g9pQ1epjL._SX522_.jpg'},
        {brand: 'The Gro Company', url: 'https://www.amazon.co.uk/Company-Groegg-Colour-Changing-Thermometer/dp/B002B55BN8', price: '£13.00', description: 'The Gro Company Groegg Colour Changing Room Thermometer.', img: 'https://images-na.ssl-images-amazon.com/images/I/71-jBXjqKLL._SY450_.jpg'},
        {brand: 'BT', url: 'https://www.amazon.co.uk/dp/B01N9OOA7H', price: '£34.99', description: 'BT Digital Audio Baby Monitor 450 Lightshow', img: 'https://images-na.ssl-images-amazon.com/images/I/51fwG6RjhbL._SX355_.jpg'},
        {brand: 'HELLO BABY', url: 'https://www.amazon.co.uk/HELLO-BABY-Wireless-Temperature-Monitoring/dp/B071FJPY7G', price: '£89.99', description: 'HELLO BABY Wireless Video Baby Monitor with Digital Camera, Night Vision Temperature Monitoring & 2 Way Talkback System, White', img: 'https://images-na.ssl-images-amazon.com/images/I/71eBwZ%2BSfeL._SY355_.jpg'}
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
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                <img src={product.img} className={classes.productImage} alt=".." />
              </a>
            </CardHeader>
            <CardBody plain>
              <a href={product.url} target="_blank" rel="noopener noreferrer">
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
        {this.props.isAuthenticated
          ? <Header
              brand="ewelists"
              links={<HeaderLinksAuth dropdownHoverColor="info" />}
              fixed
              color="transparent"
              changeColorOnScroll={{
                height: 200,
                color: "info"
              }}
            />
          : <Header
              brand="ewelists"
              links={<HeaderLinks dropdownHoverColor="info" />}
              fixed
              color="transparent"
              changeColorOnScroll={{
                height: 200,
                color: "info"
              }}
            />
        }
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
