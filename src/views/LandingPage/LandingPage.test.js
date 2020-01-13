import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import LandingPage from './LandingPage';

const {act} = TestRenderer;

const user = {
  email: 'test.user@gmail.com',
  name: 'Test User',
  sub: '6c9b0a41-1234-abcd-5678-c51f280c557f'
}

describe('Tests for Non Authenticated Users.', () => {
  test('Renders Landing Page', () => {
    const tree = TestRenderer
      .create(<Router><LandingPage /></Router>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Tests for Authenticated Users.', () => {
  const api = require('./AuthSections/YourListsApi.js');
  api.GetLists = jest.fn(() => {
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

  test('Renders landing page', async () => {
    let component;

    await act( async () => {
      component = TestRenderer.create(<Router><LandingPage isAuthenticated={true} user={user} /></Router>);
    })

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
