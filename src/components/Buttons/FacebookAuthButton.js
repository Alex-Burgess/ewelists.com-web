import React from 'react';
import { Auth } from "aws-amplify";
// core components
import Button from "components/Buttons/Button.js";

export default function SocialButtons(props) {
  return (
    <Button color="google" auth fullWidth onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>
      <i className="fab fa-facebook" /> Continue with Facebook
    </Button>
  );
}
