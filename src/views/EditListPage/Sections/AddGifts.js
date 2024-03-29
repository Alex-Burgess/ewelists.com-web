import React, { useState } from 'react';
// libs
import { useAppContext } from "libs/contextLib";
import { addToList, createProduct, searchByUrl, queryMetadata } from "libs/apiLib";
import { debugError } from "libs/errorLib";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
// @material-ui icons
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Input from "components/Input/CustomInput.js";
import Table from "components/Table/Table.js";
import Button from "components/Buttons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ErrorText from "components/Typography/Error.js";

import config from 'config.js';

import styles from "assets/jss/material-kit-pro-react/views/editListPage/addGiftsStyle.js";
const useStyles = makeStyles(styles);


export default function SectionAddGifts(props) {
  const classes = useStyles();
  const { breakpoint } = useAppContext();
  const { listId, addProductToState, setActive } = props;

  const [error, setError] = useState('');
  const [searchResult, setSearchResult] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [showSearchResultMessage, setShowSearchResultMessage] = useState(false);
  const [listUpdated, setListUpdated] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  // data
  const [searchUrl, setSearchUrl] = useState('');
  const [addUrl, setAddUrl] = useState('');
  const [notes, setNotes] = useState('');
  // Notfound state
  const [notFoundBrand, setNotFoundBrand] = useState('');
  const [notFoundDetails, setNotFoundDetails] = useState('');
  const [notFoundQuantity, setNotFoundQuantity] = useState(1);
  // product state
  const [productId, setProductId] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);

  const decreaseProductQuantity = () => {
    var quantity = productQuantity;

    if (quantity > 1) {
      quantity = quantity - 1;
    }

    setProductQuantity(quantity);
  }

  const decreaseNotFoundQuantity = () => {
    var quantity = notFoundQuantity;

    if (quantity > 1) {
      quantity = quantity - 1;
    }

    setNotFoundQuantity(quantity);
  }

  const clear = () => {
    setSearchResult(false);
    setShowSearchResultMessage(false);
    setSearchUrl('');
    setAddUrl('');
    setNotes('');
    setNotFoundBrand('');
    setNotFoundDetails('');
    setNotFoundQuantity(1);
    setProductId('');
    setProductBrand('');
    setProductDetails('');
    setProductPrice('');
    setProductImageUrl('');
    setProductQuantity(1);
  }

  const switchForm = () => {
    setSearchSuccess(false);
    setShowSearchResultMessage(false);
  }

  const searchProduct = async event => {
    setError('');
    setIsSearching(true);

    if (searchUrl.length === 0){
      return false
    }

    let product;
    let url = parseUrl(searchUrl);

    try {
      const response = await searchByUrl(url);
      product = response.product;
    } catch (e) {
      setError('There was an unexpected error.');
      setIsSearching(false);
      return false
    }

    if (product.productId) {
      debugError("Url found in products table: " + url);
      setSearchSuccess(true);
      setProductId(product.productId);
      setProductBrand(product.brand);
      setProductDetails(product.details);
      setProductPrice(product.price);
      setAddUrl(product.productUrl);
      setProductImageUrl(product.imageUrl);
    } else {
      debugError("Url not found in products table: " + url);

      let metadata;
      try {
        metadata = await queryMetadata(url);
      } catch (e) {
        setIsSearching(false);
        // return false
      }

      if (! metadata) {
        debugError("Url check issue: " + url);
        setAddUrl(url);
        setSearchSuccess(false);
        setShowSearchResultMessage(true);
      }
      else if (metadata.title && metadata.site_name && metadata.image) {
        debugError("Url data found: " + url);
        debugError("Metadata: " + JSON.stringify(metadata));
        setSearchSuccess(true);
        setProductBrand(metadata.site_name || '');
        setProductDetails(metadata.title || '');
        setProductPrice(metadata.price || '');
        setAddUrl(url);
        setProductImageUrl(metadata.image || '');
      } else {
        debugError("Notfound url: " + url);
        setAddUrl(url);
        setSearchSuccess(false);
        setShowSearchResultMessage(true);
      }
    }

    setSearchResult(true);
    setListUpdated(false);
    setIsSearching(false);
    setError('');
  }

  const addProductToList = async event => {
    setIsAdding(true);
    setError('');
    let id = productId;
    let type = 'products';

    if (productId.length === 0) {
      let createResponse;

      try {
        createResponse = await createProduct(productBrand, productDetails, addUrl, productImageUrl, productPrice);
        debugError("created product: " + createResponse.productId);
        id = createResponse.productId;
        type = 'notfound';
      } catch (e) {
        setError('Product could not be added to your list.');
        setIsAdding(false);
        return false
      }
    }

    debugError("adding product (" + id + ") to list: (" + listId + ")");
    try {
      const response = await addToList(listId, id, productQuantity, type, notes)
      debugError("Add response: " + response.message);
    } catch (e) {
      if (e.response.data.error === 'Product already exists in list.') {
        setError('Product already exists in your list.  You can change the quantity in Manage List.');
      } else {
        setError('Product could not be added to your list.');
      }

      setIsAdding(false);
      return false
    }

    let product = {
      productId: id,
      quantity: productQuantity,
      reserved: 0,
      purchased: 0,
      price: productPrice,
      brand: productBrand,
      details: productDetails,
      type: type,
      productUrl: addUrl,
      imageUrl: productImageUrl
    }

    addProductToState(product)
    setIsAdding(false);
    setListUpdated(true);
    clear();
    setActive(0);
  }

  // Creates gift in notfound table and adds to list
  const createGift = async event => {
    setIsAdding(true);
    setError('');

    let createResponse;

    try {
      createResponse = await createProduct(notFoundBrand, notFoundDetails, addUrl);
      debugError("created product: " + createResponse.productId);
    } catch (e) {
      setError('Product could not be added to your list.');
      setIsAdding(false);
      return false
    }

    // Update list with new product id
    try {
      const updateListResponse = await addToList(listId, createResponse.productId, notFoundQuantity, "notfound", notes)
      debugError("Add response: " + updateListResponse.message);
    } catch (e) {
      setError('Product could not be added to your list.');
      setIsAdding(false);
      return false
    }

    // Update state
    var product = {
      productId: createResponse.productId,
      brand: notFoundBrand,
      details: notFoundDetails,
      type: 'notfound',
      url: addUrl,
      imageUrl: config.imagePrefix + '/images/product-default.jpg',
      quantity: notFoundQuantity,
      reserved: 0,
      purchased: 0
    }

    addProductToState(product)
    setIsAdding(false);
    setListUpdated(true);
    clear();
    setActive(0);
  }

  const parseUrl = (url) => {
    let newUrl = /(http.+)/.exec(url)[1];

    return newUrl
  }

  const validateSearchForm = () => {
    return (
      searchUrl.length > 0 &&
      (searchUrl.indexOf("http://") !== -1 || searchUrl.indexOf("https://") !== -1)
    );
  }

  const validateNotFoundForm = () => {
    return (
      notFoundBrand.length > 0 &&
      notFoundDetails.length > 0 &&
      addUrl.length > 0 &&
      addUrl.startsWith("http")
    );
  }

  const renderManualAdd = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={7} md={7} lg={7}
          className={classes.mrAuto + " " + classes.mlAuto}
        >
          {
            showSearchResultMessage
            ? <h5>
                We don't currently have any details for this product. Add the item with some basic details below and we'll update the item a.s.a.p.
              </h5>
            : null
          }
          <form className={classes.form}>
            <Input
              labelText="What is it? e.g. Scooter"
              id="details"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => setNotFoundDetails(event.target.value)
              }}
            />
            <Input
              labelText="Where is it from? e.g. Amazon"
              id="brand"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => setNotFoundBrand(event.target.value)
              }}
            />
            <Input
              labelText="Add any extra notes (optional). e.g. colour"
              id="notes"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: notes,
                onChange: event => setNotes(event.target.value)
              }}
            />
            <div className={classes.textCenter}>
              <Button color="primary" size="sm" simple onClick={() => decreaseNotFoundQuantity()}>
                <Remove />
              </Button>
              {` `}{notFoundQuantity}{` `}
              <Button color="primary" size="sm" simple onClick={() => setNotFoundQuantity(notFoundQuantity + 1)}>
                <Add />
              </Button>
            </div>
            <div className={classes.textCenter}>
              <Button round color="primary" onClick={() => createGift()} disabled={!validateNotFoundForm() || isAdding} data-cy="button-add-notfound-gift">
                Add to list
              </Button>
            </div>
          </form>
        </GridItem>
      </GridContainer>
    )
  }

  const renderMobileSearchResultTable = () => {
    return (
      <GridContainer alignItems="center" className={classes.searchResult}>
        <GridItem xs={5} sm={7} md={7} className={classes.mrAuto + " " + classes.mlAuto + " " + classes.textCenter}>
          <div className={classes.imgContainer}>
            <a href={addUrl} target="_blank" rel="noopener noreferrer">
              <img src={productImageUrl} alt="..." className={classes.img} />
            </a>
          </div>
        </GridItem>
        <GridItem xs={7} sm={7} md={7} className={classes.mrAuto + " " + classes.mlAuto + " " + classes.textCenter + " " + classes.quantityContainer}>
          <a href={addUrl} target="_blank" rel="noopener noreferrer" className={classes.brand}>
            {productBrand}
          </a>
          <br />
          <small className={classes.tdNameSmall}>
            {productDetails}
          </small>
          {productPrice
            ? <div className={classes.price}>
                £ {productPrice}
              </div>
            : null
          }
          <div>
            <span>
              <Button color="primary" size="sm" simple onClick={() => decreaseProductQuantity()}>
                <Remove />
              </Button>
              {` `}{productQuantity}{` `}
              <Button color="primary" size="sm" simple onClick={() => setProductQuantity(productQuantity + 1)}>
                <Add />
              </Button>
            </span>
          </div>
        </GridItem>
        <GridItem xs={12} sm={7} md={7} className={classes.notes}>
          <Input
            labelText="Add any extra notes (optional). e.g. colour"
            id="notes"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: notes,
              onChange: event => setNotes(event.target.value)
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={7} md={7}>
          <Button default color="primary" className={classes.reserveButton} disabled={isAdding} onClick={() => addProductToList()} data-cy="button-add-found-gift">
            Add to list
          </Button>
        </GridItem>
      </GridContainer>
    )
  }

  const renderDesktopSearchResultTable = () => {
    return (
      <Table
          tableHead={[
            "",
            "",
            ""
          ]}
          tableData={[
            [
              <div className={classes.imgContainer}>
                <a href={addUrl} target="_blank" rel="noopener noreferrer">
                  <img src={productImageUrl} alt="..." className={classes.img} />
                </a>
              </div>,
              <span key={1}>
                <a href={addUrl} target="_blank" rel="noopener noreferrer" className={classes.brand}>
                  {productBrand}
                </a>
                <br />
                <small className={classes.tdNameSmall}>
                  {productDetails}
                </small>
                {productPrice
                  ? <div className={classes.price}>
                      £ {productPrice}
                    </div>
                  : null
                }
              </span>,
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Input
                    labelText="Add any extra notes (optional). e.g. colour"
                    id="notes"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: notes,
                      onChange: event => setNotes(event.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6} className={classes.mrAuto + " " + classes.mlAuto + " " + classes.textCenter}>
                  <span>
                    <Button color="primary" size="sm" simple onClick={() => decreaseProductQuantity()}>
                      <Remove />
                    </Button>
                    {` `}{productQuantity}{` `}
                    <Button color="primary" size="sm" simple onClick={() => setProductQuantity(productQuantity + 1)}>
                      <Add />
                    </Button>
                  </span>
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <Button default color="primary" className={classes.reserveButton} disabled={isAdding} onClick={() => addProductToList()} data-cy="button-add-found-gift">
                    Add to list
                  </Button>
                </GridItem>
              </GridContainer>
            ]
          ]
          }
          tableShopping
          customHeadCellClasses={[
            classes.textCenter
          ]}
          customHeadClassesForCells={[2]}
          customCellClasses={[
            classes.tdName,
            classes.tdQuantity
          ]}
          customClassesForCells={[1,2]}
        />
    )
  }

  const renderSearchResultTable = () => {
    return (
      <Card plain>
          <CardBody plain>
            {
              breakpoint === 'xs' || breakpoint === 'sm'
                ? renderMobileSearchResultTable()
                : renderDesktopSearchResultTable()
            }
            <div className={classes.switchButton}>
              <p className={classes.description}>
                Details not what you thought they were? Use our form to add your item instead.
              </p>
              <Button color="secondary" onClick={() => switchForm()} data-cy="button-switch-to-custom">
                Custom Form
              </Button>
            </div>
          </CardBody>
        </Card>
    )
  }

  const renderSearchInput = () => {
    return (
      <div className={classes.textCenter}>
        <SearchBar
          value={searchUrl}
          placeholder={"Paste link..."}
          onChange={(newValue) => setSearchUrl(newValue)}
          onRequestSearch={() => searchProduct()}
          onCancelSearch={() => clear()}
          className={classes.searchInput}
        />
        {
          searchResult
          ? null
          : <Button color="primary" onClick={() => searchProduct()} disabled={!validateSearchForm() || isSearching} data-cy="button-search-product" className={classes.searchButton}>
              Search
            </Button>
        }
      </div>
    )
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10} lg={9}
            className={classes.mrAuto + " " + classes.mlAuto}
          >
            {renderSearchInput()}
            <div className={classes.errorContainer}>
            {error
              ? <ErrorText>
                  <p>{error}</p>
                </ErrorText>
              : null
            }
            </div>
            <div className={classes.results}>
              {listUpdated
                ? null
                : searchResult
                  ? searchSuccess
                    ? renderSearchResultTable()
                    : renderManualAdd()
                  : null
              }
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

SectionAddGifts.propTypes = {
  listId: PropTypes.string,
  addProductToState: PropTypes.func,
  setActive: PropTypes.func
};
