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
import Palette from "@material-ui/icons/Palette";
import People from "@material-ui/icons/People";
import List from "@material-ui/icons/List";
import Search from "@material-ui/icons/Search";
import Redeem from "@material-ui/icons/Redeem";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import FooterLarge from "components/Footer/FooterLarge.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
// sections for this page
import SectionListDetails from "./Sections/ListDetails.jsx";
import SectionProducts from "./Sections/Products.jsx";
import SectionAddGifts from "./Sections/AddGifts.jsx";
import SectionShare from "./Sections/Share.jsx";
import SectionReserved from "./Sections/Reserved.jsx";

import config from 'config.js';
import articlePageStyle from "assets/jss/material-kit-pro-react/views/viewEditPageStyle.jsx";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      title: '',
      description: '',
      occasion: '',
      date: '',
      imageUrl: '',
      isEdit: false
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
      response = await API.get("lists", "/" + this.props.match.params.id);
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
      imageUrl: response.list.imageUrl,
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
      reserved: response.reserved,
      shared: response.shared
    })

    return true
  }

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

  setEditState = event => {
    this.setState({ isEdit: true });
  }

  cancelEdit = async event => {
    await this.getListDetails();
    this.setState({ isEdit: false });
  }

  saveDetails = async event => {
    try {
      var requestBody = {
        "title": this.state.title,
        "description": this.state.description,
        "eventDate": this.state.date,
        "occasion": this.state.occasion,
        "imageUrl":  this.state.imageUrl,
      };
      const response = await API.put("lists", "/" + this.props.match.params.id, {
        body: requestBody
      });

      if (('eventDate' in response[0].updates) && (response[0].updates.eventDate !== 'None')) {
        this.setState({
          date: response[0].updates.eventDate
        });
      }

      this.setState({
        title: response[0].updates.title,
        description: response[0].updates.description,
        occasionSelect: response[0].updates.occasion,
        isEdit: false
       });
    } catch (e) {
      console.log('Unexpected error occurred when updating list: ' + e.response.data.error);
      this.setState({
        updateError: true,
        updateErrorMessage: 'Unexpected error occurred when updating list.  Please try again.'
      })
    }
  }

  handleChange = event => {
    var updateObj = {};
    updateObj[event.target.id] = event.target.value;
    this.setState( updateObj );
  }

  handleOccasionSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
    let occasion = event.target.value;
    console.log("Setting occasion to: " + occasion)

    const occasion_parsed = occasion.toLowerCase().replace(/\s/g,'');
    let imageUrl = config.imagePrefix + '/images/' + occasion_parsed + '-default.jpg';

    this.setState({ imageUrl: imageUrl });
  };

  changeDate(date) {
    this.setState({ date: date.format('DD MMMM YYYY')});
  }

  deleteProductFromState(id) {
    console.log("Deleting product from list state: " + id);

    this.setState({
      products: update(this.state.products, { $unset: [id] })
    })
  }

  addProductToState(product) {
    this.setState({
      products: {
         ...this.state.products,
         [product['productId']]: product
      }
    });
  }

  updateProductToState(product) {
    console.log("Updating state for product");

    this.setState({
      products: update(this.state.products, {
        [product['productId']]: {
          quantity: {$set: product['quantity']}
        }
      })
    })
  }

  addUserToSharedState(user) {
    this.setState({
      shared: {
         ...this.state.shared,
         [user['email']]: user
      }
    });
  }

  removeUserFromSharedState(user) {
    this.setState({
      shared: update(this.state.shared, { $unset: [user['email']] })
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
              color="info"
              brand="ewelists"
                links={<HeaderLinksAuth dropdownHoverColor="info" />}
                fixed
              />
              <div className={classes.main}>
                <SectionListDetails
                  title={this.state.title}
                  description={this.state.description}
                  occasion={this.state.occasion}
                  date={this.state.date}
                  imageUrl={this.state.imageUrl}
                  isEdit={this.state.isEdit}
                  saveDetails={this.saveDetails.bind(this)}
                  setEditState={this.setEditState.bind(this)}
                  cancelEdit={this.cancelEdit.bind(this)}
                  handleChange={this.handleChange.bind(this)}
                  handleOccasionSelect={this.handleOccasionSelect.bind(this)}
                  changeDate={this.changeDate.bind(this)}
                />
                <div className={classes.profileTabs}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "Manage",
                        tabIcon: List,
                        tabContent: (
                          <div>
                            <SectionProducts
                              products={this.state.products}
                              deleteProductFromState={this.deleteProductFromState.bind(this)}
                              updateProductToState={this.updateProductToState.bind(this)}
                              getListId={this.getListId.bind(this)}
                            />
                          </div>
                        )
                      },
                      {
                        tabButton: "Add Gifts",
                        tabIcon: Search,
                        tabContent: (
                          <div>
                            <SectionAddGifts
                              getListId={this.getListId.bind(this)}
                              addProductToState={this.addProductToState.bind(this)}
                            />
                          </div>
                        )
                      },
                      {
                        tabButton: "Share",
                        tabIcon: People,
                        tabContent: (
                          <div>
                            <SectionShare
                              shared={this.state.shared}
                              getListId={this.getListId.bind(this)}
                              addUserToSharedState={this.addUserToSharedState.bind(this)}
                              removeUserFromSharedState={this.removeUserFromSharedState.bind(this)}
                            />
                          </div>
                        )
                      },
                      {
                        tabButton: "Reserved",
                        tabIcon: Redeem,
                        tabContent: (
                          <div>
                            <SectionReserved
                              reserved={this.state.reserved}
                              products={this.state.products}
                            />
                          </div>
                        )
                      }
                    ]}
                  />
                </div>
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
