import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import {mount} from 'enzyme';
import YourLists from './YourLists';

describe('Tests for YourLists section.', () => {
  const api = require('./YourListsApi.js');
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

  test('Renders your lists section', async () => {
    let component;

    const {act} = TestRenderer;

    await act( async () => {
      component = TestRenderer.create(<Router><YourLists showCreate={false}/></Router>);
    })

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Test Create List Button', () => {
  it('should render create list popout', async () => {
    let wrapper;
    await act( async () => {
      wrapper = mount(<Router><YourLists showCreate={false}/></Router>);
    })

    const createButton = wrapper.find('CreateButton');
    expect(createButton.length).toEqual(1);
    expect(createButton.prop('text')).toEqual("Create a New List");

    createButton.find('button').simulate('click');
    wrapper.update();
    expect(wrapper.find('form').length).toEqual(1);
  });
});
