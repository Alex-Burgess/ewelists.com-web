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
import React from "react";
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
import Search from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import styles from "assets/jss/material-kit-pro-react/views/editListSections/addGiftsStyle.jsx";
import config from 'config.js';

class SectionAddGifts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      searchUrl: '',
      searchResult: '',
      productFound: '',
      foundQuantity: 1,
      notfoundQuantity: 1,
      notfound: {
        quantity: 1,
        brand: '',
        details: '',
        url: ''
      },
      errorMessage: '',
      message: ''
    };
  }

  componentWillMount() {
    if (window.innerWidth < 600){
      this.setState({ desktop: false });
    } else {
      this.setState({ desktop: true });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });

    if (window.innerWidth < 600){
      this.setState({ desktop: false });
    } else {
      this.setState({ desktop: true });
    }
  };

  increaseQuantity(type){
    var quantity = this.state[type];
    quantity = quantity + 1;
    this.setState({ [type]: quantity})
  }

  decreaseQuantity(type){
    var quantity = this.state[type];

    if (quantity > 1) {
      quantity = quantity - 1;
    }

    this.setState({ [type]: quantity})
  }

  searchProduct = async event => {
    let response;

    try {
      response = await API.get("products", "/url/" + encodeURIComponent(this.state.searchUrl));
    } catch (e) {
      console.log('Unexpected error occurred when searching for product: ' + e);
      this.setState({ errorMessage: 'Product could not be found.'});
      return false
    }

    if (response.product.productId) {
      console.log("Retrieved product: " + response.product.productId);
      let product = {
        productId: response.product.productId,
        brand: response.product.brand,
        details: response.product.details,
        productUrl: response.product.productUrl,
        imageUrl: response.product.imageUrl,
      }
      this.setState({
        searchResult: true,
        productFound: true,
        product: product,
        errorMessage: '',
        message: ''
      })
    } else {
      console.log("No product found.");
      this.setState({
        searchResult: true,
        productFound: false,
        errorMessage: '',
        message: ''
      })
    }
  }

  addProductToList = async event => {
    let list_id = this.props.getListId()
    console.log("adding product (" + this.state.product.productId + ") to list: (" + list_id + ")");

    let addDetails = {
      "quantity": this.state.foundQuantity,
      "productType": "products"
    };

    let response;

    try {
      response = await API.post("lists", "/" + list_id + "/product/" +  this.state.product.productId, {
        body: addDetails
      });
    } catch (e) {
      console.log('Error message: ' + e.response.data.error);

      if (e.response.data.error === 'Product already exists in list.') {
        this.setState({ errorMessage: 'Product already exists in your list.  If you wanted to change the quantity for this product, you can do this in Manage List.'});
      } else {
        this.setState({ errorMessage: 'Product could not be added to your list.'});
      }


      return false
    }

    console.log("Add response: " + response.message);

    let product = {
      productId: this.state.product.productId,
      quantity: this.state.foundQuantity,
      reserved: 0,
      brand: this.state.product.brand,
      details: this.state.product.details,
      type: this.state.product.type,
      productUrl: this.state.product.productUrl,
      imageUrl: this.state.product.imageUrl
    }

    this.props.addProductToState(product)
    this.setState({ message: 'Product was added to your list.'});
  }

  createProduct = async event => {
    let createResponse;
    let requestBody = {
      "brand": this.state.notfound.brand,
      "details": this.state.notfound.details,
      "url": this.state.notfound.url,
    };

    try {
      createResponse = await API.post("notfound", "/", { body: requestBody });
    } catch (e) {
      console.log('Unexpected error occurred when creating product: ' + e);
      this.setState({ errorMessage: 'Product could not be added to your list.'});
      return false
    }

    console.log("created product: " + createResponse.productId);

    // Update list with new product id
    let list_id = this.props.getListId()
    let addDetails = {
      "quantity": this.state.notfoundQuantity,
      "productType": "notfound"
    };

    let updateListResponse;

    try {
      updateListResponse = await API.post("lists", "/" + list_id + "/product/" +  createResponse.productId, {
        body: addDetails
      });
    } catch (e) {
      console.log('Unexpected error occurred when adding product to list: ' + e.updateListResponse.data.error);
      this.setState({ errorMessage: 'Product could not be added to your list.'});
      return false
    }

    console.log("Add response: " + updateListResponse.message);

    // Update state
    var product = {
      productId: createResponse.productId,
      brand: this.state.notfound.brand,
      details: this.state.notfound.details,
      type: this.state.notfound.type,
      url: this.state.notfound.url,
      imageUrl: config.imagePrefix + '/images/product-default.jpg',
      quantity: this.state.notfoundQuantity,
      reserved: 0
    }

    this.props.addProductToState(product)
    this.setState({ message: 'Product was added to your list.'});
  }

  handleSearchChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateSearchForm(){
    return (
      this.state.searchUrl.length > 0 &&
      this.state.searchUrl.startsWith("http")
    );
  }

  handleAddGiftChange = event => {
    const id = event.target.id;
    const val = event.target.value;

    this.setState(prevState => ({
      notfound: {
        ...prevState.notfound,
        [id]: val
      }
    }))
  }

  validateNotFoundForm(){
    return (
      this.state.notfound.brand.length > 0 &&
      this.state.notfound.details.length > 0 &&
      this.state.notfound.url.length > 0 &&
      this.state.notfound.url.startsWith("http")
    );
  }

  renderManualAdd(classes) {
    return (
      <GridContainer>
        <GridItem xs={12} sm={7} md={7} lg={7}
          className={classes.mrAuto + " " + classes.mlAuto}
        >
          <h5>
            We don't currently have any details for this product. Add the item with some basic details below and we'll update the item a.s.a.p.
          </h5>
          <form className={classes.form}>
            <CustomInput
              labelText="Brand"
              id="brand"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.handleAddGiftChange
              }}
            />
            <CustomInput
              labelText="Details"
              id="details"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.handleAddGiftChange
              }}
            />
            <CustomInput
              labelText="Link"
              id="url"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.handleAddGiftChange
              }}
            />
            <div className={classes.textCenter}>
              <Button color="primary" size="sm" simple onClick={() => this.decreaseQuantity("notfoundQuantity")}>
                <Remove />
              </Button>
              {` `}{this.state.notfoundQuantity}{` `}
              <Button color="primary" size="sm" simple onClick={() => this.increaseQuantity("notfoundQuantity")}>
                <Add />
              </Button>
            </div>
            <div className={classes.textCenter}>
              <Button round color="primary" onClick={() => this.createProduct()} disabled={!this.validateNotFoundForm()}>
                Add to list
              </Button>
            </div>
          </form>
        </GridItem>
      </GridContainer>
    )
  }

  renderMobileSearchResultTable(classes){
    return (
      <Table
          tableHead={[
            "",
            ""
          ]}
          tableData={[
            [
              <div className={classes.textCenter}>
                <div className={classes.imgContainer}>
                  <a href={this.state.product.productUrl} target="_blank" rel="noopener noreferrer">
                    <img src={this.state.product.imageUrl} alt="..." className={classes.img} />
                  </a>
                </div>
                <a href={this.state.product.productUrl} target="_blank" rel="noopener noreferrer" className={classes.tdNameAnchor}>
                  {this.state.product.brand}
                </a>
                <br />
                <small className={classes.tdNameSmall}>
                  {this.state.product.details}
                </small>
              </div>,
              <div className={classes.textCenter}>
              <span>
                <Button color="primary" size="sm" simple onClick={() => this.decreaseQuantity("foundQuantity")}>
                  <Remove />
                </Button>
                {` `}{this.state.foundQuantity}{` `}
                <Button color="primary" size="sm" simple onClick={() => this.increaseQuantity("foundQuantity")}>
                  <Add />
                </Button>
              </span>
              <Button default size="sm" color="primary" className={classes.reserveButton}>
                Add to list
              </Button>
              </div>

            ],
            {
              addnew: true,
              colspan: "1",
              col: {
                colspan: 1,
              }
            }
          ]
          }
          tableShopping
          customHeadCellClasses={[
            classes.textCenter
          ]}
          customHeadClassesForCells={[2]}
          customCellClasses={[
            classes.tdName
          ]}
          customClassesForCells={[1]}
        />
    )
  }

  renderDesktopSearchResultTable(classes){
    return (
      <Table
          tableHead={[
            "",
            "",
            "",
            ""
          ]}
          tableData={[
            [
              <div className={classes.imgContainer}>
                <a href={this.state.product.productUrl} target="_blank" rel="noopener noreferrer">
                  <img src={this.state.product.imageUrl} alt="..." className={classes.img} />
                </a>
              </div>,
              <span key={1}>
                <a href={this.state.product.productUrl} target="_blank" rel="noopener noreferrer" className={classes.tdNameAnchor}>
                  {this.state.product.brand}
                </a>
                <br />
                <small className={classes.tdNameSmall}>
                  {this.state.product.details}
                </small>
              </span>,
              <span>
                <Button color="primary" size="sm" simple onClick={() => this.decreaseQuantity("foundQuantity")}>
                  <Remove />
                </Button>
                {` `}{this.state.foundQuantity}{` `}
                <Button color="primary" size="sm" simple onClick={() => this.increaseQuantity("foundQuantity")}>
                  <Add />
                </Button>
              </span>,
              <Button default color="primary" className={classes.reserveButton} onClick={() => this.addProductToList()}>
                Add to list
              </Button>
            ],
            {
              addnew: true,
              colspan: "2",
              col: {
                colspan: 2,
              }
            }
          ]
          }
          tableShopping
          customHeadCellClasses={[
            classes.textCenter
          ]}
          customHeadClassesForCells={[2]}
          customCellClasses={[
            classes.tdName
          ]}
          customClassesForCells={[1]}
        />
    )
  }

  renderSearchResultTable(classes) {
    return (
      <Card plain>
          <CardBody plain>
      {
        this.state.desktop
        ? this.renderDesktopSearchResultTable(classes)
        : this.renderMobileSearchResultTable(classes)
      }
      </CardBody>
    </Card>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={10} lg={9}
              className={classes.mrAuto + " " + classes.mlAuto}
            >
              <div className={classes.textCenter}>
                <CustomInput
                  id="searchUrl"
                  formControlProps={{
                    fullWidth: false,
                    className: classes.customFormControl
                  }}
                  inputProps={{
                    placeholder: "Enter url...",
                    onChange: this.handleSearchChange
                  }}
                />
                <Button color="primary" justIcon onClick={() => this.searchProduct()} disabled={!this.validateSearchForm()}>
                  <Search />
                </Button>
              </div>
              {this.state.searchResult
                ? this.state.productFound
                  ? this.renderSearchResultTable(classes)
                  : this.renderManualAdd(classes)
                : null
              }
              {this.state.errorMessage
                ?
                  <div className={classes.errorContainer}>
                    {this.state.errorMessage}
                  </div>
                : null
              }
              {this.state.message
                ?
                  <div className={classes.messageContainer}>
                    {this.state.message}
                  </div>
                : null
              }
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

SectionAddGifts.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(SectionAddGifts);
