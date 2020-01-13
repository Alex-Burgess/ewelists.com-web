import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import {mount} from 'enzyme';
import Reserved from './Reserved';

describe('Tests Reserved component of edit page.', () => {
  test('Renders desktop reserved table', async () => {
    let component;

    component = TestRenderer.create(
      <Router>
        <Reserved
          reserved={[
            {"productId":"12345678-prod-0003-1234-abcdefghijkl","quantity":1,"name":"John Smith","userId":"6c9b0a41-9a92-490c-98f8-c51f280c1234"},
            {"productId":"6a1f50a3-acb4-4842-8af1-5f606fed2ca7","quantity":2,"name":"John Smith","userId":"6c9b0a41-9a92-490c-98f8-c51f280c1234"}
          ]}
          products={{
            "12345678-prod-0003-1234-abcdefghijkl":{"productId":"12345678-prod-0003-1234-abcdefghijkl","quantity":1,"reserved":1,"type":"products","brand":"BABYZEN","details":"YOYO+ Puschair, Black with Aqua","productUrl":"https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291","imageUrl":"https://johnlewis.scene7.com/is/image/JohnLewis/237457570?$rsp-pdp-port-640$"},
            "6a1f50a3-acb4-4842-8af1-5f606fed2ca7":{"productId":"6a1f50a3-acb4-4842-8af1-5f606fed2ca7","quantity":4,"reserved":2,"type":"notfound","brand":"Test","details":"Some details","productUrl":"http://alink","imageUrl":"https://test.ewelists.com/images/product-default.jpg"}
          }}
        />
      </Router>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Renders mobile reserved table', async () => {
    let component;

    global.innerWidth = 375;

    component = TestRenderer.create(
      <Router>
        <Reserved
          reserved={[
            {"productId":"12345678-prod-0003-1234-abcdefghijkl","quantity":1,"name":"John Smith","userId":"6c9b0a41-9a92-490c-98f8-c51f280c1234"},
            {"productId":"6a1f50a3-acb4-4842-8af1-5f606fed2ca7","quantity":2,"name":"John Smith","userId":"6c9b0a41-9a92-490c-98f8-c51f280c1234"}
          ]}
          products={{
            "12345678-prod-0003-1234-abcdefghijkl":{"productId":"12345678-prod-0003-1234-abcdefghijkl","quantity":1,"reserved":1,"type":"products","brand":"BABYZEN","details":"YOYO+ Puschair, Black with Aqua","productUrl":"https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291","imageUrl":"https://johnlewis.scene7.com/is/image/JohnLewis/237457570?$rsp-pdp-port-640$"},
            "6a1f50a3-acb4-4842-8af1-5f606fed2ca7":{"productId":"6a1f50a3-acb4-4842-8af1-5f606fed2ca7","quantity":4,"reserved":2,"type":"notfound","brand":"Test","details":"Some details","productUrl":"http://alink","imageUrl":"https://test.ewelists.com/images/product-default.jpg"}
          }}
        />
      </Router>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
