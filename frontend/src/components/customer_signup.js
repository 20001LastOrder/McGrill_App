import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { Auth } from '../App'
import urlConfig from '../urls'

let urls = urlConfig[process.env.NODE_ENV];

function getAllAttributes(state, form){
  let keys = Object.keys(state);
  keys.forEach((key)=>{
    state[key] = form[key].value;
  })
  return state;
}

export default class CustomerSignup extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name:'',
      email: '',
      address:'',
      city:'',
      zipcode:'',
      password: '', 
      confirm_password: '',
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    this.state = getAllAttributes(this.state, e.target);
    let user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      address:{
        street: this.state.address,
        city: this.state.city,
        zip: this.state.zipcode
      }
    };


  try{
      let response = await axios({method: 'post', url: urls.user_signup, 
          data: {user}, 
        headers: {'Content-Type': 'application/json'}
      });
      await Auth.authenticate({email:response.data.email, password:this.state.password}, () => {});
      this.props.history.push("/");
    }catch(err){
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <h3>New Customer Account</h3>
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
            <label>Address</label>
            <input  type="text"
                required
                className="form-control"
                name='address'
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