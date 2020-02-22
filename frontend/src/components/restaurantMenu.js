import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, TextareaAutosize} from '@material-ui/core';
import color from '@material-ui/core/colors/amber';

class restaurantMenu extends Component {
    render() { 
        return (
            <Fragment>
          <Typography variant="h3" style={{textAlign:'center'}}>Menu</Typography>
          <form>
              <div style={{position: 'absolute', alignContent:'center'}}>
            <TextField
            id="menuCategory"
            label="Category"
            defaultValue=""
            helperText="(i.e Appetizers, Soups, etc)"
            variant="outlined"
            style={{marginTop:'20px',position: 'relative'}}
            /> <br></br>
            <TextField
            id="menuItem"
            label="Item"
            defaultValue=""
            helperText=""
            variant="outlined"
            style={{marginTop:'20px'}}
            /> <br></br>
             <TextField
            id="itemPrice"
            label="Price"
            defaultValue=""
            helperText=""
            variant="outlined"
            style={{marginTop:'20px'}}
            /><br></br>
            <textarea 
            aria-label="minimum height" 
            placeholder="Enter descrition of the item." 
            style={{resize: 'none', width:'100%', height:'100px',marginTop:'20px'}}
            /><br></br>
            </div>
           
        </form>
        </Fragment>
    );
    }
}

export default restaurantMenu;