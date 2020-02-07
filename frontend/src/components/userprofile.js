import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { Form, Button, ButtonGroup, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import profilesettings from './profilesettings';


export default class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <div align="center">
            <ButtonGroup vertical> 
            <Button variant="primary" size="lg">
                Favourites
            </Button>
            <Button variant="primary" size="lg">
                My Order History
            </Button>
            <Button variant="primary" size="lg">
                Addresses
            </Button>

            <Button variant="primary" size="lg">
                Wallet
            </Button>

            <Button onClick={event =>  window.location.href='/profilesettings'} variant="primary" size="lg">
                Profile Settings
            </Button>
            </ButtonGroup>  
          </div>
        )
      }
}