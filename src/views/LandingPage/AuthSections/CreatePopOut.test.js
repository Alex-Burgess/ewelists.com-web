import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
// import {mount} from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import { act } from 'react-dom/test-utils';
import CreatePopOut from './CreatePopOut';
import Select from "@material-ui/core/Select";

describe('Create List Form Validate', () => {
  let mount = createMount();

  const wrapper = mount(
    <Router>
      <CreatePopOut open={true} />
    </Router>
  );

  it('Should have 1 form', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('Should have 3 inputs, title, description and occasion', () => {
    expect(wrapper.find('input').length).toEqual(3);
    expect(wrapper.find('input#title').length).toEqual(1);
    expect(wrapper.find('input#description').length).toEqual(1);
    expect(wrapper.find('input[name="occasion"]').length).toEqual(1);
  });

  it('Should have form submit button, which is disabled', () => {
    const submitButton = wrapper.find('form').find('button');
    expect(submitButton.length).toEqual(1);
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);
  });

  it('Should have active submit button when all fields are populated', () => {
    wrapper.find('input#title').simulate('change', {
      target: {
        value: 'Test User',
      },
    });

    wrapper.find('input#description').simulate('change', {
      target: {
        value: 'Test User',
      },
    });

    // wrapper.find(Select).simulate('change', {
    //   target: {
    //     value: 'Other',
    //   },
    // });

    act(() => {
      wrapper.find(Select).at(0).props().onChange({
        target: {
          value: 'Baby Shower',
        },
      });
    })


    wrapper.update();

    var submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(false);
  });
});


// TODO - Issue with popout.  Had problems with Dialog, specifically with the property keepMounted being specified.
// After removing keepMounted property, had other errors.

// beforeAll(() => {
//   ReactDOM.createPortal = jest.fn((element, node) => {
//     if (!element.style) {
//       return React.cloneElement(element, { style: { webkitTransition: '' } });
//     }
//     return element;
//   });
//   // jest.mock('@material-ui/core/Slide');
//   jest.mock('@material-ui/core/Fade');
// });
//
// describe('Tests for YourLists section.', () => {
//   const api = require('./YourListsApi.js');
//   api.GetLists = jest.fn(() => {
//     return {
//       "user": {
//           "email": "burgess.alexander+apitestuser@gmail.com",
//           "userId": "ae617d08-1127-4066-87ec-b6df345793b8",
//           "name": "Api User"
//       },
//       "owned": [
//           {
//               "listId": "933c7476-cf0d-4a75-8822-2c011c07ce1d",
//               "title": "My Birthday List",
//               "description": "A gift wish list for my birthday.",
//               "occasion": "Birthday",
//               "imageUrl": "/images/celebration-default.jpg",
//               "listOwner": "ae617d08-1127-4066-87ec-b6df345793b8"
//           }
//       ],
//       "shared": []
//     }
//   });
//
//   test('Renders your lists section', () => {
//     const tree = TestRenderer
//       .create(<Router><CreatePopOut open={true} /></Router>)
//       .toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });
