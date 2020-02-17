import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/icons
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
// core components
import Button from "components/CustomButtons/Button.js";

export default function BackToLink(props) {
  const { listId } = props;

  return (
    <a href={"/lists/" + listId}>
     <Button color="primary" simple>
       <ArrowBackIos /> Back to list
     </Button>
    </a>
  );
}

BackToLink.propTypes = {
  listId: PropTypes.string,
};
