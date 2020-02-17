import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import RestoNav from './restaurantNavbar';
import RestoHome from './restaurantHome';

class restaurantMainView extends Component {
    render() { 
        return (
            <Grid container>
                <Grid item xs><RestoNav/></Grid>
                <Grid item sm><RestoHome/></Grid>
               
            </Grid>
        );
    }
}

export default restaurantMainView;