import React, { Component } from "react";
import ItemCard from "./itemcard";
import { Container, Row, Col, Button } from "reactstrap";
import {Tooltip} from "antd";
import Cart from "./shoppingCart"


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

export default class Menu extends Component {
  listdata = new Array();


  constructor(props) {
    super(props);

    this.state = {
      menu_items: [],
      item_order_counts: []
    };
  }

  incrementItem = index => {
    let counts = [...this.state.item_order_counts];
    counts[index]++;
    this.setState({ item_order_counts: counts });
  };

  decreaseItem = index => {
    let counts = [...this.state.item_order_counts];
    counts[index]--;
    this.setState({ item_order_counts: counts });
  };

  resetCounts = () => {
    let newCounts = this.state.item_order_counts.fill(0);
    this.setState({ item_order_counts: newCounts });
  }

  collectData = () => {
    for(var i=0;i<this.state.menu_items.length;i++){
      this.listdata[i].count = this.state.item_order_counts[i];
    }
  }

  componentDidMount() {
    // TODO: this shall change to API call to fetch all menu items of a restaurants
    // Refer to: https://stackoverflow.com/questions/45713138/reactjs-what-is-the-correct-way-to-set-a-state-value-as-array
    let items = [];
    items.push(sample_menu_item1);
    items.push(sample_menu_item2);
    let counts = [];
    counts.push(0);
    counts.push(0);
    this.setState({ menu_items: items, item_order_counts: counts });

    for(var i=0;i<items.length;i++){
      this.listdata.push({item:items[i],count:0});
    }
  }


  render() {
    var itemCards = this.state.menu_items.map((item, index) => (
      <Container key={index}>
        <Row>
          <Col>
            <ItemCard item={item} />
          </Col>
          <Col md="2">
            <Row>
              <Col style={{ padding: "0px" }}>
                <Button onClick={() => this.decreaseItem(index)}>-</Button>
              </Col>
              <Col style={{ paddingLeft: "0px", paddingRight: "1px" }}>
                <div style={{ border: "1px solid black" }}>
                  <p
                    style={{
                      padding: "2px",
                      fontSize: "13px",
                      paddingBottom: "1px"
                    }}
                  >
                    {this.state.item_order_counts[index]}
                  </p>
                </div>
              </Col>
              <Col style={{ paddingLeft: "2px", paddingRight: "0px" }}>
                <Button onClick={() => this.incrementItem(index)}>+</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    ));

    return (
      <div>
        <div>{itemCards}</div>
        <Row>
          <Col><Button color="secondary" onClick={this.resetCounts}>Reset</Button></Col>
          <Col><Button color="primary">Add to Cart</Button></Col>
          <Col>
            <div onClick={this.collectData}>
              <Cart data={this.listdata} />
            </div>
          </Col>
        </Row>
        
      </div>
    );
  }
}
