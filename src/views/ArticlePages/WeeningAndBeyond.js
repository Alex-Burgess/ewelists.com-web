import React, { useState, useEffect } from 'react';
// libs
import { useAppContext } from "libs/contextLib";
// custom components
import { getUsersLists } from "./Sections/GetUsersLists";
import SectionHeading from "./Sections/SectionHeading.js";
import SectionHeadings from "./Sections/SectionHeadings.js";
import ListArticle from "./Sections/ListArticle.js";
import Products from "./Sections/Products.js";

// Blog Data
const name = 'weening-and-beyond'

export default function OutdoorPlay(props) {
  const { isAuthenticated } = useAppContext();
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          Preparing to feed your little one involves a whole new set of planning skills. The early days will probably be
          filled with mess and some trial and error, but think of them as an investment in future happy family
          mealtimes. In this article, we share some tips and products that can help you navigate the different stages of
          weaning and feeding.
        </p>
      </div>
      <SectionHeadings
        headings={[
          {"name": "weening", "text": "Weening stage"},
          {"name": "feeding-myself", "text": "Feeding myself"},
          {"name": "family", "text": "Eating with the family"},
          {"name": "storage", "text": "Food prep and storage"},
          {"name": "out-and-about", "text": "Out and about"}
        ]}
      />
      <div>
        <p>
          Whichever stage you are at, investing in a good weaning and feeding guide will help you plan your meals and
          know what to expect.
          <a target="_blank" rel="noopener noreferrer" href="https://amzn.to/30NJlWx"> Annabel Karmel's New Complete Baby & Toddler Meal Planner </a>
          is one great option to consider.
        </p>
      </div>
      <div>
        <SectionHeading name="weening" text="Weening stage" />
        <p>
          This is an enjoyable part of your baby's development. Your little one is now taking a real interest in the
          world around them and delights you with beautiful smiles and giggles. All babies develop at their own pace,
          but here is an idea of what you can expect at the different stages of weaning.
          <ul>
            <li><b>At 5-6 months,</b> your baby's gag reflex starts to diminish, and they can be given spoons of pureed
            food. Shallow weaning spoons are designed to make it easy for your baby to take a taste. Make sure you have
            a few, as you are bound to misplace some or sacrifice them to the dog if you have one!</li>
            <li><b>At 7-8 months,</b> they can start to chew and manage the texture that you find in mashed food. You
            will also be able to introduce a sippy cup at this stage. Nutrition becomes really important now, and you
            will probably find that they are having breakfast, lunch and dinner.</li>
            <li><b>At 9-12 months,</b> your baby will start to take longer sips when drinking and will be interested in
            finger food. They may even like to grip a spoon, although they are unlikely to be able to feed themselves
            with it just yet.</li>
          </ul>
        </p>
        <p>
          Of course, the thing that comes with weaning is lots of mess, so it's worth bearing this in mind when looking
          for some kit. There are some beautiful highchairs out there, but if they don't pass the dried Weetabix test,
          you might regret their purchase. Look for an easy to clean chair that has minimal cracks for food to hide.
          Padding is a favourite place for food to stick, so opt for no padding or removable padding that goes in the
          wash. It's also an idea to have a chair that is relatively easy to move around; light and compact helps
          enormously if you want to tuck the chair away after dinner.
        </p>
      </div>
      <Products
        products={[
          "317713a1-ae70-408a-b9d4-76fdee042ff9",
          "55a36f3b-541a-406a-acae-469b9e4e557c",
          "666e0b70-58e9-4a3b-b1de-e670cc0e01a2"
        ]}
        lists={lists}
      />
      <div>
        <p>
          Another useful tip to help you manage the mess is a sleeved bib which can go in the wash. Put one on over your
          baby's clothes to help avoid those non-removable orange stains. We also really like re-useable wipes, they are
          better for the environment, fabulous at gripping onto baby food, and you'll find a use for them for years to
          come.
        </p>
      </div>
      <Products
        products={[
          "fa801105-02a1-47c9-a6de-2e13c40c8c32",
          "c1e8f1fb-bb75-4a34-b078-2259ce70a7e0",
          "12345678-prod-b008-1234-abcdefghijkl"
        ]}
        lists={lists}
      />
      <div>
        <p>
          When it comes to using a training cup, there are two main options, those with a spout and those with a
          360-degree drinking edge. You might like to start with a free-flowing spout cup, but in the interest of
          keeping spills at bay, we love the 360-degree drinking cups. Once you've decided which cup is going to work
          for you, we recommend getting at least two because this is another item that tends to get mislaid.
        </p>
      </div>
      <Products
        products={[
          "8664e4b1-36dc-46af-9abe-556aac042ddd",
          "2ab5dd7c-bab9-4ca0-85a0-d5609793a76a",
          "3e6d10b9-0844-40f1-8731-ef577430e15f"
        ]}
        lists={lists}
      />
      <div>
        <SectionHeading name="feeding-myself" text="Feeding myself" />
        <p>
          Once your little one reaches about 12 months, you'll notice them wanting to become more independent. They will
          probably want to feed themselves and will start signalling to you their likes and dislikes. As they develop
          more control over their movements, you'll find they can stab food with a fork and can start to create a seal
          with their lips around a drinking cup.
        </p>
        <p>
          Continuing with our theme of keeping mess to a minimum, this is the time that we recommend double layering the
          bibs, with a soft sleeved bib as the first layer, followed by a clean wipe bib with a deep spill pocket. If
          you need to worry about protecting your floor, you could place a spill mat under the highchair. Of course, if
          you have a dog, that's one less thing to worry about :)
        </p>
        <Products
          products={[
            "986e784f-3dc9-4c1f-b7a0-29fa8dcb333b",
            "874e4c1b-8a16-484e-96e8-92ee739d1d56",
            "0b14b3b4-78d3-4719-9afb-a09925800d33"
          ]}
          lists={lists}
        />
        <p>
          Bowls that stick to the table are always a good option, for obvious reasons. For picky eaters, we recommend
          getting a bowl/plate with separate compartments. It will bring a bit of fun to the table, and it keeps food
          separate in case they don't like some of it. At this stage, you can invest in a cutlery set that will see them
          through the next couple of years, so make sure it's durable and will stand the test of time.
        </p>
        <Products
          products={[
            "8f6f77e5-2957-42bc-a965-4afc63b3da43",
            "2483f83a-769e-4cb4-8183-e11f863a297d",
            "76f10545-fadf-4588-8c65-bddd488c7f67"
          ]}
          lists={lists}
        />
      </div>
      <div>
        <SectionHeading name="family" text="Eating with the family" />
        <p>
          By the time your little one has reached the age of 2-3 they can start to eat the same food as you. Whenever
          possible, it's a really good to idea to make breakfast and lunchtime a social occasion for all of the family.
          We like to think that practising those social eating manners at home pay dividends when you go out for a meal,
          but who can predict what happens when you're out with a toddler!
        </p>
        <p>
          To keep your table clean and protected from scratches, we recommend a silicone placemat. They are heat
          resistant, non-slip and easy to clean. As your little one will have more control now, you can move onto plates
          and open cups. Bear in mind that dishes made from Melamine or Bamboo can crack if they are dropped from a
          height, which is why its good to wait until your little one has a bit more control before getting these items.
        </p>
        <Products
          products={[
            "f11e70f0-dd72-4a4d-be3b-d3323ad42957",
            "988f8523-5cb0-4a57-bad0-2eacbea9980b",
            "f63ab709-26e9-4aaa-ba2c-94309d0fa255"
          ]}
          lists={lists}
        />
      </div>
      <div>
        <SectionHeading name="storage" text="Food prep and storage" />
        <p>
          We're going to state a few really obvious things here, but we can't write about food prep and not mention
          them! You might not master these tips every week, but those weeks that you do will have you feeling like a
          winner.
          <ul>
            <li><b>Plan out your meals for the week -</b> it means you won't be scrambling around wondering what to make
            when you have hungry little eyes starring at you. It also helps if you've done your shopping for the whole
            week too.</li>
            <li><b>Keep some frozen vegetables -</b> not only are they really nutritious when they're frozen at source, but you
            can use a small portion without letting the rest go to waste</li>
            <li><b>Batch cook your meals -</b> make one large portion of a meal and then separate it out into smaller ones. You can store it in the freezer, and you will always have something ready to go.</li>
          </ul>
        </p>
        <p>
          When making puree food, you don't need to buy a counter-top food processor. A handheld blender will do the job
          just fine and will save you some washing up if you blend in the same pan you cooked in. If you want to be
          super-efficient, you can buy a 2-in-1 steamer and blender, although if you already have a food processor, you
          might want to think about how much space you have for storage.
        </p>
        <p>
          We find it's best to portion out small quantities of food for storage because it gives you more flexibility
          over how much you want to use. Whichever storage container you choose, make sure it is freezer, microwave and
          dishwasher safe. This will help you avoid any cracks if you accidentally put it in the wrong machine.
        </p>
        <Products
          products={[
            "48e68296-34cc-4652-818d-e0b41a8aec8d",
            "f87660a6-678b-4be8-b619-a64158753cdf",
            "ba4d69e4-14fb-41b9-97cc-7f1b15045ea6"
          ]}
          lists={lists}
        />
      </div>
      <div>
        <SectionHeading name="out-and-about" text="Out and about" />
        <p>
          If there's one thing that can spoil a trip out, it's a hungry grizzly child. Keeping lots of healthy snacks in
          your bag will help you avoid hunger meltdown, especially if you end up staying out longer than planned. Stock
          up on a few different sizes of reusable storage containers, and choose a drinking bottle that is small and
          simple enough for your little one to use on their own.
        </p>
        <Products
          products={[
            "22ef5654-9bff-4a80-87dd-9e70283fd13d",
            "3b0be123-9439-4092-8901-105a25c5e8db",
            "2cf577af-35a4-4aeb-9662-7943f234bdc6"
          ]}
          lists={lists}
        />
        <p>
          If you're still using purees and mashed food, there's no harm giving yourself a break and going for some
          ready-made pouches when out and about. Life is about balance, if you have mostly home-cooked food, the odd bit
          of convenience food thrown in will be fine. We would also highly recommend stocking up on your regular
          ready-made food or snacks for any overseas trips. You might be surprised by the lack of choice overseas.
        </p>
        <p>
          For the super organised out there, you can now buy reusable pouches for use with your home-cooked food. This
          is an excellent option if you need to supply your childminder or nursery with food.
        </p>
        <Products
          products={[
            "6f939225-9f70-4131-83e2-8bb1455665bf",
            "3cd5cce9-c3bc-4fc4-82c5-97f5bff9bace",
            "4c0b3dd5-feb5-441c-b026-ae2641c7943d"
          ]}
          lists={lists}
        />
        <p>
          Although not strictly necessary, you might like to have some equipment designed especially for travelling.
          Perhaps you regularly go to visit family and might benefit from having some gear ready to go. Whatever you
          chose, make sure its storage-friendly and keep all the items together, so you're prepared.
        </p>
        <Products
          products={[
            "12345678-prod-t008-1234-abcdefghijkl",
            "12345678-prod-t009-1234-abcdefghijkl",
            "9dacdaad-2248-41e5-bd6d-8b004a185582"
          ]}
          lists={lists}
        />
      </div>
      <div>
        <p>
          Why not start creating a list of all the things you need with ewelists. You can add items from any store,
          easily share it with family and friends, and it’s completely free.
        </p>
        <p>
          We’d love to see some of your fabulous pictures, so don’t forget to tag us at <b>#ewelists</b> and follow us on
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ewelists"> Instagram </a> for lots of gift list inspiration.
        </p>
      </div>
    </div>
  );

  useEffect( () => {
    async function getLists(){
      const lists = await getUsersLists();
      setLists(lists);
    }

    if (isAuthenticated) {
      getLists();
    }
  }, [isAuthenticated]);

  return (
    <ListArticle
      name={name}
      content={content}
    />
  );
}
