import { GetLists, GetList } from "Apis";

export async function getUsersLists() {
  let lists = {};

  const response = await GetLists();

  let responseLists = response.owned;

  for (var i in responseLists) {
    const list = responseLists[i];

    const listResponse = await GetList(list.listId);

    let products = [];
    for (var key in listResponse.products) {
      products.push(key);
    }

    lists[list.listId] = {
      "title": list.title,
      "products": products
    }
  }

  return lists
}
