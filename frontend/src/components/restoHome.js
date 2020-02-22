import React, { Component } from 'react';
import {Button, Menu, Icon,Layout, Breadcrumb,Descriptions} from 'antd';
import Sidebar from './sidebar';
import urlConfig from '../urls'
import axios from 'axios';
let urls = urlConfig[process.env.NODE_ENV];

const { Header, Content, Footer, Sider } = Layout;

export default class restoHome extends Component {
    state = {
        collapsed: false,
        restaurants: []
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    async queryRestaurants(){
        try{
            let response = await axios({method: 'get', url: urls.all_restaurants,
                data: {}, 
              headers: {'Content-Type': 'application/json'}
            });
            console.log(response);
            //this.state.restaurants = this.createRestoInfo(response.data);
            let restaurants = this.createRestoInfo(response.data);
            this.setState({
                restaurants: restaurants,
            });
            console.log(this.state.restaurants)
          }catch(err){
            console.log(err.response);
          }
    }

    createRestoInfo(restos){
        return restos.map((item)=>{
            return<Content name={item.name}
                style={{
                    margin: '20px 15px',
                    padding: 14,
                    background: '#fff',
                    minHeight: 280,
                    columnCount:2,
                }}

            >
                <img  src={(require('../pictures/rvc.png'))}
                    style={{
                        height: '280', width: '10'
                    }}
                />
                <Descriptions style={{height: '28', width: '50'}} title={item.name} layout="vertical"></Descriptions>
                <Descriptions style={{height: '28', width: '50'}} title="Operating Hours" layout="vertical">
                    <Descriptions.Item label="Week Days">7:00AM - 20:30PM</Descriptions.Item>
                    <Descriptions.Item label="Weekend">8:00AM - 20:00PM</Descriptions.Item>
                </Descriptions>
                <Descriptions style={{height: '28', width: '50'}} title="Address" layout="vertical">
                    <Descriptions.Item label="Street">{item.address.street}</Descriptions.Item>
                    <Descriptions.Item label="City">{item.address.city}</Descriptions.Item>
                    <Descriptions.Item label="Zipcode">{item.address.zip}</Descriptions.Item>
                </Descriptions>
            </Content>
        })
    }

    componentDidMount = ()=>{
        this.queryRestaurants();
    }


    render() {
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    {/* <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <img src={(require('../pictures/banner.jpg'))}
                             style={{
                                 height: '10%', width: '100%'
                             }}/>
                        <Sidebar />
                    </Sider> */}
                    <div style={{
                        width: '1200px',
                    }}>
                        <Header style={{color: 'white'}}>Dinning Hall List</Header>
                        {this.state.restaurants}
                        {/* <Content
                            style={{
                                margin: '20px 15px',
                                padding: 14,
                                background: '#fff',
                                minHeight: 280,
                            }}>
                            <img src={(require('../pictures/c4.png'))}
                                 style={{
                                     height: '280', width: '10'
                                 }}/>
                        </Content>
                        <Content
                            style={{
                                margin: '20px 15px',
                                padding: 14,
                                background: '#fff',
                                minHeight: 280,
                            }}>
                            <img src={(require('../pictures/doug.png'))}
                                 style={{
                                     height: '280', width: '10'
                                 }}/>
                        </Content> */}
                    </div>
                </Layout>


            </div>

        );
    }

}
