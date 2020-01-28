import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { Auth } from '../App'

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeIsServer = this.onChangeIsServer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '', 
      isServer: false
    }
  }

  componentDidMount() {
    this.setState({ 
      username: 'yuxiangma', 
      password: '123456', 
      isServer: false
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }


  onChangeIsServer(e) {
    this.setState({
      isServer: (e.target.value === 'true')
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    await axios({method: 'post', url: 'http://localhost:5000/user/signup', 
           data: {'username': this.state.username, 'password': this.state.password, 'isServer': this.state.isServer}, 
      headers: {'Content-Type': 'application/json'}
    }).then(async (doc) => {
      await Auth.authenticate(() => {});
    }).catch((err) => {});
  }

  render() {
    return (
      <div>
        <h3>New Account</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group"> 
            <label>Password </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className='form-group'>
              <label>Account Type</label>
              <select value={this.state.isServer} onChange={this.onChangeIsServer}>
                <option selected value="true">Service Provider</option>
                <option value="false">User</option>
              </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Account" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}