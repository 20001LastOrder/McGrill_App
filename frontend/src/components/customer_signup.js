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
      street:'',
      city:'',
      zipcode:'',
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

    let user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      address:{
        street: this.state.street,
        city: this.state.city,
        zip: this.state.zipcode
      }
    };


  try{
      let response = await axios({method: 'post', url: urls.user_signup, 
          data: user, 
        headers: {'Content-Type': 'application/json'}
      });
      await Auth.authenticate({email:response.data.email, password:this.state.password}, () => {});
      this.props.history.push("/");
    }catch(err){
      alert(err.response.data.message);
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
            <label>Password </label>
            <input  type="password"
                required
                className="form-control"
                name='password'
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            />
          </div>
          <div className="form-group"> 
            <label>Confirm Password </label>
            <input  type="password"
                required
                className="form-control"
                name='confirm_password'
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
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