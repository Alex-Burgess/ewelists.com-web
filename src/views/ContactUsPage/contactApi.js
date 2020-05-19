import { API } from "aws-amplify";

export function contactApiPost(details) {
  return API.post("contact", "/", {
    body: details
  });
}
