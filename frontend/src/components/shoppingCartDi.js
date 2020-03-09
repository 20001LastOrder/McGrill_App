import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {List,Tooltip, Modal, Button, Icon} from "antd";


export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data:[]
        };
    }

    showModal = () =>{
        this.setState({
            visible: true,
        })
    };

    handleOk = () =>{
        this.setState({loading:true});
        setTimeout(()=>{
            this.setState({loading:false,visible:false});
        }, 3000)
    }

    handleCancel = () =>{
        this.setState({visible: false});
    };

    getTotalPrice = () =>{
        let sum = 0;
        this.state.data.forEach(
            (item)=>{
                sum = sum+(item.count*item.item.price)
            }
        )
        return sum
    }

    componentDidMount() {
        this.setState({data:this.props.data})
    }

    incrementCount=(index)=>{
        let change = this.state.data
        change[index].count++
        this.setState({data:change})
    }

    decrementCount=(index)=>{
        let change = this.state.data
        change[index].count--
        this.setState({data:change})
    }

    render(){
        const{visible, loading} = this.state;
        let renderList = this.state.data
        for(var i=0; i<renderList.length;i++){
            renderList[i].id=i
        }
        renderList= renderList.filter(item=>{
            return item.count !==0;
        })
        let totalPrice = this.getTotalPrice();
        return(
            <div>
                <Tooltip title="My cart">
                <Button id='cartPic' type="primary" shape={"circle"} onClick={this.showModal}>
                    <Icon type="shopping-cart" />
                </Button>
                </Tooltip>
                <Modal
                    visible={visible}
                    title="Here are your items"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <a key="total" style={{paddingRight:5}}>Total:</a>,
                        <a key="totalprice" style={{paddingRight:7, color:"red"}}>${totalPrice}</a>,
                        <Button key="submit" type="primary" shape={"round"} size={"small"} loading={loading} onClick={this.handleOk}>
                            Order all of these!
                        </Button>,
                    ]}
                >
                    <List
                        itemLayout={"horizontal"}
                        dataSource={renderList}
                        renderItem={item =>(
                            <List.Item actions={[
                                <Icon type="minus-circle" onClick={()=>this.decrementCount(item.id)} theme="twoTone" style={{ fontSize: '32px' }} id={item.item.name+'-minus'}></Icon>,
                                <div>{item.count}</div>,
                                <Icon type="plus-circle" onClick={()=>this.incrementCount(item.id)} theme="twoTone" style={{ fontSize: '32px' }} id={item.item.name+'-plus'}></Icon>
                            ]} id={item.item.name}>
                                <List.Item.Meta
                                    title={item.item.name}
                                    description={
                                        <div ><Icon type="dollar" style={{ fontSize: '20px', paddingRight:5}} theme="outlined"></Icon>{item.item.price}</div>
                                    }
                                    avatar={<img
                                        width={200}
                                        height={100}
                                        alt="logo"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    id = {item.item.name} />}
                                />
                            </List.Item>
                        )
                        }
                    />
                </Modal>
            </div>
        )
    }
}