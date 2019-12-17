import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import FooterGrey from "custom/Footer/FooterGrey.js";
import HeaderFixed from "custom/Header/HeaderFixed.js";

import styles from "assets/jss/custom/views/termsPageStyle.js";
const useStyles = makeStyles(styles);

export default function TermsPage(props) {
  const classes = useStyles();
  return (
    <div>
      <HeaderFixed isAuthenticated={props.isAuthenticated} />

      <div className={classes.main}>
        <div className={classes.termsContent}>
          <div className={classes.container}>
            <h1 className={classes.title}>Terms of Service</h1>

            <div className={classes.textContent}>
              <h3 className={classes.title}>
                Using Our Service
              </h3>
              <p>
                The internet site <u>ewelists.com</u> <b>("Site")</b> is provided by Ewelists Ltd <b>("Ewelists")</b>.
                The Site provides Users with access to information and gift ideas, and provides a free service to
                create and exchange gift ideas <b>("Services")</b>. These terms of service <b>("Terms")</b> and the
                Privacy Policy <b>("Privacy Policy")</b> apply to the use of those Services provided to You by Ewelists.
              </p>
              <p>
                Please read the Terms and Privacy Policy carefully. By using the Site, You accept the
                Terms and the Privacy Policy and You agree to comply with them.
              </p>
              <p>
                We may update the Terms from time to time without notice to You. Please ensure that You
                review the Terms regularly as You will be deemed to have accepted any variation if You
                continue to use the Services after it has been posted.
              </p>
              <h3 className={classes.title}>
                Information about Ewelists Ltd
              </h3>
              <p>
                Ewelists Ltd is a limited company registered in England and Wales under company number
                12215603 and Our registered office is Lytchett House 13 Freeland Park, Wareham Road,
                Poole, Dorset, United Kingdom, BH16 6FA.
              </p>
              <h3 className={classes.title}>
                Definitions
              </h3>
              <p>
                "<u>Content</u>" means all Content contained in the Site, including all text, images, audio Content,
                videos, designs, graphics, information, logos, downloadable Content, software, and any other Content
                contained therein and all related patents, copyrights, trademarks, service marks, intellectual property
                and/or other proprietary information of Ewelists.
              </p>
              <p>
                "<u>We</u>", "<u>Us</u>", and "<u>Our</u>" mean and refer to Ewelists and its parents, subsidiaries or
                affiliates.
              </p>
              <p>
                "<u>Site</u>" means any websites, web pages, and any subpages (including any mobile websites, web pages
                  and subpages) under Ewelists control, whether partial or otherwise.
              </p>
              <p>
                "<u>You</u>", "<u>Your</u>", and "<u>User</u>" mean and refer to all individuals and/or entities who are
                accessing or using the Site or the Services for any reason.
              </p>
              <h3 className={classes.title}>
                Provision of Services
              </h3>
              <p>
                To use the Services, You must register and create an account with Ewelists and comply with any applicable
                guidelines set out in the Site.  By creating an account, You represent that (i) You are over the age of 18,
                (ii) You are responsible for maintaining the confidentiality of Your account and password, and (iii) You
                accept responsibility for all activities that occur under Your account, password and any logins associated
                with Your account. You hereby represent that all registration information You submit is accurate, current
                and complete and that You are solely responsible for the accuracy of such information. You agree to update
                Your account information to keep it current and accurate.
              </p>
              <p>
                You agree not to impersonate or misrepresent Your affiliation with any person or entity, including using
                another person’s Username, password or other account information, another person’s name or likeness or
                provide false details, unless and only in the circumstance that You have been authorised to create a login
                associated with another User’s account. Ewelists reserves the right to accept or refuse Your application
                for an account.
              </p>
              <p>
                Subject to these Terms, Ewelists agrees to provide the Services to You free of charge. Ewelists may include
                affiliate links on the Site to merchants{"'"} websites and in return Ewelists may receive money from such merchants
                for purchases made by You, Your family or friends after clicking through the affiliate links.
              </p>
              <p>
                Your correspondence or dealings with affiliates or merchants found on this Site or through the Services,
                including payment and delivery of related goods or Services, and any other terms, conditions, warranties
                or representations associated with such dealings, are solely between You and such affiliate or merchant.
                To the fullest extent permitted by applicable law, You agree that: (a) We shall not be responsible or
                liable for any loss or damage of any kind incurred as a result of any such dealings or as the result
                of the presence of such affiliates or merchants on this Site or the Services, and (b) any orders placed
                by You on the Services are subject to confirmation by, and the terms and conditions of business of, the
                relevant affiliate or merchant.
              </p>
              <p>
                Ewelists shall use reasonable endeavours to provide the Services on and subject to these Terms provided
                always that: (a) Ewelists may change, suspend, or discontinue all or part of the Services at any time,
                with or without reason; and (b) the Services may not be available at all times due to either planned
                maintenance or unavailability of the Services caused by circumstances beyond the control of Ewelists.
                You agree that the operation of the Services is reliant upon cooperation from third parties and the
                Services may from time to time encounter technical or other problems and may not necessarily continue
                uninterrupted or without technical or other errors and Ewelists shall not be responsible to You or any
                other party for any such interruptions, errors or problems or an outright discontinuance of the Services.
              </p>
              <h3 className={classes.title}>
                Usage
              </h3>
              <p>
                You agree and warrant that You will not use the Services in a manner that is illegal or otherwise
                inconsistent with these Terms. In addition, You will not use the Services in a manner that Ewelists
                deems, in its sole discretion, objectionable.
              </p>
              <p>
                You agree that You will access the Services only through the interfaces provided. You agree not to do
                any of the following:
                <ul>
                  <li>
                    Attempt to decipher, decompile, disassemble or reverse engineer or otherwise hack the Site or any
                    software, network or servers used to provide the Services, or to damage Site, Services or other
                    property in any way;
                  </li>
                  <li>
                    Not misuse this Site by knowingly introducing viruses, trojans, worms, logic bombs or other
                    material which is malicious or technologically harmful;
                  </li>
                  <li>
                    Attempt to breach any security or authentication measures of the Site or the Services;
                  </li>
                  <li>
                    Avoid, bypass, remove, deactivate, impair, descramble or otherwise circumvent any technological
                    measure implemented by Ewelists or any other third party to protect the Services or the Content;
                  </li>
                  <li>
                    Use the Services, Your account, or communications with other Users for any commercial purpose or
                    solicitation;
                  </li>
                  <li>
                    Interfere or attempt to interfere with other Users’ use of the Services;
                  </li>
                  <li>
                    Defame, abuse, stalk, threaten, intimidate, harass or otherwise violate the legal rights,
                    including such person's privacy rights or rights of publicity, of any User, third parties or
                    employee, staff or agent of Ewelists
                  </li>
                  <li>
                    Do anything that could disable, damage, tamper with, impair or otherwise cause interruptions to
                    the proper working of the Services;
                  </li>
                  <li>
                    Send spam or any other unauthorised advertisements or solicitations through or using the Services;
                  </li>
                  <li>
                    Attempt, encourage or facilitate any of the above.
                  </li>
                </ul>
              </p>
              <p>
                By breaching any of these provisions, You would commit a criminal offence. We will report any such
                breach to the relevant law enforcement authorities and We will co-operate with those authorities by
                disclosing Your identity to them. In the event of such a breach, Your right to use this Site will
                cease immediately.
              </p>
              <p>
                It is Your responsibility to ensure You have adequate anti-virus software installed. We accept no
                responsibility for any bug, virus, infection or contamination and You will be solely responsible for
                any damage to Your computer system or mobile device or loss of data resulting from use of this Site
                or the Services.
              </p>
              <h3 className={classes.title}>
                No Reliance
              </h3>
              <p>
                The Content on this Site is provided for general information and educational purposes only and it is not
                intended to amount to advice on which You should rely. Although We make reasonable efforts to update
                the information on this Site, it makes no representations, warranties or guarantees, whether express
                or implied, that the Content on this Site is accurate, complete or up-to-date.
              </p>
              <h3 className={classes.title}>
                User Content
              </h3>
              <p>
                You grant to Ewelists irrevocable, royalty-free, non-exclusive, sub-licensable license to use,
                reproduce, create derivative works of, distribute, publicly perform, publicly display, transfer,
                transmit, distribute, and publish any User Content. Ewelists takes no responsibility and assumes no
                liability for any User Content that You or any other User of the Services posts, sends, or otherwise
                uses in connection with the Services. You agree that You shall solely be responsible for Your User
                Content and the consequences of posting and publishing it, and that Ewelists is only acting as a
                passive conduit for the online distribution and publication of User Content. Ewelists reserves the
                right to terminate Your access to the Website and/or Your use of the Services if You infringe the
                intellectual property or other rights of any third party.
              </p>
              <h3 className={classes.title}>
                Disclaimers
              </h3>
              <p>
                To the fullest extent permitted by law, We disclaim all warranties, conditions and other terms of any
                kind, whether express or implied, with regard to the Services, this Site or the materials contained on
                this Site, including without limitation any implied terms of satisfactory quality, fitness for a
                particular purpose or as to the provision of Services to a standard of reasonable care and skill. Your
                use of this Site and the Services is at Your own risk and is on an "as is" and "as available" basis.
              </p>
              <p>
                We make no warranty or representation that this Site or the Services will meet Your requirements or
                that it will be uninterrupted, timely or secure.
              </p>
              <h3 className={classes.title}>
                Intellectual Property
              </h3>
              <p>
                The Services are protected under patent, copyright, trademark, and/or other laws. Subject to Your
                compliance with the Terms, Ewelists and/or its licensors provide You with a limited, non-exclusive,
                non-transferable, non-sublicensable license to access and make personal and non-commercial use of the
                Services. The Services and all Content, including, without limitation, any User Content, remain the
                property of Ewelists or its licensors and We do not transfer title to any portion of the Services to
                You. The compilation, collection, arrangement, or assembly of all Content is the exclusive property of
                Ewelists and protected as well. Any code or software code that Ewelists creates, generates or
                displays in the Services is also protected and You may not copy or adapt such code.
              </p>
              <p>
                Unauthorised use of the Services may violate applicable laws and is strictly prohibited. You may not
                copy the Services or any part thereof without Ewelists prior written authorisation. Any code or
                software code that Ewelists creates to generate or display the Services are also protected by
                Ewelists copyrights, and You may not copy or adapt such code.
              </p>
              <h3 className={classes.title}>
                Limitation of Liability
              </h3>
              <p>
                You expressly acknowledge and agree that to the fullest extent permitted by applicable law We shall not
                be liable for any direct, indirect, special or consequential loss (including loss of income or revenue,
                loss of business, loss of profits or contracts, loss of anticipated savings, loss of data, loss of
                goodwill or wasted management or office time), damage, costs, expenses or claims, whether based on
                breach of contract, tort (including negligence), product liability or otherwise arising out of or in
                connection with this Site, the Services or in connection with the use, inability to use, or results of
                the use of this Site, any websites linked to or from it and any materials posted on it.
              </p>
              <p>
                You acknowledge and agree that the limitations set out above are fundamental elements of the Terms and
                this Site and the Services would not be provided to You if such limitations did not apply.
              </p>
              <h3 className={classes.title}>
                Indemnity
              </h3>
              <p>
                You agree to indemnify and hold harmless Ewelists  its affiliates and suppliers from any liability,
                loss, claim and expense (including reasonable legal fees) made by a third party directly or indirectly
                related to Your breach of the Terms or any other use by You of the Site or the Services.
              </p>
              <h3 className={classes.title}>
                Proprietary Rights
              </h3>
              <p>
                You acknowledge and agree that all copyright and other intellectual property rights in relation to this
                Site and the Services (including without limitation the design and contents of the pages) are vested in,
                or licensed to, Us. Those works are protected by copyright laws and treaties around the world.  All such
                rights are reserved.
              </p>
              <p>
                Information may be accessed, downloaded, or printed only for Your personal non-commercial use. You may
                not copy, reproduce, publish, distribute, create derivative works of, sell, transfer, display, transmit,
                compile or collect in a database, any part of the Site or this Services without prior written permission
                from Us or Our licensors.
              </p>
              <p>
                You must not modify the paper or digital copies of any materials You have printed off or downloaded in
                any way, and You must not use any illustrations, photographs, video or audio sequences or any graphics
                separately from any accompanying text. Our status (and that of any identified contributors) as the authors
                of Content on the Site must always be acknowledged.
              </p>
              <p>
                You must abide by all copyright notices, information, or restrictions contained in or attached to any
                part of this Site or the Services. If You breach these terms, Your right to use the Site will cease
                immediately and You must, at Our option, return or destroy any copies of the materials You have made.
              </p>
              <h3 className={classes.title}>
                General
              </h3>
              <p>
                The Terms of Use shall be governed by and construed and interpreted in accordance with the laws of England and You and Ewelists agree to submit to the non-exclusive jurisdiction of the English Courts. Our failure to insist upon strict enforcement of any provision of the Terms shall not be construed as a waiver of any provision or right.
              </p>
              <p>
                If any provision of the Terms is found by a court of competent jurisdiction to be invalid the parties nevertheless agree that the court should endeavour to give effect to the parties, intentions as reflected in the provision, and the other provisions of the Terms shall remain in full force and effect. The section titles in the Terms are for convenience only and have no legal or contractual effect.
              </p>
              <p>
                We reserve the right to access any personal data to comply with applicable laws and lawful government requests. If You fail to comply with the Terms and this failure results in a third party complaint, We reserve the right to disclose individually identifiable information to the third party where applicable.
              </p>
              <h3 className={classes.title}>
                Contact
              </h3>
              <p>
                To contact Us, please email contact@ewelists.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterGrey />
    </div>
  );
}
