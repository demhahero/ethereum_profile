import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./home.component.scss";
import { Card, Container, Row, Col } from "react-bootstrap";
class HomeComponent extends Component {
  render() {
    return (
      <Card body>
        <Card.Title>Welcome to the Home Page!</Card.Title>
        <Container fluid>
          <Row className="row-signup">
            <Col>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/Signup";
                }}
              >
                Register
              </Button>
            </Col>
            <Col>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/Search";
                }}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    );
  }
}

export default HomeComponent;
