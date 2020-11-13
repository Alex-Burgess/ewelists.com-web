import { API } from "aws-amplify";
import { onError } from "libs/errorLib";
import config from 'config.js';

//
// Lists Apis
//
export const getLists = async () => {
  try {
    return await API.get("lists", "/");
  } catch (e) {
    onError("Could not retrieve lists. Error: " + e.response.data.error);
    throw e;
  }
}

export const getList = async (listId) => {
  try {
    return await API.get("lists", "/" + listId);
  } catch (e) {
    onError("List ID " + listId + " does not exist. Error: " + e.response.data.error);
    throw e;
  }
}

export const getSharedList = async (listId) => {
  try {
    return await API.get("lists", "/" + listId + "/shared");
  } catch (e) {
    onError("List ID " + listId + " does not exist. Error: " + e.response.data.error);
    throw e;
  }
}

export const createList = async (title, description, date, occasion, imageUrl) => {
  var createList = {
    "title": title,
    "description": description,
    "eventDate": date,
    "occasion": occasion,
    "imageUrl": imageUrl
  }

  try {
    return await API.post("lists", "/", {
      body: createList
    });
  } catch (e) {
    onError("Unexpected error occurred when creating list. Error: " + e.response.data.error)
    throw e;
  }
}

export const updateList = async (listId, title, description, date, occasion, imageUrl) => {
  try {
    return await API.put("lists", "/" + listId, {
      body: {
        "title": title,
        "description": description,
        "eventDate": date,
        "occasion": occasion,
        "imageUrl":  imageUrl
      }
    });
  } catch (e) {
    onError("Unexpected error occurred when updating list details. Error: " + e.response.data.error)
    throw e;
  }
}

export const deleteList = async (listId) => {
  try {
    return await API.del("lists", "/" + listId);
  } catch (e) {
    onError("Unexpected error occurred when deleting list. Error: " + e.response.data.error)
    throw e;
  }
}

export const getReservation = async (id) => {
  try {
    return await API.get("lists", "/reservation/" + id);
  } catch (e) {
    onError("Reservation ID " + id + " does not exist.")
    throw e;
  }
}

export const updateReservationQuantity = async (id, email, name, quantity) => {
  try {
    return await API.put("lists", "/reserve/" +  id + "/email/" + email,{
      body: {
        "quantity": quantity,
        "name": name
      }
    });
  } catch (e) {
    onError("Could not update Reservation ID " + id + " with new quantity.")
    throw e;
  }
}

export const cancelReservation = async (id, email, name) => {
  try {
    return await API.del("lists", "/reserve/" +  id + "/email/" + email,{
      body: {
        "name": name
      }
    });
  } catch (e) {
    onError("Could not cancel Reservation ID " + id + ".")
    throw e;
  }
}

export const confirmPurchase = async (id, email, name, quanity, title, product) => {
  try {
    return API.put("lists", "/purchase/" + id + "/email/" + email, {
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
    onError("Could not confirm purchase of reservation ID " + id + ". Error: " + e.response.data.error)
    throw e;
  }
}

export const addToList = async (listId, productId, quantity, type, notes) => {
  const body = {
    "quantity": quantity,
    "productType": type
  }

  if (notes) {
    body['notes'] = notes
  }

  try {
    return await API.post("lists", "/" + listId + "/product/" +  productId, {
      body: body
    });
  } catch (e) {
    onError("Could not add product (" + productId + ") to list (" + listId + "). Error: " + e.response.data.error)
    throw e;
  }
}

export const reserveProduct = async (listId, productId, email, name, quanity, title, product) => {
  try {
    return await API.post("lists", "/" + listId + "/reserve/" +  productId + "/email/" + email, {
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
    onError("Unexpected error occurred when reserving product. Error: " + e.response.data.error)
    throw e;
  }
}

export const updateProductQuantity = async (listId, productId, quantity, notes) => {
  try {
    return await API.put("lists", "/" + listId + "/product/" +  productId, {
      body: {
        "quantity": quantity,
        "notes": notes
      }
    });
  } catch (e) {
    onError("Unexpected error occurred when updating product on list . Error: " + e.response.data.error)
    throw e;
  }
}

export const removeProductFromList = async (listId, productId) => {
  try {
    return API.del("lists", "/" + listId + "/product/" +  productId);
  } catch (e) {
    onError("Unexpected error occurred when removing product on list . Error: " + e.response.data.error)
    throw e;
  }
}

//
// Products and notfound APIs
//
export const getProduct = async (id, type) => {
  try {
    return await API.get(type, "/" + id);
  } catch (e) {
    onError("Could not find a product in the " + type + " table for Id: " + id + ". Error: " + e.response.data.error);
    throw e;
  }
}

export const createProduct = async (brand, details, url, image, price) => {
  let body = {
    "brand": brand,
    "details": details,
    "url": url,
  }

  if (image) {
    body['imageUrl'] = image;
  }

  if (price) {
    body['price'] = price;
  }

  try {
    return await API.post("notfound", "/", {
      body: body
    });
  } catch (e) {
    onError("Could not create the product in table. Error: " + e.response.data.error);
    throw e;
  }
}

export const deleteProduct = async (id) => {
  try {
    return await API.del("notfound", "/" + id);
  } catch (e) {
    onError("Could not delete the product from table. Error: " + e.response.data.error);
    throw e;
  }
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

      if (productResponse.imageUrl) {
        product['imageUrl'] = productResponse.imageUrl;
      } else {
        product['imageUrl'] = config.imagePrefix + '/images/product-default.jpg';
      }

      if (productResponse.price) {
        product['price'] = productResponse.price;
      }

      if (productResponse.retailer) {
        product['retailer'] = productResponse.retailer;
      }

      productDetails[key] = product;
    }
  }

  return productDetails;
}

export const searchByUrl = async (url) => {
  try {
    return await API.get("products", "/url/" + encodeURIComponent(url));
  } catch (e) {
    onError("Unexpected error occurred when searching for product url. Error: " + e.response.data.error);
    throw e;
  }
}

export const queryMetadata = async (url) => {
  try {
    return await API.get("products", "/query/metadata/" + encodeURIComponent(url));
  } catch (e) {
    onError("Unexpected error occurred when searching for url metadata. Error: " + e.response.data.error);
    throw e;
  }
}

//
// Contact API
///
export const contactRequest = async (details) => {
  try {
    return await API.post("contact", "/", {
      body: details
    });
  } catch (e) {
    onError("Could not send message.");
    throw e;
  }
}
