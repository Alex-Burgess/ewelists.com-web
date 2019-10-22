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
      title: 'Hospital Bag',
      subtitle: "Make sure you're all set with everything you need for the all important hospital bag.",
      backgroundImg: 'hospitalbag.jpg',
      similarArticles: [
        {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
        description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
        {category: "NURSERY", title: "The Nursery List", url: "/listideas/nursery", img: 'nurserylist.jpg',
        description_short: "What to buy for your baby’s bedroom."},
        {category: "BABY", title: "Bath Time", url: "/listideas/bathtime", img: 'bathtime.jpg',
        description_short: "Everything you need when bathing your baby."}
      ],
      shopTheStory: [
        {brand: 'John Lewis and Partners', url: 'https://www.johnlewis.com/john-lewis-partners-geneva-large-weekend-holdall/blue/p1807673', price: '£75.00', description: 'John Lewis & Partners Geneva Large Weekend Holdall, Blue.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/234172546?$rsp-pdp-port-1440$'},
        {brand: "Burt's Bees", url: 'https://www.amazon.co.uk/Burts-Bees-Percentage-Overnight-Ultra-Conditioning/dp/B07C3BLZRN', price: '£6.99', description: "Burt's Bees 100 Percentage Natural Overnight Intensive Lip Treatment, Ultra-Conditioning Lip Care, 7.08 g.", img: 'https://images-na.ssl-images-amazon.com/images/I/71yUvdw8UIL._SX679_.jpg'},
        {brand: 'Camelbak', url: 'https://www.amazon.co.uk/Camelbak-53622-CamelBak-eddy-75L/dp/B00NTYIHNQ', price: '£11.95', description: 'BPA Free Eddy Outdoor Bottle.', img: 'https://images-na.ssl-images-amazon.com/images/I/61J1m1AOrVL._SY879_.jpg'},
        {brand: 'Cybex', url: 'https://www.johnlewis.com/cybex-cloud-z-i-size-group-0-baby-car-seat-midnight-blue/p4329431', price: '£224.95', description: 'Cybex Cloud Z i-Size Group 0+ Baby Car Seat, Midnight Blue.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/238224245?$rsp-pdp-port-640$'},
        {brand: 'EasyAcc', url: 'https://www.amazon.co.uk/EasyAcc-Handheld-Electric-Rechargeable-Travel-Green/dp/B01NC2TS0C', price: '£11.99', description: 'EasyAcc Handheld Electric Mini Portable Outdoor Fan with Rechargeable 2600 mAh Battery Foldable Handle Desktop for Home and Travel-Green.', img: 'https://images-na.ssl-images-amazon.com/images/I/61dyJyfbCeL._SY355_.jpg'},
        {brand: 'Aptamil', url: 'https://www.amazon.co.uk/Aptamil-First-Infant-Milk-Starter/dp/B07H32RL92', price: '£23.70', description: 'Aptamil First Infant Milk Starter Pack Pack of 2.', img: 'https://images-na.ssl-images-amazon.com/images/I/51PmDv45mDL.jpg'},
        {brand: 'John Lewis and Partners', url: 'https://www.johnlewis.com/john-lewis-partners-baby-gots-organic-cotton-giraffe-sleepsuit-pack-of-3-multi/p4255145', price: '£14.00', description: 'John Lewis & Partners Baby GOTS Organic Cotton Giraffe Sleepsuit, Pack of 3, Multi.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/003943837?$rsp-pdp-port-640$'},
        {brand: 'John Lewis and Partners', url: 'https://www.johnlewis.com/john-lewis-partners-baby-gots-organic-cotton-short-sleeve-bodysuits-pack-of-5-white/p3170382', price: '£9.00', description: 'John Lewis & Partners Baby GOTS Organic Cotton Short Sleeve Bodysuits, Pack of 5, White.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/002955086?$rsp-pdp-port-640$'},
        {brand: 'M & S', url: 'https://www.marksandspencer.com/pure-cotton-hooded-chunky-knit-cardigan/p/p60164774', price: '£12', description: 'Pure Cotton Hooded Chunky Knit Cardigan.', img: 'https://asset1.cxnmarksandspencer.com/is/image/mands/Pure-Cotton-Hooded-Chunky-Knit-Cardigan-2/SD_04_T78_6501T_T1_X_EC_0?$PDP_INT_IMAGEGRID_1_LG$'},
        {brand: 'John Lewis and Partners', url: 'https://www.johnlewis.com/grobag-swaddle-blanket-pack-of-2-white/p3310657', price: '£19.99', description: 'Grobag Swaddle Blanket, Pack of 2, White.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/236972855?$rsp-pdp-port-640$'},
        {brand: 'LOONFREE', url: 'https://www.amazon.co.uk/Nursing-Breast-Pads-Washable-Absorbent/dp/B07Q79NTLS', price: '£??', description: 'Nursing Breast Pads - Washable Breast Pads, 14 PCS.', img: 'https://images-na.ssl-images-amazon.com/images/I/719UU55mjEL._SY355_.jpg'}
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
