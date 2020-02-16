import React, { Component } from "react";
import "./restaurant.css";
import RestaurantMenu from "./restaurantMenu";
import './editRestaurant.css'

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

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <h1>Edit Restaurant Information</h1>
        <form>
          <div class="form-row">
          </div>
          <div class="form-group">
            <label for="inputAddress">Name</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="McGrill Eat Now"
            />
          </div>
          <div class="form-group">
            <label for="inputAddress2">Address</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="3459 Rue McTavish"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">Montreal</label>
              <input type="text" class="form-control" id="inputCity" />
            </div>
            <div class="form-group col-md-2">
              <label for="inputZip">Zip</label>
              <input type="text" class="form-control" id="inputZip" />
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Save
          </button>
          <button type="submit" class="btn btn-danger">
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
