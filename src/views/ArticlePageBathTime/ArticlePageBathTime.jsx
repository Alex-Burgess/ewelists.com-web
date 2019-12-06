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
      title: 'Bath Time',
      subtitle: 'What to buy for your bathing your baby.',
      backgroundImg: 'bathtime.jpg',
      similarArticles: [
        {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
        description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
        {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
        description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
        {category: "NURSERY", title: "The Nursery List", url: "/listideas/nursery", img: 'nurserylist.jpg',
        description_short: "What to buy for your baby’s bedroom."}
      ],
      shopTheStory: [
        {brand: 'John Lewis & Partners', url: 'https://www.johnlewis.com/john-lewis-partners-safari-hooded-towel-and-mitt-white/p3382355', price: '£16.50', description: 'Safari Hooded Towel and Mitt, White.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/237170008?$rsp-pdp-port-640$'},
        {brand: 'Aveeno Baby', url: 'https://www.amazon.co.uk/Aveeno-Baby-Daily-Care-Cleansing/dp/B01IW7YMDS', price: '£8.04', description: 'Daily Care Cleansing Milk, 300 ml.', img: 'https://images-na.ssl-images-amazon.com/images/I/81rlToC4wtL._SX466_.jpg'},
        {brand: 'The Neat Nursery', url: 'https://www.amazon.co.uk/Neat-Nursery-Circular-Tail-Bowl/dp/B00JYD5SEM', price: '£8.93', description: 'Top \'N\' Tail Bowl.', img: 'https://images-na.ssl-images-amazon.com/images/I/41pXNAHISzL._SX355_.jpg'},
        {brand: 'The Gro Company', url: 'https://www.amazon.co.uk/Company-Groegg-Colour-Changing-Thermometer/dp/B002B55BN8', price: '£13.00', description: 'Groegg Colour Changing Room Thermometer.', img: 'https://images-na.ssl-images-amazon.com/images/I/71-jBXjqKLL._SY450_.jpg'},
        {brand: 'Angelcare', url: 'https://www.amazon.co.uk/Angelcare-Soft-Touch-Bath-Support/dp/B00AWMV9CY', price: '£18.00', description: 'Soft Touch Bath Support.', img: 'https://images-na.ssl-images-amazon.com/images/I/618eOZJh3UL._SY355_.jpg'},
        {brand: 'Little Gubbins', url: 'https://www.amazon.co.uk/Microfibre-Little-Gubbins-Unscented-Multipack/dp/B07CL34YN2', price: '£12.99', description: '20 x Microfibre Baby Wipes.  Pack of Reusable, Washable, Dry, Unscented Cloths.', img: 'https://images-na.ssl-images-amazon.com/images/I/91Kufu2PC3L._SY355_.jpg'},
        {brand: 'Anlass', url: 'https://www.amazon.co.uk/Anlass-Cartoon-Resistant-Children-Octopus/dp/B01M0SVFIR', price: '£8.99', description: 'Kids Cartoon Non Slip Mats Mildew Resistant Non Slip Mats for Children.', img: 'https://images-na.ssl-images-amazon.com/images/I/81tok-F7cHL._SY355_.jpg'},
        {brand: 'Mamas & Papas', url: 'https://www.amazon.co.uk/Mamas-Papas-Bambino-Support-Positions/dp/B00104WAX0', price: '27.00', description: 'Acqua Bambino Two Stage Bath with Safety Support Positions for Newborn to 12 Months, Pearl White.', img: 'https://images-na.ssl-images-amazon.com/images/I/51Q-eU%2BO7HL._SX355_.jpg'},
        {brand: 'Safety 1st', url: 'https://www.amazon.co.uk/Safety-1st-Swivel-Bath-Primary/dp/B00CMR3H0O', price: '£14.99', description: 'Safety 1st Swivel Bath Seat, Primary.', img: 'https://images-na.ssl-images-amazon.com/images/I/71Odw7SbXgL._SL1500_.jpg'},
        {brand: 'BBLIKE', url: 'https://www.amazon.co.uk/BBLIKE-Windmill-Waterwheel-Swimming-Toddlers/dp/B07N1GCJJC', price: '£11.99', description: 'Baby Bath Time Fun Toys, Kids Bath Toys Tub Windmill Waterwheel.', img: 'https://images-na.ssl-images-amazon.com/images/I/7171Lf4QkaL._SX466_.jpg'},
        {brand: 'Childs Farm', url: 'https://www.amazon.co.uk/Childs-Farm-baby-unfragranced-250ml/dp/B071WJNHTC', price: '£2.99', description: 'Childs Farm baby wash unfragranced 250ml.', img: 'https://images-na.ssl-images-amazon.com/images/I/71YDUJqEyAL._SX522_.jpg'},
        {brand: 'Childs Farm', url: 'https://www.amazon.co.uk/Childs-Farm-moisturiser-cocoa-butter/dp/B072JSY3SJ', price: '£2.99', description: 'Childs Farm Baby Moisturiser, 250ml, Shea and Cocoa Butter.', img: 'https://images-na.ssl-images-amazon.com/images/I/71v3zBEPpBL._SX466_.jpg'},
        {brand: 'Calypso', url: 'https://www.amazon.co.uk/Calypso-31200029-Natural-sponges/dp/B0721K3HR5', price: '£2.45', description: 'Naturl Sponges.', img: 'https://images-na.ssl-images-amazon.com/images/I/71C-kkCf%2BmL._SX679_.jpg'}
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
