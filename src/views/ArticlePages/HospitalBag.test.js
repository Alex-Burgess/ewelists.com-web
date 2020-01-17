import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import HospitalBag from './HospitalBag';

import { act } from 'react-dom/test-utils';
// const {act} = TestRenderer;

// test('Renders HospitalBag page.', () => {
//   const tree = TestRenderer
//     .create(
//       <Router>
//         <HospitalBag />
//       </Router>
//     )
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });


test.skip('Renders mount component.', async () => {

  const api = require('Apis.js');
  api.GetLists = jest.fn(() => {
    return {
      "user": {
          "email": "burgess.alexander+apitestuser@gmail.com",
          "userId": "ae617d08-1127-4066-87ec-b6df345793b8",
          "name": "Api User"
      },
      "owned": [],
      "shared": []
    }
  });

  // const api = require('Apis.js');
  api.GetList = jest.fn(() => {
    return {
      "user": {
          "email": "burgess.alexander+apitestuser@gmail.com",
          "userId": "ae617d08-1127-4066-87ec-b6df345793b8",
          "name": "Api User"
      },
      "owned": [
          {
              "listId": "933c7476-cf0d-4a75-8822-2c011c07ce1d",
              "title": "My Birthday List",
              "description": "A gift wish list for my birthday.",
              "occasion": "Birthday",
              "imageUrl": "/images/celebration-default.jpg",
              "listOwner": "ae617d08-1127-4066-87ec-b6df345793b8"
          }
      ],
      "shared": []
    }
  });

  let component;

  await act( async () => {
    component = mount(
      <Router>
        <HospitalBag />
      </Router>
    );
  })

  expect(toJson(component)).toMatchSnapshot();
});
