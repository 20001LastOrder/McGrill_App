import React, { Component } from 'react';
import {Button, Menu, Icon,Layout, Breadcrumb,Descriptions} from 'antd';
import Sidebar from './sidebar';

const { Header, Content, Footer, Sider } = Layout;

export default class restoHome extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    render() {
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <img src={(require('../pictures/banner.jpg'))}
                             style={{
                                 height: '10%', width: '100%'
                             }}/>
                        <Sidebar />
                    </Sider>
                    <div style={{
                        width: '1200px',
                    }}>
                        <Header style={{color: 'white'}}>Dinning Hall List</Header>
                        <Content
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
                            <Descriptions style={{height: '28', width: '50'}} title="Operating Hours" layout="vertical">
                                <Descriptions.Item label="Week Days">7:00AM - 20:30PM</Descriptions.Item>
                                <Descriptions.Item label="Weekend">8:00AM - 20:00PM</Descriptions.Item>
                            </Descriptions>

                        </Content>
                        <Content
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
                        </Content>
                    </div>

                </Layout>


            </div>

        );
    }

}
