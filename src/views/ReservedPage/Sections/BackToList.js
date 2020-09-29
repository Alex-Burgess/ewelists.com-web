import React from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/icons
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
// core components
import Button from "components/Buttons/Button.js";

export default function BackToLink(props) {
  const { listId } = props;

  return (
    <Link to={"/lists/" + listId} data-cy="link-back-to-list">
     <Button color="primary" simple>
       <ArrowBackIos /> Back to list
     </Button>
   </Link>
  );
}

BackToLink.propTypes = {
  listId: PropTypes.string,
};
