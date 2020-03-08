import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, Button,TableContainer,TableCell,Table,TableBody,TableHead,TableRow,Paper } from '@material-ui/core';
import axios from 'axios';
import { Auth } from '../App';


class restaurantMenu extends Component {
    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);

        this.state={
            create:{
                name:'',
                description:'',
                price:'',
                stock:'',
                food_type:''
            },
            items:[{}]        
        }
    }

    changeHandler = (e) => {
        e.persist();
        this.setState(prevState => ({
            create:{
              ...prevState.create,
              [e.target.name]: e.target.value
            }
          }));
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            items: [...prevState.items,this.state.create]
        }))
        axios({
            method:'post',
            url:'http://localhost:5000/menu/item/create?restaurantId=' + '5e648544a8b75434d08510b5',
            body: this.state.create,
            headers: {
            'Content-Type': 'application/json'
        }})
        .then(async (doc) => {

         }).catch((err) => {console.log(err)});
        }
    render() {
        const {
            food_type,
            name,
            price,
            stock,
            description
        } = this.state.create;
        const items = this.state.items;
        console.log('HERE:  '+items[1]);
        return (
        <Fragment>
          <Typography variant="h3" style={{textAlign:'center'}}>Menu</Typography>
          <form onSubmit={this.submitHandler}>
              <div style={{marginLeft:'50px'}}>
            <TextField
                name="food_type"
                label="Category"
                defaultValue={food_type}
                helperText="(i.e Appetizers, Soups, etc)"
                variant="outlined"
                style={{marginTop:'20px'}}
                onChange={this.changeHandler}
            /> <br></br>
            <TextField
                name="name"
                label="Item"
                defaultValue={name}
                helperText=""
                variant="outlined"
                style={{marginTop:'20px'}}
                onChange={this.changeHandler}
            /> <br></br>
             <TextField
                name="price"
                label="Price"
                defaultValue={price}
                helperText=""
                variant="outlined"
                style={{marginTop:'20px'}}
                onChange={this.changeHandler}
            /><br></br>
             <TextField
                name="stock"
                label="Stock"
                defaultValue={stock}
                helperText=""
                variant="outlined"
                style={{marginTop:'20px'}}
                onChange={this.changeHandler}
            /><br></br>
            <textarea 
                name="description"
                defaultValue={description}
                aria-label="minimum height" 
                placeholder="Enter descrition of the item." 
                style={{resize: 'none', width:'17%', height:'100px',marginTop:'20px'}}
                onChange={this.changeHandler}
            /><br></br>
            <Button variant="contained" color="primary" type='submit'>Submit</Button>
            </div> 
        </form>
        <TableContainer component={Paper}>
            <Table aria-label="simple table" style={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Item name</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Price&nbsp;($/unit)</TableCell>
                        <TableCell align="right">Stock&nbsp;(unit)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="right">{row.food_type}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.stock}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Fragment>
    );
    }
}

export default restaurantMenu;