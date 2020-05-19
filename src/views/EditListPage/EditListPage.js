import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';
import { API } from "aws-amplify";
// libs
import { onError } from "libs/errorLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import List from "@material-ui/icons/List";
import Search from "@material-ui/icons/Search";
import Redeem from "@material-ui/icons/Redeem";
// core components
import HeaderFixed from "custom/Header/HeaderFixed.js";
import FooterDark from "custom/Footer/FooterDark.js";
import NavPills from "components/NavPills/NavPills.js";
// s for this page
import ListDetails from "./Sections/ListDetails.js";
import Products from "./Sections/Products.js";
import ClosedProducts from "./Sections/ClosedProducts.js"
import AddGifts from "./Sections/AddGifts.js";
import Reserved from "./Sections/Reserved.js";

import config from 'config.js';

import styles from "assets/jss/custom/views/editListPage/editPageStyle.js";
const useStyles = makeStyles(styles);

export default function EditPage(props) {
  const classes = useStyles();

  const listId = props.match.params.id;
  const mobile = props.mobile;

  const [loaded, setLoaded] = useState(false);
  const [closed, setClosed] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [products, setProducts] = useState({});
  const [reserved, setReserved] = useState([]);
  const [tabId, setTabId] = useState(0);

  useEffect( () => {
    async function getList() {
      let response;
      try {
        response = await API.get("lists", "/" + listId);
      } catch (e) {
        onError("List ID " + listId + " does not exist for the user.", props.user.sub);
        return false
      }

      return response;
    }

    async function getProduct(product) {
      let response;

      try {
        response = await API.get(product.type, "/" + product.productId);
      } catch (e) {
        onError("Could not find a product in the " + product.type + " table for Id: " + product.productId)
      }

      return response;
    }

    function setListState(response) {
      props.setTitle('Editing ' + response.list.title);
      setTitle(response.list.title);
      setDescription(response.list.description);
      setOccasion(response.list.occasion);
      setImageUrl(response.list.imageUrl);
      setReserved(response.reserved);

      if (('eventDate' in response.list) && (response.list.eventDate !== 'None')) {
        setDate(response.list.eventDate);
      } else {
        setDate('');
      }

      if (response.list.state === 'closed') {
          setClosed(response.list.state);
      }
    }

    async function getProductDetails(products) {
      let productDetails = {};

      for (var key in products) {
        let product = products[key];

        const productResponse = await getProduct(product);

        product['brand'] = productResponse.brand;
        product['details'] = productResponse.details;
        product['productUrl'] = productResponse.productUrl;

        if (product.type === 'products') {
          product['imageUrl'] = productResponse.imageUrl;
        } else {
          product['imageUrl'] = config.imagePrefix + '/images/product-default.jpg';
        }

        productDetails[key] = product;
      }

      return productDetails;
    }

    const setEditListDetails = async () => {
      const response = await getList();

      if (! response) {
        props.history.push('/error/' + listId);
      } else {
        let productDetails = await getProductDetails(response.products);
        setProducts(
          productDetails
        )
        setListState(response);
        setLoaded(true);
      }
    };

    setEditListDetails();
  }, [listId, props]);

  const deleteProductFromState = (id) => {
    setProducts(
      update(products, { $unset: [id] })
    )
  }

  const addProductToState = (product) => {
    setProducts({
      ...products,
      [product['productId']]: product
    })
  }

  const updateProductToState = (product) => {
    setProducts(
      update(products, {
        [product['productId']]: {
          quantity: {$set: product['quantity']}
        }
      })
    )
  }

  const setActive = (id) => {
    if (mobile) {
      if (window.pageYOffset < 200) {
        window.scrollTo({ top: navScrollHeight(), behavior: 'smooth' })
      }
    }

    setTabId(id);
  }

  const switchToAddProduct = (id) => {
    window.scrollTo({ top: navScrollHeight(), behavior: 'smooth' })
    setTabId(id);
  }

  const navScrollHeight = () => {
    var heightInWindow = document.getElementById('navTabContainer').getBoundingClientRect().top;
    var viewPortOffset = document.documentElement.scrollTop;
    var scrollHeight = heightInWindow + viewPortOffset - 85;
    return scrollHeight;
  }

  return (
    <div>
      {loaded
        ? <div>
            <HeaderFixed isAuthenticated={props.isAuthenticated} user={props.user} mobile={props.mobile} />
            <div className={classes.main}>
              <ListDetails
                listId={listId}
                title={title}
                description={description}
                occasion={occasion}
                date={date}
                imageUrl={imageUrl}
                mobile={props.mobile}
                user={props.user}
                closed={closed}
              />
              <div className={classes.profileTabs} id="navTabContainer">
                {closed
                  ? <NavPills
                      active={tabId}
                      setActive={setActive}
                      alignCenter
                      color="primary"
                      tabs={[
                        {
                          tabButton: "Reserved",
                          tabIcon: Redeem,
                          tabContent: (
                            <div>
                              <Reserved
                                mobile={mobile}
                                reserved={reserved}
                                products={products}
                              />
                            </div>
                          )
                        },
                        {
                          tabButton: "View List",
                          tabIcon: List,
                          tabContent: (
                            <div>
                              <ClosedProducts
                                mobile={mobile}
                                products={products}
                              />
                            </div>
                          )
                        }
                      ]}
                    />
                  : <NavPills
                      active={tabId}
                      setActive={setActive}
                      alignCenter
                      color="primary"
                      tabs={[
                        {
                          tabButton: "Manage List",
                          tabIcon: List,
                          tabContent: (
                            <div>
                              <Products
                                mobile={mobile}
                                products={products}
                                listId={listId}
                                deleteProductFromState={deleteProductFromState}
                                updateProductToState={updateProductToState}
                                switchToAddProduct={switchToAddProduct}
                              />
                            </div>
                          )
                        },
                        {
                          tabButton: "Add Items",
                          tabIcon: Search,
                          tabContent: (
                            <div>
                              <AddGifts
                                mobile={mobile}
                                listId={listId}
                                addProductToState={addProductToState}
                                setActive={setActive}
                              />
                            </div>
                          )
                        },
                        {
                          tabButton: "Reserved",
                          tabIcon: Redeem,
                          tabContent: (
                            <div>
                              <Reserved
                                mobile={mobile}
                                reserved={reserved}
                                products={products}
                              />
                            </div>
                          )
                        }
                      ]}
                    />
                }
              </div>
            </div>
            <FooterDark />
          </div>
        : null
      }
    </div>
  );
}
