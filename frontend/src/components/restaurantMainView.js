import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import RestoNav from './restaurantNavbar';
import RestoHome from './restaurantHome';
import RestoMenu from './restaurantMenu'

class restaurantMainView extends Component {
    constructor(){
        super();
       

    }
    state = {
        category: "Home"
    }
    
    handleCategorySelected = category => {
        this.setState(prevState => {
            console.log(prevState);
            return { category: category };
        });
    }

    render() {
        let view;
        if(this.state.category === "Home") {
            view = <RestoHome/>
        } else if (this.state.category === "All Orders") {
            view = <h1>To be implemented</h1>
        } else if (this.state.category === "Cancelled Orders") {
            view = <h1>To be implemented</h1>
        } else if(this.state.category === "Menu") {
            view = <RestoMenu/>
        }
        return (
            <Grid container>
                <Grid item style={{width: '200px'}}>
                    <RestoNav
                        category = {this.state.category}
                        onSelect={this.handleCategorySelected} />
                </Grid>
                <Grid item xs>{view}</Grid>
               
            </Grid>
        );
    }
}

export default restaurantMainView;