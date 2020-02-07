import * as React from 'react';
import renderer from 'react-test-renderer';
import SimilarArticles from './SimilarArticles';

test('Renders SimilarArticles component.', () => {
  const similarArticles = [
    {category: "TRAVEL", title: "Travel Gear", url: "/list-ideas/baby-travel-gear", img: 'baby-travel-gear.jpg',
    description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
    {category: "MATERNITY", title: "Hospital Bag", url: "/list-ideas/hospital-bag-checklist", img: 'hospital-bag-checklist.jpg',
    description_short: "Make sure you're all set with everything you need for the all important hospital bag."}
  ];

  const tree = renderer
    .create(
      <SimilarArticles
        articles={
          similarArticles
        }
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
