import React, { Component } from "react";
import './restaurantMenu.css';

export default class RestaurantMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
      return(
          <div className="menu">
              Restaurant Menu
          </div>
      );
  }
}