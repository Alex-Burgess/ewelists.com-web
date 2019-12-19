import * as React from 'react';
import renderer from 'react-test-renderer';
import SimilarArticlesMain from './SimilarArticlesMain';

test('Renders SimilarArticles component.', () => {
  const similarArticles = [
    {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
    description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
    {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
    description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
  ];

  const tree = renderer
    .create(
      <SimilarArticlesMain
        articles={
          similarArticles
        }
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
