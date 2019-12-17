import React from "react";
import ListArticle from "custom/Article/ListArticle.js";


export default function BathTime(props) {
  const title = 'Bath Time';
  const subtitle = 'What to buy for your bathing your baby.';
  const backgroundImg = 'bathtime.jpg';

  const storyProducts = [
    {brand: 'John Lewis & Partners', url: 'https://www.johnlewis.com/john-lewis-partners-safari-hooded-towel-and-mitt-white/p3382355', price: '£16.50', description: 'Safari Hooded Towel and Mitt, White.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/237170008?$rsp-pdp-port-640$'},
    {brand: 'Aveeno Baby', url: 'https://www.amazon.co.uk/Aveeno-Baby-Daily-Care-Cleansing/dp/B01IW7YMDS', price: '£8.04', description: 'Daily Care Cleansing Milk, 300 ml.', img: 'https://images-na.ssl-images-amazon.com/images/I/81rlToC4wtL._SX466_.jpg'},
    {brand: 'The Neat Nursery', url: 'https://www.amazon.co.uk/Neat-Nursery-Circular-Tail-Bowl/dp/B00JYD5SEM', price: '£8.93', description: 'Top \'N\' Tail Bowl.', img: 'https://images-na.ssl-images-amazon.com/images/I/41pXNAHISzL._SX355_.jpg'},
    {brand: 'The Gro Company', url: 'https://www.amazon.co.uk/Company-Groegg-Colour-Changing-Thermometer/dp/B002B55BN8', price: '£13.00', description: 'Groegg Colour Changing Room Thermometer.', img: 'https://images-na.ssl-images-amazon.com/images/I/71-jBXjqKLL._SY450_.jpg'},
    {brand: 'Angelcare', url: 'https://www.amazon.co.uk/Angelcare-Soft-Touch-Bath-Support/dp/B00AWMV9CY', price: '£18.00', description: 'Soft Touch Bath Support.', img: 'https://images-na.ssl-images-amazon.com/images/I/618eOZJh3UL._SY355_.jpg'},
    {brand: 'Little Gubbins', url: 'https://www.amazon.co.uk/Microfibre-Little-Gubbins-Unscented-Multipack/dp/B07CL34YN2', price: '£12.99', description: '20 x Microfibre Baby Wipes.  Pack of Reusable, Washable, Dry, Unscented Cloths.', img: 'https://images-na.ssl-images-amazon.com/images/I/91Kufu2PC3L._SY355_.jpg'},
    {brand: 'Anlass', url: 'https://www.amazon.co.uk/Anlass-Cartoon-Resistant-Children-Octopus/dp/B01M0SVFIR', price: '£8.99', description: 'Kids Cartoon Non Slip Mats Mildew Resistant Non Slip Mats for Children.', img: 'https://images-na.ssl-images-amazon.com/images/I/81tok-F7cHL._SY355_.jpg'},
    {brand: 'Mamas & Papas', url: 'https://www.amazon.co.uk/Mamas-Papas-Bambino-Support-Positions/dp/B00104WAX0', price: '27.00', description: 'Acqua Bambino Two Stage Bath with Safety Support Positions for Newborn to 12 Months, Pearl White.', img: 'https://images-na.ssl-images-amazon.com/images/I/51Q-eU%2BO7HL._SX355_.jpg'},
    {brand: 'Safety 1st', url: 'https://www.amazon.co.uk/Safety-1st-Swivel-Bath-Primary/dp/B00CMR3H0O', price: '£14.99', description: 'Safety 1st Swivel Bath Seat, Primary.', img: 'https://images-na.ssl-images-amazon.com/images/I/71Odw7SbXgL._SL1500_.jpg'},
    {brand: 'BBLIKE', url: 'https://www.amazon.co.uk/BBLIKE-Windmill-Waterwheel-Swimming-Toddlers/dp/B07N1GCJJC', price: '£11.99', description: 'Baby Bath Time Fun Toys, Kids Bath Toys Tub Windmill Waterwheel.', img: 'https://images-na.ssl-images-amazon.com/images/I/7171Lf4QkaL._SX466_.jpg'},
    {brand: 'Childs Farm', url: 'https://www.amazon.co.uk/Childs-Farm-baby-unfragranced-250ml/dp/B071WJNHTC', price: '£2.99', description: 'Childs Farm baby wash unfragranced 250ml.', img: 'https://images-na.ssl-images-amazon.com/images/I/71YDUJqEyAL._SX522_.jpg'},
    {brand: 'Childs Farm', url: 'https://www.amazon.co.uk/Childs-Farm-moisturiser-cocoa-butter/dp/B072JSY3SJ', price: '£2.99', description: 'Childs Farm Baby Moisturiser, 250ml, Shea and Cocoa Butter.', img: 'https://images-na.ssl-images-amazon.com/images/I/71v3zBEPpBL._SX466_.jpg'},
    {brand: 'Calypso', url: 'https://www.amazon.co.uk/Calypso-31200029-Natural-sponges/dp/B0721K3HR5', price: '£2.45', description: 'Naturl Sponges.', img: 'https://images-na.ssl-images-amazon.com/images/I/71C-kkCf%2BmL._SX679_.jpg'}
  ];

  const similarArticles = [
    {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
    description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
    {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
    description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
    {category: "NURSERY", title: "The Nursery List", url: "/listideas/nursery", img: 'nurserylist.jpg',
    description_short: "What to buy for your baby’s bedroom."}
  ];

  const content = (
    <div>
      <p>
        It can be a daunting prospect when it comes to giving your new baby a bath. They are so small and slippery and you
        worry if they will like it. The first thing to say is that you don’t need to bathe your baby straight away or
        every day for that matter. It is fine to give your baby a clean with some water and cotton wool for the first week
        or two, and after that they really only need a bath every few days.
      </p>
      <p>
        A <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Neat-Nursery-Circular-Tail-Bowl/dp/B00JYD5SEM/"> top and tail bowl </a>
        is designed to have two separate pools of water, one to be used on the head, neck and hands and one to be used for
        the nappy area. You simply need some cotton wool and water to gently clean your new baby. Some
        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Aveeno-Baby-Daily-Care-Cleansing/dp/B01IW7YMDS/"> cleansing lotion </a>
        can be used with cotton wool if there are areas you want to use more than just water.
      </p>
      <p>
        When it comes to the first bath you should start by making sure you have everything ready and close by. You can
        bring a changing mat, hooded towel, clothes and nappy into the bathroom so you can do everything you need in the
        same room. Make sure the room is nice and warm and that the water temperature is 36/37c by using a thermometer.
        This <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Company-Groegg-Colour-Changing-Thermometer/dp/B002B55BN8"> thermometer </a>
        doubles up as a room thermometer and can be used in baby’s bedroom as well.
      </p>
      <p>
        Babies are slippery when wet and a support of some sort frees up your hands to wash your baby. For a simple
        addition to your existing bath, a <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Angelcare-Soft-Touch-Bath-Support/dp/B00AWMV9CY/">
        bath support </a> can be used to lie your little one in while they are being washed. Make sure you only fill the
        water to the water line. Placing a <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Microfibre-Little-Gubbins-Unscented-Multipack/dp/B07CL34YN2/">
        flannel </a> over your baby’s tummy can help keep them nice and warm. If you don’t have a bath or if you want to
        use less water, a <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Mamas-Papas-Bambino-Support-Positions/dp/B00104WAX0/"> baby
        bath </a> with a built in support is a good option.
      </p>
      <p>
        Once your little one can sit up they can sit and play in your existing bath. A
        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Anlass-Cartoon-Resistant-Children-Octopus/dp/B01M0SVFIR/"> slip mat </a> is very
          handy here because it will help prevent them sliding when they wriggle around. If they are still a bit wobbly
          when they’re sitting you can use a <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Safety-1st-Swivel-Bath-Primary/dp/B00CMR3H0O">
          bath seat </a> which will give you extra peace of mind that they will be supported.
      </p>
      <p>
        Some <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/BBLIKE-Windmill-Waterwheel-Swimming-Toddlers/dp/B07N1GCJJC/"> toys </a>
        will give your baby something to look at while they are small and something to play with as they get older.
      </p>
      <p>
        Babies tend to have very sensitive skin which can dry out quickly. Choosing a bath care product that is
        specifically designed for dry and sensitive skin can help with looking after their skin. This
        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Childs-Farm-baby-unfragranced-250ml/dp/B071WJNHTC/"> Farms Child </a> range was
          is formulated for babies with really dry skin or eczema.
      </p>
      <p>
        A <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Calypso-31200029-Natural-sponges/dp/B0721K3HR5/"> natural sponge </a> or some
        small flannels are handy to have to gently wash your baby. You don’t need to wash baby’s hair with soap every time
        they have a bath either, you can simply splash over with some put water.
      </p>
      <p>
        A <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/john-lewis-partners-safari-hooded-towel-and-mitt-white/p3382355"> hooded
        towel </a> will help keep your baby nice and warm when you take them out of the bath and prepare them to dress.
      </p>
    </div>
  );

  return (
    <ListArticle
      isAuthenticated={props.isAuthenticated}
      content={ content }
      backgroundImg={backgroundImg}
      title={title}
      subtitle={subtitle}
      storyProducts={storyProducts}
      similarArticles={similarArticles}
    />
  );
}
