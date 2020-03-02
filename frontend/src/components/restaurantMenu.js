import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, Button} from '@material-ui/core';
import color from '@material-ui/core/colors/amber';
import axios from 'axios';


class restaurantMenu extends Component {
    constructor(props) {
        super(props);

        this.state={
            name:'',
            description:'',
            price:'',
            stock:'',
            food_type:''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        console.log(this.state);
    }
    render() {
        const {food_type,name,price,stock,description} = this.state 
        return (
            <Fragment>
          <Typography variant="h3" style={{textAlign:'center'}}>Menu</Typography>
          <form onSubmit={this.submitHandler}>
              <div style={{position: 'absolute', alignContent:'center'}}>
            <TextField
            id="food_type"
            label="Category"
            value={food_type}
            helperText="(i.e Appetizers, Soups, etc)"
            variant="outlined"
            style={{marginTop:'20px',position: 'relative'}}
            onChange={this.changeHandler}
            /> <br></br>
            <TextField
            id="name"
            label="Item"
            value={name}
            helperText=""
            variant="outlined"
            style={{marginTop:'20px'}}
            onChange={this.changeHandler}
            /> <br></br>
             <TextField
            id="price"
            label="Price"
            value={price}
            helperText=""
            variant="outlined"
            style={{marginTop:'20px'}}
            onChange={this.changeHandler}
            /><br></br>
             <TextField
            id="stock"
            label="Stock"
            value={stock}
            helperText=""
            variant="outlined"
            style={{marginTop:'20px'}}
            onChange={this.changeHandler}
            /><br></br>
            <textarea 
            id="description"
            value={description}
            aria-label="minimum height" 
            placeholder="Enter descrition of the item." 
            style={{resize: 'none', width:'100%', height:'100px',marginTop:'20px'}}
            onChange={this.changeHandler}
            /><br></br>
            <Button variant="contained" color="primary" type='submit'>Submit</Button>
            </div> 
        </form>
        </Fragment>
    );
    }
}

export default restaurantMenu;