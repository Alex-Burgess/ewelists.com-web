import React, { useState, useEffect } from 'react';
// custom components
import { getUsersLists } from "./Sections/GetUsersLists";
import SectionHeading from "./Sections/SectionHeading.js";
import SectionHeadings from "./Sections/SectionHeadings.js";
import ListArticle from "./Sections/ListArticle.js";
import Products from "./Sections/Products.js";
import ChecklistCard from "./Sections/ChecklistCard.js";

// Blog Data
const name = 'hospital-bag-checklist';

export default function HostpitalBag(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          Whether you like to be super organised and prepared for anything or you are just looking for some ideas to get
          you started, these top tips and hospital bag checklists will help you stay ahead of the game. You can pack
          your bag as early as you like, but it's a good idea to have it ready at least a few weeks in advance of the
          due date.
        </p>
      </div>
      <SectionHeadings
        headings={[
          {"name": "yourlist", "text": "What you need to pack"},
          {"name": "babieslist", "text": "What to pack for your baby"},
          {"name": "partnerlist", "text": "What your partner needs to pack"}
        ]}
      />
      <div>
        <SectionHeading name="yourlist" text="What do you need to pack in your hospital bag" />
        <p>
          If you haven't already done this, you might like to check the website for your hospital to see what facilities
          they have, such as birthing balls, TENS Machine and birthing pools, and see if they offer a tour of the ward.
          The NHS website can help you find
          <a target="_blank" rel="noopener noreferrer" href="https://www.nhs.uk/service-search/other-services/Maternity-services/LocationSearch/1802"> maternity services </a>
          near you, and you can find the link to your chosen hospital's site there.
        </p>
        <p>
          There is quite a lot to think about when packing as you will be packing for you, your baby and your birth
          partner. To help keep things organised and manageable in size, you might decide to bring two smaller bags with
          you, one for the birth and one for after the birth which can be kept in the car or brought along later.
        </p>
        <p>
          Don't forget to pack your hospital notes and birth plan in an easy to reach place. You might also like to
          separate groups of items into zip lock sandwich bags and then label them; this helps immensely when you need
          to send someone to find things.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-h001-1234-abcdefghijkl",
          "12345678-prod-h015-1234-abcdefghijkl",
          "12345678-prod-h005-1234-abcdefghijkl",
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <ChecklistCard packing items={
          ['Birth ball', 'Maternity notes and birth plan', 'TENS Machine', 'Plastic bag for dirty clothes', 'Ziplock bags']
      }/>
      <div>
        <p>
          As you don't know how long you will be in the hospital for its a good idea to bring drinks and snacks that
          include some isotonic and high energy options, and entertainment such as an iPad or books. Having a straw to
          drink from makes life a lot easier and means your birth partner can hold the drink for you.
        </p>
        <p>
          It's nice to have a few items to help keep you relaxed and comfortable. Lip balm is an essential and massage
          oil or a reed diffuser can help with your zen vibes. Your own pillow could also be a life-saver as hospital
          pillows aren't renowned for being that comfortable. If it's a particularly hot time of year, you might like to
          bring a fan and a flannel to use with some iced bottles of water.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-h003-1234-abcdefghijkl",
          "12345678-prod-h002-1234-abcdefghijkl",
          "12345678-prod-h006-1234-abcdefghijkl"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <ChecklistCard packing items={
          ['Drinks and snacks', 'Entertainment', 'Straw or bottle with straw', 'Headphones', 'Lip balm', 'Massage oils',
            'Pillow', 'Fan, flannel or spritz bottle', 'Toiletries', 'Hairband and headband', 'A towel', 'Eye mask and ear plugs']
      }/>
      <div>
        <p>
          You will want to have some comfy clothing for walking around the ward, and you may even want to bring a dark
          or patterned dressing gown and some slippers or flip flops. However, be wary about bringing light coloured
          clothing.
        </p>
        <p>
          For the birth, a large old t-shirt or short nightdress will work well, or if you're planning on using the
          birthing pool and want to cover up, you might like to bring a tankini top. Oddly enough, your feet can get
          quite cold during the birth, and a pair of socks can come in handy.
        </p>
        <p>
          Did you know that it can take several weeks for your bump to shrink after the birth? It does lose its
          beautiful firm shape though, so it's a good idea to have loose-fitting clothes to change into after the birth
          and for your journey home.
        </p>
        <p>
          Don't forget that whether you're breastfeeding or not, you will want to have some nursing pads and a maternity
          or nursing bra. There will be lots of help on hand to guide you through feeding your baby. However, if you
          already know that you won't be breastfeeding, you can bring some ready-made formula and bottles with you.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-h016-1234-abcdefghijkl",
          "12345678-prod-h017-1234-abcdefghijkl"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <ChecklistCard packing items={
          ['2 x night dresses', 'Dressing Gown', 'Tankini for the pool', 'Loose fitting clothes', '5 x large comfy knickers',
            'Nursing/maternity bra', 'Socks', 'Nursing pads', 'Slippers or flip flops', '2 x packs of large sanitary pads' ]
      }/>
      <div>
        <SectionHeading name="babieslist" text="What to pack for your baby" />
        <p>
          It's incredible how many items of clothes your little one will go through in a short space of time, which
          means it's a good idea to have 4 to 5 sets with you. A sleepsuit with built-in mittens and booties is perfect
          for wrapping up your little one nice and cosy. You should also have some vests and a hat. It's actually a
          little tricky to know what size your little one will be but a selection of sizes in newborn and 0-3 months
          should see you through that first couple of days.
        </p>
        <p>
          The first day with your baby is such an experience, and you'll probably find that you want to take lots of
          photos. A soft blanket and a cute toy can add a lovely touch to your photos.
        </p>
        <p>
          When it's finally time to go home, you'll want to make sure you have your car seat ready and something special
          to put your baby in. The
          <a target="_blank" rel="noopener noreferrer" href="https://www.gov.uk/child-car-seats-the-rules"> government website </a>
          tells you everything you need to know on the child seat law, and this buyers guide on
          <a target="_blank" rel="noopener noreferrer" href="https://www.mumsnet.com/reviews/baby-car-seats/buyers-guide"> mumsnet </a>
          gives you an excellent overview of what to look for. In colder weather don't be
          tempted to put your baby in a coat or pram suit while they are in the car seat because they are too bulky for
          the harness to do its job, a cardigan with a blanket on top will do the trick.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-h014-1234-abcdefghijkl",
          "12345678-prod-h009-1234-abcdefghijkl",
          "12345678-prod-h010-1234-abcdefghijkl",
          "12345678-prod-h011-1234-abcdefghijkl",
          "12345678-prod-h018-1234-abcdefghijkl"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <ChecklistCard packing items={
          ['4 x sleep suits and vests', 'Scratch mittens', 'Booties', 'Cardigan', 'Hat', '2 x muslin squares',
            '12 x nappies', 'Water wipes', 'Blanket' ,'Cuddly toy', 'Car seat', 'Bottles and formula']
      }/>
    <div>
        <SectionHeading name="partnerlist" text="What to pack for your birth partner" />
        <p>
          As hospitals can be hot places, your birth partner might like to have some cool clothes to change into and
          something fresh to put on after the birth. Shorts, t-shirts and loose dresses all work well. It{"'"}s also a good
          idea to give them the responsibility for the camera and any chargers you need. Not all hospitals allow you to
          plug into their sockets, but a chargeable battery pack will solve this issue.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-h013-1234-abcdefghijkl",
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <ChecklistCard packing items={
          ['Cool comfy clothing', 'Change of clothes', 'Phone', 'Camera', 'Charger', 'Swimwear for the pool']
      }/>
    </div>
  );

  useEffect( () => {
    async function getLists(){
      const lists = await getUsersLists();
      setLists(lists);
    }

    if (props.isAuthenticated) {
      getLists();
    }
  }, [props.isAuthenticated]);

  return (
    <div>
      <ListArticle
        isAuthenticated={props.isAuthenticated}
        user={props.user}
        name={name}
        content={ content }
        setTitle={props.setTabTitle}
        mobile={props.mobile}
        tablet={props.tablet}
      />
    </div>
  );
}
