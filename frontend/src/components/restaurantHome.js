import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import orderModal from './restaurantOrder'

class restaurantHome extends Component {
    constructor(){
        super();
        this.state ={
            pendingOrders: ['#111','#222','#333'],
            currentOrders: ["#412",'#1276'],
            readyOrders: ["#9875"]
        }
    }
    async queryOrders(){
        try{
            let response = await axios({method: 'get', url: 'http://localhost:5000/getCurrentOrders',
                data: {}, 
              headers: {'Content-Type': 'application/json'}
            });
            console.log(response);
          }catch(err){
            console.log(err.response);
          }
    }
    componentWillMount() {

    }
    handleOnClick=(e) => {
       return <orderModal></orderModal>

    }
    getPendingOrders=function() {
        return this.state.pendingOrders.map((x) => {
            return (<Grid item xs
                style={{background: "#FFF06E",
                        marginTop:"40px", marginLeft:"40px",
                        padding:"40px",
                        borderRadius: 20}}
                   ><Button  onClick={this.handleOnClick}>{x}</Button></Grid>);
            });
    }

    getCurrentOrders=function() {
        return this.state.currentOrders.map((x) => {
            return (<Grid item xs
                style={{background: "#B3F1F7",
                        marginTop:"40px", marginLeft:"40px",
                        padding:"40px",
                        borderRadius: 20}}>{x}</Grid>);
        });
    }

    getReadyOrders=function() {
        return this.state.readyOrders.map((x) => {
            return (<Grid item xs
                style={{background: "#DAF7A6",
                        marginTop:"40px", marginLeft:"40px",
                        padding:"40px",
                        borderRadius: 20}}>{x}</Grid>);
        });
    }

    render() { 
        return (
          <Grid container style={{marginTop: '30px', marginLeft: '10px',  border: 'black'}}>
             <Grid item xs style={{textAlign:'center'}}>
                 <Typography variant='h5'>Pending</Typography>
                <Grid item xs>{this.getPendingOrders()}</Grid>
            </Grid>
             <Grid item xs style={{textAlign:'center'}}>
                 <Typography variant='h5'>Current</Typography>
                 <Grid item>{this.getCurrentOrders()}</Grid>
            </Grid>
             <Grid item xs style={{textAlign:'center'}}>
                 <Typography variant='h5'>Ready</Typography>
                 <Grid item>{this.getReadyOrders()}</Grid>
            </Grid>
          </Grid>
        );
    }
}

export default restaurantHome;