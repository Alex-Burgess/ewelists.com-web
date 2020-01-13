import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import IdeasMain from './IdeasMain';

const user = {
  email: 'test.user@gmail.com',
  name: 'Test User',
  sub: '6c9b0a41-1234-abcd-5678-c51f280c557f'
}

test('Renders IdeasMain component.', () => {
  const recentArticles = [
    {title: "Christmas Ideas", url: "/listideas/christmasfortoddlers", img: 'christmastoddlers.jpg', img_position_left: false,
    description_short: "Great Christmas ideas for toddlers and young children.",
    beginning_content: "If you are stuck wondering what to get a toddler for Christmas, here are some of our favourite ideas! Toddlers love to mimic adults and join in ‘helping’ with every day tasks. Here are some great ideas to encourage role play..."},
    {title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg', img_position_left: true,
    description_short: "Great items to make travelling with your little ones no fuss!",
    beginning_content: "The compact stroller/buggy is one of the most useful items for travelling. They are handy for all sorts, such as effortlessly moving around the city hopping on and off public transport, taking with you through the airport, or just keeping in the car..."}
  ];

  const similarArticles = [
    {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
    description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
    {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
    description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
  ];

  const tree = renderer
    .create(
      <Router>
        <IdeasMain
          isAuthenticated={false}
          user={user}
          recentArticles={recentArticles}
          similarArticles={similarArticles}
        />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
