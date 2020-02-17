import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import color from '@material-ui/core/colors/amber';

class restaurantHome extends Component {
    constructor(){
        super();
        this.state ={
            pendingOrders: ['#111','#222','#333'],
            currentOrders: [],
            readyOrders: []
        }
    }

    getPendingOrders=function() {
        this.state.pendingOrders.map((x) => {
            console.log(x);
            return (<Grid item xs>{x}</Grid>);
        });
    }

    getCurrentOrders=function() {

    }

    getReadyOrders=function() {
        
    }

    render() { 
        return (
          <Grid container style={{marginTop: '30px'},{marginLeft: '10px'}, {outlineStyle: 'black'}}>
             <Grid item xs style={{textAlign:'center'}}>
                 <Typography>Pending</Typography>
                 <div>{this.getPendingOrders()}</div>
            </Grid>
             <Grid item xs style={{textAlign:'center'}}>
                 <Typography>Current</Typography>
                 <Grid item>{this.getCurrentOrders()}</Grid>
            </Grid>
             <Grid item xs style={{textAlign:'center'}}>
                 Ready
                 <Grid item>{this.getReadyOrders()}</Grid>
            </Grid>
          </Grid>
        );
    }
}

export default restaurantHome;