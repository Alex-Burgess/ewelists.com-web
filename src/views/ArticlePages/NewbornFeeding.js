import React, { useState, useEffect } from 'react';
// custom components
import { getUsersLists } from "./Sections/GetUsersLists";
import SectionHeading from "./Sections/SectionHeading.js";
import SectionHeadings from "./Sections/SectionHeadings.js";
import ListArticle from "./Sections/ListArticle.js";
import Products from "./Sections/Products.js";

// data id
const name = 'newborn-baby-feeding'

export default function NewbornFeeding(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          The first few months after your baby has arrived can be a bit of an emotional roller coaster. Not only are you
          dealing with less sleep, but you now need to care for this little being. And whether you're breastfeeding or
          bottle-feeding, most parents go through a stage where they worry if they've got it all right. One thing is for
          sure however, a little bit of pre-planning and a few things to make your life easier can give you that extra
          confidence you need.
        </p>
        <p>
          <i>Note: This article does not provide medical advice; it is purely a sharing of information based on our own
            experiences.</i>
        </p>
      </div>
      <SectionHeadings
        headings={[
          {"name": "feeding", "text": "Feeding in General"},
          {"name": "breast", "text": "Breast Feeding"},
          {"name": "expressing", "text": "Expressing"},
          {"name": "bottle", "text": "Bottle Feeding"},
          {"name": "night", "text": "Feeding at night"}
        ]}
      />
      <div>
        <SectionHeading name="feeding" text="Feeding in General" />
        <p>
          There are different options when it comes to feeding, and it's important to say that you should go with
          whichever you feel comfortable. If you and baby are happy, then that's all that matters.
        </p>
        <p>
          Whichever option you chose, we have some great product suggestions that can make life a lot more comfortable.
        </p>
        <ul>
          <li>
            <b>Muslins, lots of muslins!</b> These are an essential item, and you'll probably find them stuffed in all
              sorts of places in those early months. Use them to stop any dribble and mop up any spills.
          </li>
          <li>
            <b>A cushion</b> to support your baby during feeding and help save your back. It doesn't need to be a
              specially bought one, a pillow or cushion you already have with a washable cover will be fine. If you're
              looking for something designed for feeding, then a curved support pillow or an adjustable feeding pillow
              will help you get your little one into the right position.
          </li>
          <li>
            <b>A comfortable supportive chair,</b> especially for night time feeds. Again, this doesn't need to be
              something you buy. A chair you have at home with a supportive cushion, and maybe something to prop your
              feet on, will do just fine. If you have some money to splurge, then you might like to finish your nursery
              with a feeding chair and stool.
          </li>
          <li>
            <b>A well fitting bra,</b> and by well-fitting we mean something that has some room and is comfortable to
              wear. Two of our favourite stores are
              <a target="_blank" rel="noopener noreferrer" href="https://uk.hotmilklingerie.com"> Hot Milk </a>
               who offer fashion-forward designs and
              <a target="_blank" rel="noopener noreferrer" href="https://www.bravissimo.com"> Bravissimo </a>
              who cater for the DD+ market.
          </li>
        </ul>
      </div>
      <Products
        products={[
          "5a7ef5df-e389-4d83-ae6f-48c3ae03bfae",
          "1a07c86f-52ab-495d-91da-37da0cc76b7a",
          "37790eec-4b7b-4d17-a4d8-b08c7f5e9e62",
          "13eb68e2-ad44-42c4-ba63-0f31fe5020bb",
          "65c83e92-0304-493e-8d9c-41ccd5fb3a27",
          "6741b52a-42f0-43c3-be32-5101dc859515"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="breast" text="Breast Feeding" />
        <p>
          A lot of people don't know that you can start collecting your breast milk before you give birth; it's known as
          Colostrum Harvesting. Colostrum is the first nutrient and antibody-rich milk that you produce. It might seem
          an unnecessary step to take; however, having a supply of milk for those early days gives you one less thing to
          worry about.  The
          <a target="_blank" rel="noopener noreferrer" href="https://www.laleche.org.uk/antenatal-expression-of-colostrum"> La Leche </a>
          organisation has some excellent information for you to read on this topic. You can ask your midwife if they
          provide a colostrum harvesting kit and storage containers to help get you started.
        </p>
        <p>
          There are a couple of essential items we think you need for breastfeeding. The first is a good nipple cream to
          help soothe that delicate area; we like Lansinoh Nipple Cream and Mama Mio Nipple Cream. The second is some
          nursing pads for the inevitable leaks. We love re-usable bamboo pads for their comfort and
          environment-friendly use.
        </p>
      </div>
      <Products
        products={[
          "dc772d84-300e-4fb6-a005-e823e2953b6b",
          "3f367788-d472-4f88-b4b2-bc0856a94874",
          "4f743d8a-17f2-4611-a450-f5ca56a64373"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          For the first-timers amongst you, it might be an idea to have a breastfeeding shawl which will give you that
          bit of privacy you need while you're getting used to breastfeeding. The Mamascarf provides good coverage and
          has a handy pocket for your nursing pad, or the Striped Breast Feeding Scarf doubles up as a regular scarf to
          keep you warm.
        </p>
      </div>
      <Products
        products={[
          "a907716c-bf76-422f-aae3-5395305c928f",
          "03f44cd2-3ddf-40c4-8388-af09587f7d79"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          There are some great apps out there that can help remind you when your baby last fed and from which breast.
          NHS midwives often recommend the
          <a target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/gb/app/baby-feed-timer-breastfeeding/id395357581"> Baby Feed Timer </a>
          breastfeeding app. It includes a reminder about when the next feed is due and can be used on multiple phones,
          meaning you can share it with your partner. We also like
          <a target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/gb/app/baby-tracker-activity-log/id779656557"> Baby Tracker </a>
          which offers a simple, streamlined way to track your baby's daily habits. Record feedings, nappy changes, and
          sleep patterns with a quick one-handed tap.
        </p>
      </div>
      <div>
        <SectionHeading name="expressing" text="Expressing" />
        <p>
          You may choose to express pump your breast milk and store it. The benefit of this is that you will have a
          supply ready to go, and you can share the feeding with your partner or family. A handheld pump is harder work
          but is more reasonably priced, and will do the job if you are only looking for occasional use. If you plan to
          express regularly, you may want to consider an electric pump as this will do all the hard work for you.
        </p>
        <p>
          There are different options on the market for electric pumping, from single, double and even hands-free
          pumping. The
          <a target="_blank" rel="noopener noreferrer" href="https://amzn.to/2GhEsO5"> Tommee Tippee Made for Me pump </a>
          is a great option covering everything you need and is compatible
          with the bottles in their fantastic starter bundles. MAM products are also favourites with with new
          mums, always receiving excellent reviews. The
          <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/mam-2-in-1-single-breast-pump/p3543120"> 2 in 1 pump </a>
          gives you the option to do manual or electric
          pumping, and you can attach the pump directly to their self-clean bottle and storage pots. The Elvie
          is a more luxurious hands-free option; designed to sit in your nursing bra, allowing you to get on with other
          tasks.
        </p>
      </div>
      <Products
        products={[
          "d1ac59f4-9adf-4eb4-b6c3-49d766f99278",
          "ed162835-62d2-40aa-9a36-c33cc980064a",
          "5e3c2bff-c7f7-494a-b408-66bdb68f83c2",
          "5cc48142-988e-485e-bf7d-1b46c5afbafc",
          "3ae93242-73bd-473e-9d70-cfa2a5960a0c"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          Your pump or bottle starter set might already come with storage containers. However, you might want to add to
          your collection, so you always have some on hand. Pre-sterilised breast milk storage bags are an excellent
          convenience for occasional use, but re-usable storage containers are the best option for regular users.
        </p>
      </div>
      <Products
        products={[
          "0fe2ee34-f1bd-4ffb-a2a9-86cf87173197",
          "6060b2c0-a9c7-4d17-b0cd-6a19d20bf84c",
          "cfa28233-e277-4d99-ad00-ff7bd3fcf5a8",
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="bottle" text="Bottle Feeding" />
        <p>
          There are so many different types of bottles and teats (the nipple shaped part!) that you will probably find
          yourself wondering which type of bottle to use. There are a couple of things to look out for; the first is to
          check compatibility with other gadgets such as pumps or sterilisers; the second is whether you go for a
          standard or anti-colic bottle. An anti-colic bottle is designed to help with
          <a target="_blank" rel="noopener noreferrer" href="https://www.nhs.uk/conditions/colic/"> colic </a>
          , but it often means it has some extra parts to clean. To help you decide we've come up with a list of our
          favourite starter sets, chosen for their all-round value and possible use with other gadgets.
        </p>
      </div>
      <Products
        products={[
          "0130efb0-a429-433b-bf73-a1fcb3a009a4",
          "3a38ddcb-8719-4b51-be46-98d96c0ff664",
          "1d7a457d-fb5b-4784-9c61-2981aa36405d",
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          You will also need a steriliser to make sure your bottles are clean before each feed. The NHS recommends
          sterilising bottles and teats until your baby is at least 12 months old to help prevent infections. If you
          have the room, a countertop electric steam steriliser will mean you always have clean bottles neatly stored
          and at hand. It{"'"}s usually a good idea to go for the same brand as your bottles to make sure you maximise
          capacity. Alternatively, a microwave steamer is a good option for tucking out of the way. Just check your
          microwave size first to ensure it fits.
        </p>
      </div>
      <Products
        products={[
          "ff547cea-33ff-46d5-bff0-012144c025b3",
          "66722c77-6c24-4477-9a7b-185ff5bcd843",
          "b86797b8-e5af-4679-8a95-9c23d524bbf7"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          If you're formula feeding, there are a couple of items that make life easy for you. You might think these are
          lazy options, but frankly, we believe anything that gives parents a helping hand is worth a try. Ready-made
          formula has been pre-mixed in just the right portions and is ready for use straight from the bottle. The
          travel size bottles are fantastic for when you're out and about, and the larger size bottles might be what you
          need in those early sleep-deprived days. We also really like the Tommee Tippee Perfect Prep machine which
          whizzes up a fuss-free bottle of warm milk using your usual formula powder. Trust us; you will want this for
          that 3 am feed!
        </p>
      </div>
      <Products
        products={[
          "b98294f6-2230-40ed-8ded-9226ea7d9279",
          "3812cc28-66b3-4c25-9c0c-94e9a453f8b9",
          "61b14e99-4538-43f8-b11d-855b8e0228b7"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="night" text="Feeding at night" />
        <p>
          Preparing for night time feeds is probably one of the most important steps because, let's face it, no one
          who's just been woken functions well. Have your feeding station ready with a comfy chair, muslins, a water
          bottle, snack and some entertainment (phone, iPad, book). If you're bottle-feeding, make sure you have your
          bottles sterilised and ready to use. The ready-made formula or Tommee Tippee Perfect Prep are great options
          for night time feeds. If you need to pump, make sure you have your pump and storage containers ready to go.
        </p>
        <p>
          A night light that allows you to see what's going on but isn't so bright that it fully alerts you and your
          little one is an essential item. The GroEgg2 is a great addition to your nursery.  As well as enabling you to
          check the temperature at a glance it can also be used as a nightlight with its adjustable brightness. We like
          the VAVA Night Light for Kids because it's rechargeable and has a great variety of light settings, meaning
          it's incredibly useful. A motion sensor light can also be really helpful to provide dim lighting in case you
          need to pop to the kitchen.
        </p>
      </div>
      <Products
        products={[
          "1a8e3121-21dd-488d-8aae-8c08c5dee54e",
          "5041994a-73e2-4637-8f1f-d83fc6c4d37f",
          "4db7fe58-208c-447e-806b-c1367ada0d41"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          No doubt by now you will see that we are advocates of helpful tools and a bit of pre-planning. Why not get
          started today and create a list of all the useful items you might need for your new arrival. You can share it
          with family and friends who might like to buy you something, and best of all it's free.
        </p>
      </div>
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
    <ListArticle
      isAuthenticated={props.isAuthenticated}
      user={props.user}
      name={name}
      content={ content }
      setTitle={props.setTabTitle}
      mobile={props.mobile}
      tablet={props.tablet}
    />
  );
}
