import React from 'react';
import { Auth } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import Button from "components/Buttons/Button.js";


export default function LetsGoButton(props) {
  const { account } = props;

  return (
      <Button color="primary" fullWidth onClick={() => Auth.federatedSignIn({provider: account})}>
        Get Started
      </Button>
  );
}


LetsGoButton.propTypes = {
  account: PropTypes.oneOf([
    "Google",
    "Facebook"
  ]),
};
