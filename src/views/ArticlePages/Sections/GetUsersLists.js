import { onError } from "libs/errorLib";
import { getLists, getList } from "libs/apiLib";

export async function getUsersLists() {
  let lists = {};

  const response = await getLists();

  let responseLists = response.owned;

  for (var i in responseLists) {
    const list = responseLists[i];

    let listResponse;
    try {
      listResponse = await getList(list.listId);

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
