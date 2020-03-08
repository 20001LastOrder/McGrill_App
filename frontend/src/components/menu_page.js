import React, { Component } from "react";
import ItemCard from "./itemcard";
import { Container, Row, Col, Button } from "reactstrap";

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
  };
  

  componentDidMount() {
    let items = localStorage.getItem('itemList') ? localStorage.getItem('itemList') : [];
    let counts = localStorage.getItem('itemQuantity') ? localStorage.getItem('itemQuantity') : [];
    
    this.setState({order_items: items});
    this.setState({item_order_counts:counts});
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
          <Col><Button color="primary" onClick={() => {
              localStorage.setItem('itemList', this.state.menu_items);
              localStorage.setItem('itemQuantity', this.state.item_order_counts);
          }}>Add to Cart</Button></Col>
        </Row>
        
      </div>
    );
  }
}
