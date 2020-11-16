import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import HeaderWhite from "components/Header/HeaderWhite.js";
import Footer from "components/Footer/FooterGrey.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Links from "./Sections/Links.js";
import SectionHeading from "./Sections/SectionHeading.js";

import styles from "assets/jss/material-kit-pro-react/views/faqPageStyle.js";
const useStyles = makeStyles(styles);


export default function AboutPage(props) {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <HeaderWhite />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={9} md={9} lg={9}>
            <h1 className={classes.title}>
              Using Ewelists
            </h1>
            <hr />
            <Links
              headings={[
                {
                  "id": "our-service",
                  "name": "Our Service",
                  "subheadings":
                    [
                      {"id": "what-is-ewelists", "name": "What is ewelists?"},
                      {"id": "is-there-a-fee", "name": "Is there a fee to use ewelists?"},
                      {"id": "improvements", "name": "I have some ideas on how to improve the tool, would you like to hear them?"}
                    ]
                },
                {
                  "id": "creating-your-list",
                  "name": "Creating your list",
                  "subheadings":
                    [
                      {"id": "add-gifts", "name": "How do I add gifts to my wish list?"},
                      {"id": "how-many-gifts-should-i-add", "name": "How many gifts should I add to my wish list?"},
                      {"id": "more-than-one-wish-list", "name": "Can I have more than one wish list?"},
                      {"id": "when-should-i-share", "name": "When should I share my wish list?"}
                    ]
                },
                {
                  "id": "sharing-your-list",
                  "name": "Sharing your list",
                  "subheadings":
                    [
                      {"id": "sharing-my-wishlist", "name": "I feel a bit awkward sharing my wish list, how can I share my list without sounding like I’m demanding gifts?"},
                      {"id": "how-do-i-share", "name": "How do I share my list?"},
                      {"id": "what-will-gift-givers-see", "name": "What will my gift giver see when I share my list?"},
                      {"id": "gift-has-been-purchased", "name": "How will I know when a gift has been purchased?"}
                    ]
                },
                {
                  "id": "purchasing-a-list",
                  "name": "Purchasing a gift",
                  "subheadings":
                    [
                      {"id": "purchase-a-gift", "name": "How do I purchase a gift?"},
                      {"id": "multiple-gifts", "name": "How do I purchase multiple gifts?"},
                      {"id": "where-do-i-send-the-gifts", "name": "Where do I send the gifts?"}
                    ]
                },
                {
                  "id": "receiving-your-gifts",
                  "name": "Receiving your gifts",
                  "subheadings":
                    [
                      {"id": "gifts-delivered", "name": "Where should I have the gifts delivered?"}
                    ]
                }
              ]}
            />
            <div>
              <SectionHeading
                id="our-service"
                heading="Our Service"
              />
              <div>
                <h3 className={classes.heading} id="what-is-ewelists">What is ewelists?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  Ewelists is your one stop tool to create and share wish lists for your littles ones. You can add items
                  from any online store and combine all your wish lists into one place. We’re really passionate about
                  helping parents. We believe well designed products that work for your lifestyle are worth their weight
                  in gold, so you’ll find lots of top tips and product picks in our idea pages.
                </p>
                <p className={classes.paragraph}>
                  We’re just starting out on this journey and we have lots of ideas on new features which we can’t wait to
                  share with you. Stay tuned as we’d love you to benefit from our goal of making parenting simpler.
                </p>
              </div>
              <div>
                <h3 className={classes.heading} id="is-there-a-fee">Is there a fee to use ewelists?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  We’re proud to offer our service completely free to you. Instead, we may make a small fee if you
                  purchase a product that is sold by a company that is part of our affiliate network. Although some of the
                  products we recommend belong to our affiliate network, we often recommend products that don’t belong to
                  the affiliate network. Our number one goal is to showcase products that we really believe in, and to
                  help you to decide which products work for your lifestyle.
                </p>
              </div>
              <div>
                <h3 className={classes.heading} id="improvements">I have some ideas on how to improve the tool, would you like to hear them?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  Yes yes yes! We are delighted to be on this journey and are incredibly motivated when we hear from
                  you. We would love to hear any feedback you have; the good, the bad and the ugly. We’ve started with
                  building a tool we would want to use, but really this is about you, so do tell us what you think.
                </p>
              </div>
            </div>
            <div>
              <SectionHeading
                id="creating-your-list"
                heading="Creating your list"
              />
              <div>
                <h3 className={classes.heading} id="add-gifts">How do I add gifts to my wish list?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  Once you’ve created the basic details for your chosen list, you have a couple of options on how to
                  add products. You can either add products straight from one of our idea pages, or you can browse
                  the internet to find the specific product you are after.
                </p>
                <p className={classes.paragraph}>
                  If you are after a specific product, simply copy the link from your chosen product and paste it
                  into the ‘add product’ feature on your list. Either way, we’ll find the picture and some details
                  of the product, and show it on your list.
                </p>
              </div>
              <div>
                <h3 className={classes.heading} id="how-many-gifts-should-i-add">How many gifts should I add to my wish list?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  It’s really up to you how many ideas you want to put on your list, and how many people you share
                  it with. Our advice would be to go for a range of prices to suit different budgets. Gift givers want to
                  feel a personal connection when they’re choosing a gift, so give them lots of ideas to choose from. We
                  would recommend 2-3 gift ideas for every person you will share it with.
                </p>
              </div>
              <div>
                <h3 className={classes.heading} id="more-than-one-wish-list">Can I have more than one wish list?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  Yes, you can have as many lists as you like. One for each of your little ones and one for you too.
                  We think it’s a great idea to keep a list on the go so you can add gift ideas as soon as you see
                  something you like. It also means that you’ll have a list ready whenever you’re asked what gift your
                  little one would like.
                </p>
              </div>
              <div>
                <h3 className={classes.heading} id="when-should-i-share">When should I share my wish list?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  It’s good to allow your gift givers enough time to browse your list and to give them some
                  flexibility over which delivery timeframe they choose. In our experience, sharing your list about 3-4
                  weeks before the event works for both the super organised and last minute gift giver. Although for
                  Christmas we would recommend sharing your list slightly earlier than this.
                </p>
              </div>
            </div>
            <div>
              <SectionHeading
                id="sharing-your-list"
                heading="Sharing your list"
              />
              <div>
                <h3 className={classes.heading} id="sharing-my-wishlist">I feel a bit awkward sharing my wish list, how can I share my list without sounding like I’m demanding gifts?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  We get this, we’ve been there too! Although there’s something we’ve realised on this parenting journey;
                  close friends and family love nothing more than to celebrate special occasions with a gift, but
                  they’re often stuck thinking “what should I get”.
                </p>
                <p className={classes.paragraph}>
                  If you don’t want to do a broad sharing of your list, you can always wait until you’re asked about
                  gift ideas and then share your list with those that ask. Use your welcome message to write something
                  personal about why you’re sharing your list. You can explain that these are ideas of things you or
                  your little one needs, and perhaps a little bit about why you’ve chosen them.
                </p>
              </div>
              <div>
                <h3 className={classes.heading} id="how-do-i-share">How do I share my list?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  Each of your lists will have it’s own unique URL link. Once you’re ready to share a list, click
                  ‘edit list’ and then select the icon for email, Facebook Messenger, WhatsApp, or simply ‘share’
                  with a copy and paste.
                </p>
              </div>
              <div>
                <h3 className={classes.heading} id="what-will-gift-givers-see">What will my gift giver see when I share my list?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  Your gift givers will receive a link that will take them to your wish list. They will be able to see
                  your welcome message, the key details for each item, and which items are reserved or available. If
                  you’d like to take a look at what they’ll see when they visit your link, click the ‘view’ icon in
                  your list.
                </p>
              </div>
              <div>
                <h3 className={classes.heading} id="gift-has-been-purchased">How will I know when a gift has been purchased?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  Before a gift is purchased it needs to be reserved. This helps avoid any duplicates if people are
                  browsing your list at a similar time. We will send you a notification when a gift has been reserved,
                  and automatically update your list so everyone knows what’s been reserved.
                </p>
                <p className={classes.paragraph}>
                  Your gift givers will be sent an email asking them to confirm if they purchased an item. This also
                  serves as a reminder in case they want to make the purchase at a later date. You can also use our
                  handy ‘reserved list’ within the tool to help you keep track and manage your thank-you notes.
                </p>
              </div>
            </div>
            <div>
              <SectionHeading
                id="purchasing-a-list"
                heading="Purchasing a gift"
              />
              <div>
                <h3 className={classes.heading} id="purchase-a-gift">How do I purchase a gift?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  All gifts are purchased directly with the underlying retailer. Once you’ve chosen a gift, you need to
                  reserve the gift before being taken to the retailer to make the purchase. We do this to make sure
                  no-one else buys the gift while you’re still browsing. Don’t worry if you change your mind, simply
                  unreserve the item and continue browsing.
                </p>
                <p className={classes.paragraph}>
                  Once you reserve a gift we will send you an email with the product link (in case you need to find the
                    product a bit later) and ask you to confirm if you have purchased the item.
                </p>
              </div>
              <div>
                <h3 className={classes.heading} id="multiple-gifts">How do I purchase multiple gifts?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  You might like to reserve multiple gifts before making a purchase. Each time you reserve an item we’ll
                  send you an email with the product link, which you can use to visit the retailer and make the purchase
                  once you’re ready.
                </p>
                <p className={classes.paragraph}>
                  If you’re purchasing multiple products from the same retailer, you will probably want to add each
                  product to the shopping basket of the retailer, before purchasing all at once.
                </p>
              </div>
              <div>
                <h3 className={classes.heading} id="where-do-i-send-the-gifts">Where do I send the gifts?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  This depends on whether you want to wrap and deliver the gifts yourself, or if it’s easier for the
                  gifts to be delivered straight to the door of the lucky wish lister.
                </p>
              </div>
            </div>
            <div>
              <SectionHeading
                id="receiving-your-gifts"
                heading="Receiving your gifts"
              />
              <div>
                <h3 className={classes.heading} id="gifts-delivered">Where should I have the gifts delivered?</h3>
                <hr className={classes.headingLine}/>
                <p className={classes.paragraph}>
                  It’s up to you whether you’d like the gifts sent straight to you or to your gift giver, but do
                  remember that most people like to give a gift in person and join in the special moment, if that’s
                  possible.
                </p>
                <p className={classes.paragraph}>
                  If you would like the gifts sent to your home address, you will need to provide the address when you
                  share your link.
                </p>
              </div>
            </div>
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.flexer} />
      <Footer />
    </div>
  );
}
