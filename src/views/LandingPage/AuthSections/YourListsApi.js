import { API } from "aws-amplify";

export function GetLists() {
  return API.get("lists", "/");
}
