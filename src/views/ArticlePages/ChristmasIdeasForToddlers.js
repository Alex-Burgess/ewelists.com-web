import React from "react";
import ListArticle from "custom/Article/ListArticle.js";


export default function ChristmasIdeasForToddlers(props) {
  const title = 'Christmas Ideas for Toddlers';
  const subtitle = 'If you are stuck wondering what to get a toddler for Christmas, here are some of our favourite ideas!';
  const backgroundImg = 'christmastoddlers.jpg';

  const storyProducts = [
    {brand: 'Emma Bridgewater', url: 'https://www.amazon.co.uk/dp/B00XLNNNK2', price: '£ 36.55', description: 'Polka Dot 19 Piece Melamine Tea Set in House Carry Box', img: 'https://images-na.ssl-images-amazon.com/images/I/71AFxUI0ZIL._SX679_.jpg'},
    {brand: 'Tidlo', url: 'https://www.amazon.co.uk/dp/B00CM9J1K2', price: '£ 111.99', description: 'Wooden Country Play Kitchen', img: 'https://images-na.ssl-images-amazon.com/images/I/61andYkFLfL._SX679_.jpg'},
    {brand: 'Tidlo', url: 'https://www.amazon.co.uk/dp/B00CISHEYW', price: '£ 14.99', description: 'Wooden Cutting Vegetables Set', img: 'https://images-na.ssl-images-amazon.com/images/I/61E6YVRpXUL._SX679_.jpg'},
    {brand: 'Melissa & Doug', url: 'https://www.amazon.co.uk/dp/B0000BX8MA', price: '£ 12.35', description: 'Melissa & Doug Food Groups - Wooden Play Food (Pretend Play, 21 Hand-Painted Wooden Pieces and 4 Crates)', img: 'https://images-na.ssl-images-amazon.com/images/I/71Pt%2BhlLZjL._SX679_.jpg'},
    {brand: 'Melissa & Doug', url: 'https://www.amazon.co.uk/dp/B00210EQ84', price: '£ 18.60', description: 'Melissa & Doug 12610 Play House-Kitchens & Play Sets, Red, 31 x 31 x 13 cm', img: 'https://images-na.ssl-images-amazon.com/images/I/712Hqe9OKEL._SX679_.jpg'},
    {brand: 'Great Little Trading Co.', url: 'https://www.gltc.co.uk/collections/all-finishing-touches/products/personalised-childs-apron-mr-fox', price: '£ 24.00', description: 'Personalised Child\'s Apron, Mr Fox', img: 'https://cdn.shopify.com/s/files/1/2341/5115/products/l4552_3_1296x.jpg?v=1568627277'},
    {brand: 'Great Little Trading Co.', url: 'https://www.gltc.co.uk/collections/play-kitchen/products/star-beans-coffee-shop', price: '£ 51.00', description: 'Star Beans Coffee Shop', img: 'https://cdn.shopify.com/s/files/1/2341/5115/products/l4447_7_1296x.jpg?v=1572864733'},
    {brand: 'Great Little Trading Co.', url: 'https://www.gltc.co.uk/collections/sale-toys/products/wooden-till-red', price: '£ 27.00', description: 'Wooden Till, Red', img: 'https://cdn.shopify.com/s/files/1/2341/5115/products/l4206_2_9ada16ef-cd0b-43b9-b2a6-b501333e1755_1296x.jpg?v=1574439420'},
    {brand: 'Casdon', url: 'https://www.amazon.co.uk/dp/B01M3WPLZX', price: '£ 17.99', description: 'Little Helper Dyson Cord-free Handheld Vacuum Cleaner Toy Orange', img: 'https://images-na.ssl-images-amazon.com/images/I/51Ri17pbZiL._SY879_.jpg'},
    {brand: 'Micro', url: 'https://www.amazon.co.uk/dp/B01BE0J5TQ', price: '£ 82.95', description: 'Mini Deluxe Scooter - Aqua', img: 'https://images-na.ssl-images-amazon.com/images/I/51l7YxPwiIL._SY879_.jpg'},
    {brand: 'Nicko', url: 'https://www.amazon.co.uk/dp/B06XXCQ7GQ', price: '£ 31.99', description: 'Unicorn Rainbow Girls Children\'s Wooden Balance Bike', img: 'https://images-na.ssl-images-amazon.com/images/I/81Zd4INTjPL._SX679_.jpg'},
    {brand: 'Nicko', url: 'https://www.amazon.co.uk/dp/B01IVW78FI', price: '£ 31.99', description: 'Racing Cars Kids Children\'s Wooden Balance Bike', img: 'https://images-na.ssl-images-amazon.com/images/I/81LfbLVWneL._SX679_.jpg'},
    {brand: 'UniqueFit', url: 'https://www.amazon.co.uk/dp/B07M9PF26C', price: '£ 18.99', description: 'UniqueFit Kids Helmet Boys and Girls Safety Adjustable Comfortable Helmet for Roller, Scooter, Skateboard, Bicycle(3-8 Years Old)', img: 'https://images-na.ssl-images-amazon.com/images/I/51fsrTTXTAL._SX679_.jpg'}
  ];

  const similarArticles = [
    {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
    description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
    {category: "BABY", title: "Bath Time", url: "/listideas/bathtime", img: 'bathtime.jpg',
    description_short: "Everything you need when bathing your baby."},
    {category: "NURSERY", title: "The Nursery List", url: "/listideas/nursery", img: 'nurserylist.jpg',
    description_short: "What to buy for your baby’s bedroom."}
  ];

  const content = (
    <div>
      <p>
        Toddlers love to mimic adults and join in ‘helping’ with every day tasks. Here are some great ideas to encourage role play.
      </p>
      <p>
        Anyone for tea? This <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B00XLNNNK2"> Emma Bridgewater </a>
        tea set in Polka Dot comes with its own cute carry case. The recognisable Polka Dot design might even give you some ideas for an
        adult gift idea. It is also available in the Pink Heart Design.
      </p>
      <p>
        Hours of entertainment can be had with a play kitchen and there are lots of little extras that you can add over time or put on
        their list. Play food, pots and pans, cakes to put in the oven, the ideas are endless. This kitchen from
         <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B00CM9J1K2"> Tidlo </a> is made from
        sustainable components and the counter top height is slightly higher than other play kitchens meaning they get more years of play.
      </p>
      <p>
        Children love to help with cooking because they get to help create it and best of all they get to eat it! Having their own apron
        will really make them feel the part and this one from
        <a target="_blank" rel="noopener noreferrer" href="https://www.gltc.co.uk/collections/all-finishing-touches/products/personalised-childs-apron-mr-fox"> The Great Little Trading Company </a>
        gives you the option to personalise it with their name.
      </p>
      <p>
        If you’re looking for a suggestion on what to make with children, check out this simple yoghurt pot cake which uses the yoghurt
        pot as your measuring devise. RECIPE: 1 pot natural yoghurt, 2 pots of self raising flour, half a pot of mild olive oil, 3 eggs,
        pinch of salt and dash of vanilla essence. Beat until smooth and then transfer to a greased loaf tin. Bake in the an oven at 180c
        for 45-60 minutes. Simple.
      </p>
      <p>
        This cafe by
        <a target="_blank" rel="noopener noreferrer" href="https://www.gltc.co.uk/collections/play-kitchen/products/star-beans-coffee-shop"> The Great Little Trading Company </a>
        takes up less space than a kitchen but should provide just as much entertainment. It’s made of wood which ticks the box of less plastic.
        How about adding the <a target="_blank" rel="noopener noreferrer" href="https://www.gltc.co.uk/collections/sale-toys/products/wooden-till-red"> Wooden Till </a>
        to really make your little one feel like they are in business.
      </p>
      <p>
        Vacuuming isn’t high on the list of most adults but it seems like great fun to children, especially if they can do it at the same
        time as an adult. This
        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B01M3WPLZX"> Little Helper Dyson </a>
        is just like the real thing and will have them wizzing around after you making sure the house is spotless.
      </p>
      <p>
        A scooter or a balance bike are great ways to encourage balance and coordination. This scooter by
        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B01BE0J5TQ"> Micro Scooters </a>
        goes from ages 2-5 and comes in a range of colours.
      </p>
      <p>
        A balance bike is a great way for children to gain confidence on a bike without the need for pedals or stabilisers. The
        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B06XXCQ7GQ"> Nicko Unicorn Rainbow </a> and
        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B01IVW78FI"> Racing Cars </a>
        bikes by are made from plywood and come in a fantastic range of colours and patterns such as the unicorn print or the racer bike print.
      </p>
      <p>
        Don't forget the safety helmet for use with the scooter or bike. This helmet by
        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B07M9PF26C"> UniqueFit </a> has an adjustable dial to
        get the perfect fit and it comes in 5 different colours.
      </p>
    </div>
  );

  return (
    <ListArticle
      isAuthenticated={props.isAuthenticated}
      user={props.user}
      content={ content }
      backgroundImg={backgroundImg}
      title={title}
      subtitle={subtitle}
      storyProducts={storyProducts}
      similarArticles={similarArticles}
    />
  );
}
