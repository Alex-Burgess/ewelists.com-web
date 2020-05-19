import { API } from "aws-amplify";

export function GetLists() {
  return API.get("lists", "/");
}

export function GetList(id) {
  return API.get("lists", "/" + id);
}

// export function GetProduct(type, id) {
//   return API.get(type, "/" + id);
// }
