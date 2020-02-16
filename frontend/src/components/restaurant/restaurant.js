import React, { Component } from "react";
import "./restaurant.css";
import RestaurantMenu from "./restaurantMenu";
import { Link } from "react-router-dom";

export default class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Restaurant Name",
      address: {
        street: "3459 Rue McTavish",
        city: "Montreal",
        zip: "H3A 0C9"
      },
      menuItems: ["Alfredo Pasta", "Chicken Burger", "Samosa"]
    };
  }

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.state.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {this.state.address.street}, {this.state.address.city},{" "}
              {this.state.address.zip}
            </h6>

            <Link
              to={{
                pathname: this.props.location.pathname + "/edit" + "/1"
              }}
            >
              <a className="card-link">Edit</a>
            </Link>

            <div>
              <RestaurantMenu />
              <Link
                to={{
                  pathname: this.props.location.pathname + "/menu" + "/edit"
                }}
              >
                <a className="card-link">Edit</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
