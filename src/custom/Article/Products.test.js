import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Products from './Products';

const products = [
  {brand: 'John Lewis and Partners', url: 'https://www.johnlewis.com/john-lewis-partners-geneva-large-weekend-holdall/blue/p1807673', price: '£75.00', description: 'John Lewis & Partners Geneva Large Weekend Holdall, Blue.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/234172546?$rsp-pdp-port-1440$'},
  {brand: "Burt's Bees", url: 'https://www.amazon.co.uk/Burts-Bees-Percentage-Overnight-Ultra-Conditioning/dp/B07C3BLZRN', price: '£6.99', description: "Burt's Bees 100 Percentage Natural Overnight Intensive Lip Treatment, Ultra-Conditioning Lip Care, 7.08 g.", img: 'https://images-na.ssl-images-amazon.com/images/I/71yUvdw8UIL._SX679_.jpg'},
  {brand: 'Camelbak', url: 'https://www.amazon.co.uk/Camelbak-53622-CamelBak-eddy-75L/dp/B00NTYIHNQ', price: '£11.95', description: 'BPA Free Eddy Outdoor Bottle.', img: 'https://images-na.ssl-images-amazon.com/images/I/61J1m1AOrVL._SY879_.jpg'},
];

test.skip('Renders renderer component.', () => {

  const tree = renderer
    .create(
      <Router>
        <Products
          products={products}
        />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
