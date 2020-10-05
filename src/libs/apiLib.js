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

export const getProduct = async (id, type) => {
  let response;

  try {
    response = await API.get(type, "/" + id);
  } catch (e) {
    onError("Could not find a product in the " + type + " table for Id: " + id + ". Error: " + e.response.data.error);
  }

  return response;
}

export const getBlogProducts = async (products) => {
  // Expects array of ids
  // [
  //   "12345678-blog-e001-1234-abcdefghijkl",
  //   "12345678-blog-e002-1234-abcdefghijkl",
  //   "12345678-blog-e038-1234-abcdefghijkl"
  // ]

  let productDetails = {};

  await Promise.all(products.map(async (id) => {
    const productResponse = await getProduct(id, 'products');

    if (productResponse) {
      const product = {
        "productId": id,
        "type": "products"
      };

      product['brand'] = productResponse.brand;
      product['details'] = productResponse.details;
      product['productUrl'] = productResponse.productUrl;
      product['imageUrl'] = productResponse.imageUrl;
      product['price'] = productResponse.price;

      productDetails[id] = product;
    }
  }));

  return productDetails;
}

export const getProducts = async (products) => {
  // Expects map object:
  // {
  // "e13fafa6-845e-416d-bbf6-b63fbd6d14ba": {
  //     "productId": "e13fafa6-845e-416d-bbf6-b63fbd6d14ba",
  //     "quantity": 2,
  //     "reserved": 0,
  //     "purchased": 0,
  //     "type": "products"
  // }

  let productDetails = {};

  for (var key in products) {
    let product = products[key];

    const productResponse = await getProduct(key, product['type']);

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

export const getReservation = async (id) => {
  let response;

  try {
    response = await API.get("lists", "/reservation/" + id);
  } catch (e) {
    onError("Reservation ID " + id + " does not exist.")
    throw e;
  }

  return response;
}

export const updateReservationQuantity = async (id, email, name, quantity) => {
  let response;

  try {
    await API.put("lists", "/reserve/" +  id + "/email/" + email,{
      body: {
        "quantity": quantity,
        "name": name
      }
    });
  } catch (e) {
    onError("Could not update Reservation ID " + id + " with new quantity.")
    throw e;
  }

  return response;
}

export const cancelReservation = async (id, email, name) => {
  let response;

  try {
    response = await API.del("lists", "/reserve/" +  id + "/email/" + email,{
      body: {
        "name": name
      }
    });
  } catch (e) {
    onError("Could not cancel Reservation ID " + id + ".")
    throw e;
  }

  return response;
}

export const confirmPurchase = async (id, email, name, quanity, title, product) => {
  let response;

  try {
    response = API.put("lists", "/purchase/" + id + "/email/" + email, {
      body: {
        "quantity": quanity,
        "title": title,
        "name": name,
        "product": {
          "type": product['type'],
          "brand": product['brand'],
          "details": product['details'],
          "productUrl": product['productUrl'],
          "imageUrl": product['imageUrl']
        }
      }
    });
  } catch (e) {
    onError("Could not confirm purchase of reservation ID " + id + ".")
    throw e;
  }

  return response;
}
