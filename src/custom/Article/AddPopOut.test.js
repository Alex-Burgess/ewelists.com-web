import * as React from 'react';
import {mount, shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import AddPopOut from './AddPopOut';

const product = {
  "productId": "12345678-prod-h012-1234-abcdefghijkl",
  "brand": "John Lewis and Partners",
  "details": "Grobag Swaddle Blanket, Pack of 2, White",
  "imageUrl": "https://johnlewis.scene7.com/is/image/JohnLewis/236972855?$rsp-pdp-port-640$",
  "productUrl": "https://www.johnlewis.com/grobag-swaddle-blanket-pack-of-2-white/p3310657"
};

const lists = {"6036fe33-ac32-47aa-9b75-52e585fda530":{"title":"Test List","products":[]}};

const lists2 = {"6036fe33-ac32-47aa-9b75-52e585fda530":{"title":"Test List","products":["12345678-prod-h012-1234-abcdefghijkl"]}}

const lists3 = {
  "6036fe33-ac32-47aa-9b75-52e585fda530":{"title":"Test List","products":["12345678-prod-h012-1234-abcdefghijkl"]},
  "1234abcd-ac32-47aa-9b75-52e585fda531":{"title":"Test List2","products":["12345678-prod-h001-1234-abcdefghijkl"]}
}

// TODO - snapshots are not really that clear.
// TODO - should I use mount?
// TODO - should I be testing the output in more detail, e.g. find the table and check the number of rows.

describe('Snapshot tests for add pop out', () => {
  let component = shallow(
    <AddPopOut
      open={true}
      lists={{}}
      product={product}
    />
  );

  it('Renders pop out with no lists.', () => {

    expect(toJson(component)).toMatchSnapshot();
  });

  it('Renders pop out with one list in table.', () => {
    const component = shallow(
      <AddPopOut
        open={true}
        lists={lists}
        product={product}
      />
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it('Renders pop out with list showing already added.', () => {
    const component = shallow(
      <AddPopOut
        open={true}
        lists={lists2}
        product={product}
      />
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  it('Renders pop out with multiple lists.', () => {
    const component = shallow(
      <AddPopOut
        open={true}
        lists={lists3}
        product={product}
      />
    );

    expect(toJson(component)).toMatchSnapshot();
  });
})
