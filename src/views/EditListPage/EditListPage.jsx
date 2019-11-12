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

import config from 'config.js';
import articlePageStyle from "assets/jss/material-kit-pro-react/views/viewEditPageStyle.jsx";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      occasion: '',
      date: '',
      isEdit: false,
      products: []
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    await this.getListDetails();
    await this.getProductDetails();

    this.setState({ isLoading: false });
  }

  getListId(){
    return this.props.match.params.id
  }

  // Need to get type from list product
  async getProductDetails() {
    let updated_products = [];
    for (let product of this.state.products) {
      if (product.type == 'products') {
        try {
          const response = await this.getProductFromProducts(product);
          product['brand'] = response.brand;
          product['details'] = response.details;
          product['imageUrl'] = response.imageUrl;
          product['productUrl'] = response.productUrl;
          updated_products.push(product)
        } catch (e) {
          console.log("Could not find a product in the products table for Id: " + product.productId)
        }
      } else if (product.type == 'notfound'){
        try {
          const response = await this.getProductFromNotFound(product);
          product['brand'] = response.brand;
          product['details'] = response.details;
          product['imageUrl'] = config.imagePrefix + '/images/product-default.jpg';
          product['productUrl'] = response.productUrl;
          updated_products.push(product)
        } catch (e) {
          console.log("Could not find a product in the notfound table for Id: " + product.productId)
        }
      } else {
        console.log("Product (" + product.productId + ") had an unrecognised type (" + product.type + "), could not get details.");
      }
    }

    this.setState({
      products: updated_products
    })
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
      occasion: response.list.occasion
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

    // Update product details
    console.log("Product: " + response.products[0].productId);

    for (let product of response.products) {
      let product_obj = {
        productId: product.productId,
        quantity: product.quantity,
        reserved: product.reserved,
        type: product.type,
        brand: '',
        details: '',
        imageUrl: ''
      };

      this.setState({
        products: this.state.products.concat(product_obj)
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
        "occasion": this.state.occasion
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
  };

  changeDate(date) {
    this.setState({ date: date.format('DD MMMM YYYY')});
  }

  deleteProductFromState(id) {
    console.log("Deleting product from list state: " + id);

    let index;
    let count = 0;
    for (let product of this.state.products) {
      if (product['productId'] == id) {
        index = count;
      }
      count = count + 1;
    }

    const filteredArray = this.state.products.filter((_, i) => i !== index);
    this.setState({
      products: filteredArray
    });
  }

  addProductToState(product) {
    var updatedProducts = this.state.products.concat(product);
    this.setState({ products: updatedProducts })
  }

  updateProductToState(updateProduct) {
    console.log("Updating state for product");

    let count = 0;
    for (let product of this.state.products) {
      if (product['productId'] == updateProduct['productId']) {
        console.log("Updating quantity (" + updateProduct['quantity'] + ")for product array obj (" + count + ")");
        this.setState({
          products: update(this.state.products, {[count]: {quantity: {$set: updateProduct['quantity']}}})
        })

      }
      count = count + 1;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
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
                  tabButton: "Manage List",
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
                      <SectionShare />
                    </div>
                  )
                }
              ]}
            />
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
