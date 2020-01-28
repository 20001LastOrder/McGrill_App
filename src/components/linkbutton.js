import React from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import PropTypes from 'prop-types'
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'

const LinkButton = ({ history, location, match, staticContext, to, onClick, ...rest }) => {
  return (
    <Button
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default withRouter(LinkButton);
