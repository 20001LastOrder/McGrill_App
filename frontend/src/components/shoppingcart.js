import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar, Icon, Layout, Pagination, Button, Rate, Popover, Descriptions } from 'antd';
import 'antd/dist/antd.css'
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
const { Header } = Layout;
const sample_menu_item1 = {
  name: "burger",
  description: "desc1",
  price: 5,
  sold_out: false,
  stock: 12
};

const sample_menu_item2 = {
  name: "fries",
  description: "desc2",
  price: 2,
  sold_out: false,
  stock: 20
};

export default class Content extends Component {
  listdata = new Array();

  constructor(props) {
    super(props);

    this.state = {
      order_items: [],
      item_order_counts: []
    };
  }

  componentDidMount() {
    let items = localStorage.getItem('itemList') ? localStorage.getItem('itemList') : [];
    let counts = localStorage.getItem('itemQuantity') ? localStorage.getItem('itemQuantity') : [];
    items.push(sample_menu_item1);
    items.push(sample_menu_item2);
    counts.push(1);
    counts.push(2);
    let ctr = 0; 
    items.map(item => (
      this.listdata.push({
        title: item.name,
        description: item.description + ' ' + '$' + item.price,
        index : ctr++
      })));

    this.setState({ order_items: items });
    this.setState({ item_order_counts: counts });
  }



  itemRender = (current, type, originalElement) => {
    if (type == 'prev') {
      return <a>Previous</a>;
    }
    if (type == 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  }

  incrementItem = index => {
    let counts = [...this.state.item_order_counts];
    counts[index]++;
    this.setState({ item_order_counts: counts });
  };

  decreaseItem = index => {
    let counts = [...this.state.item_order_counts];
    counts[index]--;
    this.setState({ item_order_counts: counts });
  };

  render() {
    return (
      <div>
        <Header style={{ background: '#fff', height: "auto", paddingLeft: 20 }}><span style={{
          textAlign: "center",
          paddingLeft: 20
        }}><b>My Shopping Cart</b></span></Header>

        <List itemLayout="horizontal "
          bordered={true}
          size={"large"}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3
          }}
          dataSource={this.listdata}
          renderItem={item => (
            <List.Item
              actions={[
                <Grid item xs={6}>
                  <Grid container spacing={40} direction="row" justify="center"
                    alignItems="center" spacing={3}>
                    <Grid item xs={5}>
                      <IconButton onClick={() => this.incrementItem(item.index)}>
                        <AddCircleIcon></AddCircleIcon></IconButton>
                    </Grid>
                    <Grid item xs={1}>
                      {this.state.item_order_counts[item.index]}
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton onClick={() => this.decreaseItem(item.index)}><RemoveCircleIcon></RemoveCircleIcon></IconButton>
                    </Grid>
                  </Grid>
                </Grid>,
                <Popover placement={"left"} content={
                  <div>{}
                    <br /><b>Operating Hours</b>
                    <br /><b>Week Days 7:00AM - 20:30PM</b>
                    <br /><b>Weekend 8:00AM - 20:00PM</b></div>
                } title="About this restaurant" trigger="hover">
                  <Button size={"small"}>Info</Button></Popover>]}
            >
              <List.Item.Meta
                avatar={<Popover placement={"right"} content={<img style={{
                  display: 'inline-block',
                  width: '300px',
                  height: '100%',
                  padding: 10
                }} alt="example"
                />} trigger="hover">

                </Popover>}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        >
        </List>
        <div><Button variant="contained" color="primary">Checkout</Button></div>
      </div>
    );
  }
}