import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { Auth } from '../App'
import urlConfig from '../urls'
let urls = urlConfig[process.env.NODE_ENV];

export default class UserSignup extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      restaurant_name: '',
      restaurant_address: '',
      password: '', 
      comfirm_password: '',
    }
  }


  async onSubmit(e) {
    e.preventDefault();
    this.state.email = e.target.email.value;
    this.state.restaurant_name = e.target.restaurant_name.value;
    this.state.restaurant_address = e.target.restaurant_address.value;
    this.state.password = e.target.password.value;
    this.state.comfirm_password = e.target.confirm_password.value;
    console.log(this.state);



    // await axios({method: 'post', url: urls.userSignup, 
    //        data: {'username': this.state.username, 'password': this.state.password}, 
    //   headers: {'Content-Type': 'application/json'}
    // }).then(async (doc) => {
    //   await Auth.authenticate(() => {});
    // }).catch((err) => {});
  }

  render() {
    return (
      <div>
        <h3>New User Account</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group" > 
            <label>Email </label>
            <input  type="email"
                required
                className="form-control"
                name="email"
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
            <label>Restaurant Address </label>
            <input  type="text"
                required
                className="form-control"
                name='restaurant_address'
            />
          </div>
          <div className="form-group"> 
            <label>Password </label>
            <input  type="password"
                required
                className="form-control"
                name='password'
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