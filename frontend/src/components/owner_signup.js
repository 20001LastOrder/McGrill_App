import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import {Auth} from '../App'
import urlConfig from '../urls'

let urls = urlConfig[process.env.NODE_ENV];

function getAllAttributes(state, form){
  let keys = Object.keys(state);
  keys.forEach((key)=>{
    state[key] = form[key].value;
  })
  return state;
}

export default class OwnerSignup extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name:'',
      email: '',
      street:'',
      city:'',
      zipcode:'',
      restaurant_name: '',
      restaurant_street: '',
      restaurant_city: '',
      restaurant_zipcode:'',
      password: '', 
      confirm_password: '',
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    this.state = getAllAttributes(this.state, e.target);
    if(this.state.password !== this.state.confirm_password){
      alert("password does not match");
      return;
    }
    console.log(this.state.street)
    let owner = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      address:{
        street: this.state.street,
        city: this.state.city,
        zip: this.state.zipcode
      }
    };

    let restaurant = {
      name: this.state.restaurant_name,
      address: {
          street: this.state.restaurant_street,
          city: this.state.restaurant_city,
          zip: this.state.restaurant_zipcode
      }
    };


  try{
      let response = await axios({method: 'post', url: urls.owner_signup, 
          data: {owner: owner, restaurant: restaurant}, 
        headers: {'Content-Type': 'application/json'}
      });
      await Auth.authenticate({email:response.data.email, password:this.state.password}, () => {});
      window.location.href = '/'
    }catch(err){
      console.log(err.response);
    }
  }

  render() {
    return (
      <div>
        <h3>New Restaurant Owner Account</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group" > 
            <label>Name </label>
            <input  type="text"
                required
                className="form-control"
                name="name"
            />
          </div>
          <div className="form-group" > 
            <label>Email </label>
            <input  type="email"
                required
                className="form-control"
                name="email"
            />
          </div>
          <div className="form-group"> 
            <label>Street</label>
            <input  type="text"
                required
                className="form-control"
                name='street'
            />
         </div>
         <div className="form-group"> 
            <label>City</label>
            <input  type="text"
                required
                className="form-control"
                name='city'
            />
         </div>
         <div className="form-group"> 
            <label>Zipcode</label>
            <input  type="text"
                required
                className="form-control"
                name='zipcode'
            />
         </div>
         <div className="form-group"> 
            <label>Restaurant Name </label>
            <input  type="text"
                required
                className="form-control"
                name='restaurant_name'
            />
         </div>
        <div className="form-group"> 
            <label>Restaurant Street </label>
            <input  type="text"
                required
                className="form-control"
                name='restaurant_street'
            />
          </div>
          <div className="form-group"> 
            <label>Restaurant City </label>
            <input  type="text"
                required
                className="form-control"
                name='restaurant_city'
            />
          </div>
          <div className="form-group"> 
            <label>Restaurant Zipcode </label>
            <input  type="text"
                required
                className="form-control"
                name='restaurant_zipcode'
            />
          </div>
          <div className="form-group"> 
            <label>Password </label>
            <input  type="password"
                required
                className="form-control"
                name='password'
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
          </div>
          <div className="form-group"> 
            <label>Confirm Password </label>
            <input  type="password"
                required
                className="form-control"
                name='confirm_password'
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Create Account" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}