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
      isEdit: false,
      // reserved: [
      //   {productId: "12345678", quantity: 1, userName: "Andrew Mike", message: "Happy birthday!", productUrl: 'https://www.amazon.co.uk/dp/B01H24LM58', imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81qYpf1Sm2L._SX679_.jpg'},
      //   {productId: "abcdefg", quantity: 1, userName: "Test User", message: "Hope you have a great day.", productUrl: 'https://www.amazon.co.uk/dp/B07PN49Q4S', imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51oQcQG0CKL._SX355_.jpg'},
      //   {productId: "987654321", quantity: 1, userName: "Joe Smith", message: "Happy 2nd birthday. I hope you get great use for this, just like we did with our 8 children.", productUrl: 'https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291', imageUrl: 'https://johnlewis.scene7.com/is/image/JohnLewis/237457570?$rsp-pdp-port-640$'}
      // ]
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
    // let response;
    // try {
    //   console.log("Calling list API ")
    //   response = await API.get("lists", "/" + this.props.match.params.id);
    //   console.log("Got details for list " + response.list.title)
    // } catch (e) {
    //   console.log("List ID " + this.props.match.params.id + " does not exist for the user.")
    //   this.props.history.push('/error/' + this.props.match.params.id);
    // }

    let response = {
        "list": {
          "listId":"17fba9e4-a75d-4275-931f-85555c5e581b",
          "title":"My First List",
          "description":"A description",
          "occasion":"Christmas",
          "imageUrl":"https://test.ewelists.com/images/christmas-default.jpg",
          "eventDate":"06 November 2019"
        },
        "products":{
          "12345678-prod-0001-1234-abcdefghijkl": {"productId":"12345678-prod-0001-1234-abcdefghijkl","quantity":1,"reserved":0,"type":"products"},
          "12345678-prod-0002-1234-abcdefghijkl": {"productId":"12345678-prod-0002-1234-abcdefghijkl","quantity":3,"reserved":3,"type":"products"},
          "12345678-prod-0003-1234-abcdefghijkl": {"productId":"12345678-prod-0003-1234-abcdefghijkl","quantity":1,"reserved":1,"type":"products"}
        },
        "reserved": [
            {
              "productId": "12345678-prod-0002-1234-abcdefghijkl",
              "message":	"A test message",
              "name":	"Alex Burgess",
              "reserved":	3,
              "reservedAt":	1573739584,
              "userId": "6086f845-7f05-42e2-bd23-c97faf909055"
            },
            {
              "productId": "12345678-prod-0003-1234-abcdefghijkl",
              "message":	"A test message",
              "name":	"Alex Burgess",
              "reserved":	1,
              "reservedAt":	1573739584,
              "userId": "6086f845-7f05-42e2-bd23-c97faf909055"
            }
        ],
        "shared": {
          "6086f845-7f05-42e2-bd23-c97faf909055": {"name": "Alex Burgess","email": "burgess.alexander@gmail.com"},
          "12345678-user-0004-1234-abcdefghijkl": {"name": "Test User2","email": "burgess.alexander+test2@gmail.com"}
        }
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
  }

  async getProductDetails() {

    let products = this.state.products;
    for (var key in products) {
      console.log('key name: ', key);

      let product = products[key];
      console.log('Quantity: ', product.quantity )

      if (product.type == 'products') {
        try {
          const response = await this.getProductFromProducts(product);

          this.setState({
            products: update(this.state.products, {
              [key]: {
                brand: {$set: response.brand},
                details: {$set: response.details},
                imageUrl: {$set: response.imageUrl},
                productUrl: {$set: response.productUrl}
              }
            })
          })
        } catch (e) {
          console.log("Could not find a product in the products table for Id: " + product.productId)
        }
      } else if (product.type == 'notfound'){
        try {
          const response = await this.getProductFromNotFound(product);

          this.setState({
            products: update(this.state.products, {
              [key]: {
                brand: {$set: response.brand},
                details: {$set: response.details},
                imageUrl: {$set: config.imagePrefix + '/images/product-default.jpg'},
                productUrl: {$set: response.productUrl}
              }
            })
          })
        } catch (e) {
          console.log("Could not find a product in the notfound table for Id: " + product.productId)
        }
      } else {
        console.log("Product (" + product.productId + ") had an unrecognised type (" + product.type + "), could not get details.");
      }
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

    // Change the image url based on the target value
    let occasion = event.target.value;
    let imageUrl;
    if (occasion === 'Christmas') {
      imageUrl = config.imagePrefix + '/images/christmas-default.jpg';
    } else {
      imageUrl = config.imagePrefix + '/images/celebration-default.jpg';
    }

    this.setState({ imageUrl: imageUrl });
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
