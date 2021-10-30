import React, { Component } from "react";
import "./home.component.scss";
import { Card, Container, Row, Col } from "react-bootstrap";
class NoWalletComponent extends Component {
  render() {
    return (
      <Card body>
        <Card.Title>No Wallet Available!</Card.Title>
        <Container fluid>
          <Row className="row-signup">
            <Col>
              Sorry! You can access this website without Metamask installed on
              your browser.
            </Col>
          </Row>
        </Container>
      </Card>
    );
  }
}

export default NoWalletComponent;
