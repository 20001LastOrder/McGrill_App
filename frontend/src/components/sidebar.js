import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import {Menu, Icon} from 'antd';
import MenuConfig from './ConfigData/MenuConfig'
import AuthContext from '../context/auth_context'

const SubMenu = Menu.SubMenu;


export default class NavLeft extends Component{
    rootSubmenuKeys = [];
    

    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            collapsed: false,
        };
      }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1){
            this.setState({openKeys});
        } else{
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey]:[],
            });
        }
    };
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig.always);
        console.log(window.localStorage.getItem('token'))
        const guestNode = this.renderMenu(MenuConfig.guest);
        const allUserNode = this.renderMenu(MenuConfig.allUser);
        const ownerNode = this.renderMenu(MenuConfig.restaurantOwner);

        this.setState({
            menuTreeNode:menuTreeNode,
            guestNode: guestNode,
            allUserNode: allUserNode,
            ownerNode: ownerNode
        })
    };

    selectItem = (e) =>{
        window.location.href = e.key;
    }

    renderMenu = (data) => {
        return data.map((item)=>{
            if(item.children){
                this.rootSubmenuKeys.push(item.key)
                return (
                    <SubMenu title = {
                        <span>
                            <Icon type ={item.icon}/>
                            <span>{item.title}</span>
                        </span>
                    } key={item.key} >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }

            return (
                <Menu.Item title={item.title} key={item.key} onClick={this.selectItem} >
                    <span>
                            <Icon type ={item.icon}/>
                            <span>{item.title}</span>
                        </span>
                </Menu.Item>
            )
        })
    }

    render() {
        return(
            <div>
                <Menu theme='dark' mode="inline" defaultSelectedKeys={'/admin/home'}
                      inlineCollapsed={this.state.collapsed}
                      openKeys={this.state.openKeys}
                      onOpenChange={this.onOpenChange}>
                    {this.state.menuTreeNode}
                    {window.localStorage.getItem('token')===null? this.state.guestNode:this.state.allUserNode}
                    
                </Menu>
            </div>
        )
    }


}
