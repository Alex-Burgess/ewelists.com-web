import { API } from "aws-amplify";
import { onError } from "libs/errorLib";
import config from 'config.js';

export const getList = async (listId) => {
  let response;

  try {
    response = await API.get("lists", "/" + listId);
  } catch (e) {
    onError("List ID " + listId + " does not exist. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const getSharedList = async (listId) => {
  let response;
  try {
    response = await API.get("lists", "/" + listId + "/shared");
  } catch (e) {
    onError("List ID " + listId + " does not exist. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const getProduct = async (product) => {
  let response;

  try {
    response = await API.get(product.type, "/" + product.productId);
  } catch (e) {
    onError("Could not find a product in the " + product.type + " table for Id: " + product.productId + ". Error: " + e.response.data.error);
  }

  return response;
}

export const getProducts = async (products) => {
  let productDetails = {};

  for (var key in products) {
    let product = products[key];

    const productResponse = await getProduct(product);

    if (productResponse) {
      product['brand'] = productResponse.brand;
      product['details'] = productResponse.details;
      product['productUrl'] = productResponse.productUrl;

      if (product.type === 'products') {
        product['imageUrl'] = productResponse.imageUrl;
      } else {
        product['imageUrl'] = config.imagePrefix + '/images/product-default.jpg';
      }

      if (productResponse.price) {
        product['price'] = productResponse.price;
      }

      productDetails[key] = product;
    }
  }

  return productDetails;
}


export const contactRequest = async (details) => {
  let response;

  try {
    response = await API.post("contact", "/", {
      body: details
    });
  } catch (e) {
    onError("Could not send message.");
  }

  return response;
}
