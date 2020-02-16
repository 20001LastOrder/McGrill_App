import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {List, Avatar, Icon, Pagination, Button, Rate, Popover, Descriptions} from 'antd';
import 'antd/dist/antd.css'

export default class Content extends Component{
    listdata = new Array();

    componentWillMount() {
        this.listdata.push({
            href:'www.google.ca',
            title: `Royal Victoria Cafe`,
            avatar: 'pictures/rest.png',
            description:
                '3425 Rue University, Montréal, QC H3A 2A8',
            content:
                'This is RVC',
            img:
                'pictures/rvc.png'
        })

        this.listdata.push({
            href:'www.google.ca',
            title: `Carrefour Cafe`,
            avatar: 'pictures/rest.png',
            description:
                '475 Rue Sherbrooke Ouest, Montréal, QC, H3A 2L9',
            content:
                'This is C4',
            img:
                'pictures/c4.png'
        })
        this.listdata.push({
            href:'www.google.ca',
            title: `Doug`,
            avatar: 'pictures/rest.png',
            description:
                '3851 Rue University, Montréal, QC, H3A 2B4',
            content:
                'This is Doug',
            img:
                'pictures/doug.png'
        })
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
                                        }} alt="example" src={require("../"+`${item.img}`+"")}
                                                                                     />} trigger="hover">
                                      <Avatar src={require("../"+`${item.avatar}`+"")} />
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