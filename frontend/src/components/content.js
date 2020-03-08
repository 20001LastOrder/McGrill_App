import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {List, Avatar, Icon, Pagination, Button, Rate, Popover, Descriptions} from 'antd';
import 'antd/dist/antd.css'

export default class Content extends Component{
    state = {
        query: '',
        data: [],
        filteredData: []
      };

      handleInputChange = (event) => {
        const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.name.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData
      };
    });
  };

  componentDidMount(){
  this.setState({ data: this.listdata });
  }
      getData = () => {
        fetch('https://mcgrill-backend.herokuapp.com/restaurant/all')
        
        .then(response => response.json())
        
        .then(data => {
            
          const { query } = this.state;
          
          const filteredData = data.filter(element => {
            return element.name.toLowerCase().includes(query.toLowerCase());
          });
  
          this.setState({
            data,
            filteredData
          });
        });
    };

    componentWillMount() {
        this.getData();
        console.log(this.getData());
        
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
                <form>
          <input
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
        <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
                <List itemLayout="horizontal"
                      bordered={true}
                      size={"large"}
                      pagination={{
                          onChange:page => {
                              console.log(page);
                          },
                          pageSize:3
                      }}
                      dataSource={this.state.filteredData}
                      renderItem = {item => (
                          <List.Item
                              actions={[<Rate allowHalf defaultValue={1.5} />,
                                      <Button size="small" type={"primary"}>Order</Button>,
                                  <Popover placement={"left"} content={
                                      <div>{item.orders}
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
                                      <Avatar src={require("../"+'pictures/rest.png'+"")} />
                                  </Popover>}
                                  title={<a href={item.href}>{item.name}</a>}
                                  description={item.address.street + " "+ item.address.city + " " + item.address.zip}
                                  
                              />
                          </List.Item>
                      )}
                        >
                </List>
            </div>
        );
    }
}