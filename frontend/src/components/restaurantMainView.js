import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import RestoNav from './restaurantNavbar';
import RestoHome from './restaurantHome';

class restaurantMainView extends Component {
    state = {
        category: "Home"
    }
    handleCategorySelected = category => {
        this.setState({
            category
        })
    }
    render() { 
        const category = this.state.category
        let view;
        if(category === "Home") {
            view = <RestoHome/>
        } else if (category === "All Orders") {
            view = <h1>To be implemented</h1>
        } else if (category === "Cancelled Orders") {
            view = <h1>To be implemented</h1>
        } else if(category === "Menu") {
            view = <h1>To be implemented</h1>
        }
        return (
            <Grid container>
                <Grid item style={{width: '200px'}}>
                    <RestoNav
                        category = {category}
                        onSelect={this.handleCategorySelected} />
                </Grid>
                <Grid item xs>{view}</Grid>
               
            </Grid>
        );
    }
}

export default restaurantMainView;