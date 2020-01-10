import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ListArticle from './ListArticle';

test('Renders ListArticle component, when user is not authenticated.', () => {
  const content = (
    <div>
      <p>
        Test content.
      </p>
    </div>
  );
  const title = "Test title."
  const subtitle = "Test subtitle."
  const backgroundImg = 'bathtime.jpg';
  const storyProducts = [
    {brand: 'John Lewis & Partners', url: 'https://www.johnlewis.com/john-lewis-partners-safari-hooded-towel-and-mitt-white/p3382355', price: '£16.50', description: 'Safari Hooded Towel and Mitt, White.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/237170008?$rsp-pdp-port-640$'},
    {brand: 'Aveeno Baby', url: 'https://www.amazon.co.uk/Aveeno-Baby-Daily-Care-Cleansing/dp/B01IW7YMDS', price: '£8.04', description: 'Daily Care Cleansing Milk, 300 ml.', img: 'https://images-na.ssl-images-amazon.com/images/I/81rlToC4wtL._SX466_.jpg'}
  ];

  const similarArticles = [
    {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
    description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
    {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
    description_short: "Make sure you're all set with everything you need for the all important hospital bag."}
  ];

  const tree = renderer
    .create(
      <Router>
        <ListArticle
          isAuthenticated={false}
          content={ content }
          backgroundImg={backgroundImg}
          title={title}
          subtitle={subtitle}
          storyProducts={storyProducts}
          similarArticles={similarArticles}
        />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});


test('Renders ListArticle component, when user who has authenticated.', () => {
  const content = (
    <div>
      <p>
        Test content.
      </p>
    </div>
  );
  const title = "Test title."
  const subtitle = "Test subtitle."
  const backgroundImg = 'bathtime.jpg';
  const storyProducts = [
    {brand: 'John Lewis & Partners', url: 'https://www.johnlewis.com/john-lewis-partners-safari-hooded-towel-and-mitt-white/p3382355', price: '£16.50', description: 'Safari Hooded Towel and Mitt, White.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/237170008?$rsp-pdp-port-640$'},
    {brand: 'Aveeno Baby', url: 'https://www.amazon.co.uk/Aveeno-Baby-Daily-Care-Cleansing/dp/B01IW7YMDS', price: '£8.04', description: 'Daily Care Cleansing Milk, 300 ml.', img: 'https://images-na.ssl-images-amazon.com/images/I/81rlToC4wtL._SX466_.jpg'}
  ];

  const similarArticles = [
    {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
    description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
    {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
    description_short: "Make sure you're all set with everything you need for the all important hospital bag."}
  ];

  const tree = renderer
    .create(
      <Router>
        <ListArticle
          isAuthenticated={true}
          content={ content }
          backgroundImg={backgroundImg}
          title={title}
          subtitle={subtitle}
          storyProducts={storyProducts}
          similarArticles={similarArticles}
        />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});