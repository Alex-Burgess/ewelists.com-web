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
import update from 'immutability-helper';
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import FooterLarge from "components/Footer/FooterLarge.jsx";
// sections for this page
import SectionList from "./Sections/SectionList.jsx";
import SectionListDetails from "./Sections/ListDetails.jsx";

import config from 'config.js';
import articlePageStyle from "assets/jss/material-kit-pro-react/views/viewListPageStyle.jsx";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      title: '',
      description: '',
      occasion: '',
      date: '',
      imageUrl: ''
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    await this.getListDetails();
    await this.getProductDetails();

    this.setState({ loaded: true });
  }

  async getListDetails() {
    let response;
    try {
      console.log("Calling list API ")
      response = await API.get("lists", "/" + this.props.match.params.id);
      console.log("Got details for list " + response.list.title)
    } catch (e) {
      console.log("List ID " + this.props.match.params.id + " does not exist for the user.")
      this.props.history.push('/error/' + this.props.match.params.id);
    }

    // Update list details
    this.setState({
      title: response.list.title,
      description: response.list.description,
      occasion: response.list.occasion,
      imageUrl: response.list.imageUrl
    });

    if (('eventDate' in response.list) && (response.list.eventDate !== 'None')) {
      this.setState({
        date: response.list.eventDate
      });
    } else {
      this.setState({
        date: ''
      });
    }

    // // Update product details
    // let products = this.state.products;
    // for (var key in products) {
    //   let product = products[key];
    // // for (let product of response.products) {
    //   let product_obj = {
    //     productId: product.productId,
    //     quantity: product.quantity,
    //     reserved: product.reserved,
    //     type: product.type,
    //     brand: '',
    //     details: '',
    //     imageUrl: ''
    //   };
    //
    //   this.setState({
    //     products: this.state.products.concat(product_obj)
    //   })
    //
    // }
    this.setState({
      products: response.products,
      // reserved: response.reserved,
      // shared: response.shared
    })
  }

  // Need to get type from list product
  async getProductDetails() {
    let products = this.state.products;
    for (var key in products) {
      let product = products[key];
      let response;
      let imageUrl = config.imagePrefix + '/images/product-default.jpg'

      if (product.type == 'products') {
        try {
          response = await API.get("products", "/" + product.productId);
          imageUrl = response.imageUrl;
        } catch (e) {
          console.log("Could not find a product in the products table for Id: " + product.productId)
        }
      } else if (product.type == 'notfound'){
        try {
          response = await API.get("notfound", "/" + product.productId);
        } catch (e) {
          console.log("Could not find a product in the notfound table for Id: " + product.productId)
        }
      } else {
        console.log("Product (" + product.productId + ") had an unrecognised type (" + product.type + "), could not get details.");
      }

      this.setState({
        products: update(this.state.products, {
          [key]: {
            brand: {$set: response.brand},
            details: {$set: response.details},
            imageUrl: {$set: imageUrl},
            productUrl: {$set: response.productUrl}
          }
        })
      })
    }
  }

  async getProductFromProducts(product) {
    let response;
    try {
      console.log("Getting product: " + product.productId);
      response = await API.get("products", "/" + product.productId);
    } catch (e) {
      console.log("List ID " + this.props.match.params.id + " does not exist for the user.")
    }

    return response
  }

  async getProductFromNotFound(product) {
    let response;
    try {
      console.log("Getting product: " + product.productId);
      response = await API.get("notfound", "/" + product.productId);
    } catch (e) {
      console.log("List ID " + this.props.match.params.id + " does not exist for the user.")
    }

    return response
  }

  updateReservedQuantity(reservedQuantity, product) {
    let products = this.state.products;
    let productId = product['productId'];
    const new_reserved_quantity = products[productId].reserved + reservedQuantity;
    console.log("Reserved quantity increasing from " + product['reserved'] + " to " + new_reserved_quantity);

    this.setState({
      products: update(this.state.products, {
        [product['productId']]: {
          reserved: {$set: reservedQuantity}
        }
      })
    })
  }

  getListId(){
    return this.props.match.params.id
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.loaded
          ? <div>
              <Header
                brand="ewelists"
                links={<HeaderLinksAuth dropdownHoverColor="info" />}
                fixed
                color="transparent"
                 changeColorOnScroll={{
                   height: 200,
                   color: "info"
                 }}
              />
              <Parallax verySmall filter="info" className={classes.articleBg}>
              </Parallax>
              <div className={classes.main}>
                <SectionListDetails
                  title={this.state.title}
                  description={this.state.description}
                  occasion={this.state.occasion}
                  date={this.state.date}
                  imageUrl={this.state.imageUrl}
                />
                <SectionList
                  products={this.state.products}
                  getListId={this.getListId.bind(this)}
                  updateReservedQuantity={this.updateReservedQuantity.bind(this)}
                />
              </div>
              <div className={classes.spacer}>
              </div>
              <FooterLarge />
            </div>
          : null
        }
      </div>
    );
  }
}

ArticlePage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(articlePageStyle)(ArticlePage);
