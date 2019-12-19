import * as React from 'react';
import renderer from 'react-test-renderer';
import ShopTheStory from './ShopTheStory';

test('Renders SimilarArticles component.', () => {
  const storyProducts = [
    {brand: 'John Lewis & Partners', url: 'https://www.johnlewis.com/john-lewis-partners-safari-hooded-towel-and-mitt-white/p3382355', price: '£16.50', description: 'Safari Hooded Towel and Mitt, White.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/237170008?$rsp-pdp-port-640$'},
    {brand: 'Aveeno Baby', url: 'https://www.amazon.co.uk/Aveeno-Baby-Daily-Care-Cleansing/dp/B01IW7YMDS', price: '£8.04', description: 'Daily Care Cleansing Milk, 300 ml.', img: 'https://images-na.ssl-images-amazon.com/images/I/81rlToC4wtL._SX466_.jpg'}
  ];

  const tree = renderer
    .create(
      <ShopTheStory
        products={
          storyProducts
        }
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
