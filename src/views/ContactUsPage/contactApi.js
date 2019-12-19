// import React, { useState } from 'react';
import { API } from "aws-amplify";


// export function ContactApiPost = async details => {
//   return API.post("contact", "/", {
//     body: details
//   });
// }

export function contactApiPost(details) {
  return API.post("contact", "/", {
    body: details
  });
}

// export function contactApiPost(details) {
//   return {
//     "name": "test user",
//     "email": "test.user@gmail.com",
//     "message": "a test message",
//     "id": 258166
//   }
// }
