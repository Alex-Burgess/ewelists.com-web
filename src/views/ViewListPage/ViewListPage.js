import React from "react";
import update from 'immutability-helper';
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import HeaderScroll from "custom/Header/HeaderScroll.js";
import Parallax from "components/Parallax/Parallax.js";
import FooterDark from "custom/Footer/FooterDark.js";
// sections for this page
import SectionProducts from "./Sections/Products.js";
import SectionListDetails from "./Sections/ListDetails.js";

import config from 'config.js';
import viewListPageStyle from "assets/jss/custom/views/viewListPage/viewListPageStyle.js";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      title: '',
      description: '',
      occasion: '',
      date: '',
      imageUrl:  ''
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const gotList = await this.getListDetails();

    if (gotList){
        await this.getProductDetails();
        this.setState({ loaded: true });
    }
  }

  async getListDetails() {
    let response;
    try {
      console.log("Calling list API ")
      response = await API.get("lists", "/" + this.props.match.params.id + "/shared");
      console.log("Got details for list " + response.list.title)
    } catch (e) {
      console.log("List ID " + this.props.match.params.id + " does not exist for the user.")
      this.props.history.push('/error/' + this.props.match.params.id);
      return false
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

    this.setState({
      products: response.products,
      reserved: response.reserved
    })

    // console.log("reserved: " + JSON.stringify(response.reserved))

    return true
  }

  // Need to get type from list product
  async getProductDetails() {
    let products = this.state.products;
    for (var key in products) {
      let product = products[key];
      let response;
      let imageUrl = config.imagePrefix + '/images/product-default.jpg'

      if (product.type === 'products') {
        try {
          response = await API.get("products", "/" + product.productId);
          imageUrl = response.imageUrl;
        } catch (e) {
          console.log("Could not find a product in the products table for Id: " + product.productId)
        }
      } else if (product.type === 'notfound'){
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

  async updateReservedQuantity(reservedQuantity, product) {
    let products = this.state.products;
    let productId = product['productId'];
    let userId = this.props.userSub;
    const new_reserved_quantity = products[productId].reserved + reservedQuantity;
    console.log("Reserved quantity increasing from " + product['reserved'] + " to " + new_reserved_quantity);

    let userReservedObject = {
      [userId] : {
        productId: productId,
        quantity: reservedQuantity,
        userId: userId,
      }
    }

    await this.setState({
      reserved: update(this.state.reserved, {
        [productId]: {$set: userReservedObject}
      })
    })

    // console.log("reserved state: " + JSON.stringify(this.state.reserved));

    console.log("Updated product Id with user reserved details")

    await this.setState({
      products: update(this.state.products, {
        [productId]: {
          reserved: {$set: new_reserved_quantity}
        }
      })
    })
  }

  async unreserveProduct(product) {
    let userId = this.props.userSub;
    let productId = product['productId'];
    console.log("Unreserving product (" + productId + ") for user (" + userId + ")");
    // console.log("reserved state: " + JSON.stringify(this.state.reserved));

    let userReservedQuantity = this.state.reserved[productId][userId].quantity;
    let productTotalReservedQuantity = this.state.products[productId].reserved;
    const reservedQuantity = productTotalReservedQuantity - userReservedQuantity;
    console.log("New product reserved quantity: " + reservedQuantity)

    // Remove reserved entry for product : user.
    await this.setState({
      reserved: update(this.state.reserved, {
        [productId]: {$unset: [userId]}
      })
    })

    // Update product total reserved quantity
    await this.setState({
      products: update(this.state.products, {
        [productId]: {
          reserved: {$set: reservedQuantity}
        }
      })
    })
  }

  async updateUserReservation(newUserQuantity, product) {
    let userId = this.props.userSub;
    let productId = product['productId'];

    let userOldReservedQuantity = this.state.reserved[productId][userId].quantity;
    const quantityChange = newUserQuantity - userOldReservedQuantity
    console.log("Updating product (" + productId + ") reservation for user (" + userId + ") to " + newUserQuantity);

    let productOldReservedQuantity = this.state.products[productId].reserved;
    const productNewReservedQuantity = productOldReservedQuantity + quantityChange
    console.log("Updating product (" + productId + ") total reservered to (" + productNewReservedQuantity + ")");

    // Update reserved quantity for product : user.
    await this.setState({
      reserved: update(this.state.reserved, {
        [productId]: {
          [userId]: {$merge: {
              quantity: newUserQuantity
            }
          }
        }
      })
    })

    // Update product total reserved quantity
    await this.setState({
      products: update(this.state.products, {
        [productId]: {
          reserved: {$set: productNewReservedQuantity}
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
              <HeaderScroll isAuthenticated={true} />
              <Parallax filter="info" className={classes.articleBg}>
              </Parallax>
              <div className={classes.main}>
                <SectionListDetails
                  title={this.state.title}
                  description={this.state.description}
                  occasion={this.state.occasion}
                  date={this.state.date}
                  imageUrl={this.state.imageUrl}
                />
                <SectionProducts
                  products={this.state.products}
                  reserved={this.state.reserved}
                  userId={this.props.userSub}
                  getListId={this.getListId.bind(this)}
                  updateReservedQuantity={this.updateReservedQuantity.bind(this)}
                  unreserveProduct={this.unreserveProduct.bind(this)}
                  updateUserReservation={this.updateUserReservation.bind(this)}
                />
              </div>
              <div className={classes.spacer}>
              </div>
              <FooterDark />
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

export default withStyles(viewListPageStyle)(ArticlePage);
