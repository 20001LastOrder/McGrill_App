import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';

export default class ItemCard extends Component {
  render() {
    return (
      <Container>
          <Row xs="2">
            <Col xs="3">
              <img src="https://picsum.photos/100/100" alt="Food Image"/>
            </Col>
            <Col xs="6">
              <h5>{this.props.item.name}</h5>
              <p  style={{ border: '2px solid black' }}>{this.props.item.description}</p>
              <h5 style={{ color: "orange" }}>{this.props.item.price}$</h5>
            </Col>
          </Row>
      </Container>
    );
  }
};