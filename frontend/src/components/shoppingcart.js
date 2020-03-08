import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {List, Avatar, Icon, Pagination, Button, Rate, Popover, Descriptions} from 'antd';
import 'antd/dist/antd.css'
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

export default class Content extends Component{
    listdata = new Array();

    constructor(props){
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
      

      items.map(item => (
        this.listdata.push({
           
            title: item.name,
            description:
                '3425 Rue University, Montréal, QC H3A 2A8',
            content:
                'This is RVC',
            img:
                'pictures/rvc.png'
        })));
      
      this.setState({order_items: items});
      this.setState({item_order_counts:counts});
    }



    itemRender = (current, type, originalElement) =>{
        if (type == 'prev'){
            return <a>Previous</a>;
        }
        if (type == 'next'){
            return <a>Next</a>;
        }
        return originalElement;
    }
    
    render() {
        return (
            <div>
                <List itemLayout="horizontal"
                      bordered={true}
                      size={"large"}
                      pagination={{
                          onChange:page => {
                              console.log(page);
                          },
                          pageSize:3
                      }}
                      dataSource={this.listdata}
                      renderItem = {item => (
                          <List.Item
                              actions={[<Rate allowHalf defaultValue={1.5} />,
                                      <Button size="small" type={"primary"}>Order</Button>,
                                  <Popover placement={"left"} content={
                                      <div>{item.content}
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
                                      padding:10
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
            </div>
        );
    }
}