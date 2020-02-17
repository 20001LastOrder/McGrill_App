import React, { Component } from 'react';
import ContentPanel from './content';
import {Icon,Layout} from 'antd';

const {Header, Footer, Content} = Layout;

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
                        }}><b>Dining Hall List</b></span>
                    </Header>
                    <Content
                        style={{
                            margin: '20px 15px',
                            padding: 14,
                            background: '#fff',
                            minHeight: 280,
                        }}>
                        <ContentPanel />
                    </Content>

                    <Footer style={{ textAlign: 'center' }}><Icon type="tool" /> 2020 Created by McGrill</Footer>
                </Layout>
        );
    }
}
