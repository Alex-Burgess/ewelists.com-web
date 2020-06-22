import { GetLists, GetList } from "./ApiCalls";
import { onError } from "libs/errorLib";

export async function getUsersLists() {
  let lists = {};

  const response = await GetLists();

  let responseLists = response.owned;

  for (var i in responseLists) {
    const list = responseLists[i];

    let listResponse;
    try {
      listResponse = await GetList(list.listId);

      let products = [];
      for (var key in listResponse.products) {
        products.push(key);
      }

      lists[list.listId] = {
        "title": list.title,
        "products": products
      }
    } catch (e) {
      onError(e);
    }
  }

  return lists
}
