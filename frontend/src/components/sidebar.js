import React, { Component } from 'react';
import {Menu, Icon} from 'antd';
import MenuConfig from './ConfigData/MenuConfig'
const SubMenu = Menu.SubMenu;


export default class NavLeft extends Component{
    rootSubmenuKeys = [];
    state = {
        openKeys: [],
        collapsed: false,
    };
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
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode:menuTreeNode
        })
    };

    selectItem = (e) =>{
        console.log()
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
                </Menu>
            </div>
        )
    }


}
