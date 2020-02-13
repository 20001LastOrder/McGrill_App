import React, { Component } from 'react';
import Sidebar from './sidebar';
import {Button, Menu, Icon,Layout, Breadcrumb} from 'antd';

const {Header, Sider, Footer, Content} = Layout;
const SubMenu = Menu.SubMenu;

export default class homelayout extends Component{
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
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                         <img src={(require('../pictures/banner.jpg'))}
                              style={{
                             height: '10%', width: '100%'
                         }}/>
                    <Sidebar />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', height:"auto", paddingLeft:20}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            style={{
                                alignItems:"center"
                            }}
                        />
                        <span style={{
                            textAlign:"center",
                            paddingLeft:20
                        }}>Saved Space</span>
                    </Header>
                    <Content
                        style={{
                            margin: '20px 15px',
                            padding: 14,
                            background: '#fff',
                            minHeight: 280,
                        }}>
                        Content
                    </Content>

                    <Footer style={{ textAlign: 'center' }}><Icon type="tool" /> 2020 Created by McGrill</Footer>
                </Layout>
            </Layout>
        );
    }

}