import * as React from 'react';
import renderer from 'react-test-renderer';
import RecentArticlesMain from './RecentArticlesMain';

test('Renders RecentArticles component.', () => {
  const recentArticles = [
    {title: "Christmas Ideas", url: "/list-ideas/christmas-ideas-for-toddlers", img: 'christmastoddlers.jpg', img_position_left: false,
    description_short: "Great Christmas ideas for toddlers and young children.",
    beginning_content: "If you are stuck wondering what to get a toddler for Christmas, here are some of our favourite ideas! Toddlers love to mimic adults and join in ‘helping’ with every day tasks. Here are some great ideas to encourage role play..."},
    {title: "Travel Gear", url: "/list-ideas/baby-travel-gear", img: 'baby-travel-gear.jpg', img_position_left: true,
    description_short: "Great items to make travelling with your little ones no fuss!",
    beginning_content: "The compact stroller/buggy is one of the most useful items for travelling. They are handy for all sorts, such as effortlessly moving around the city hopping on and off public transport, taking with you through the airport, or just keeping in the car..."}
  ];

  const tree = renderer
    .create(
      <RecentArticlesMain
        articles={
          recentArticles
        }
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
