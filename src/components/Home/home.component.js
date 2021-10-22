import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./home.component.scss";
import { Card, Form, Container, Row, Col } from "react-bootstrap";
class HomeComponent extends Component {
  onSearchEnter(e) {
    if (e.key === "Enter") {
      window.location = "/Search";
    }
  }

  render() {
    return (
      <Card body>
        <Card.Title>Welcome to the Home Page!</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Profile</Form.Label>
            <Form.Control
              placeholder="Keywords, email, content, id, ...etc"
              onChange={(e) => this.onSearchEnter(e)}
            />
          </Form.Group>
        </Form>
        <Container fluid>
          <Row>
            <Col>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/Signup";
                }}
              >
                Register as Organization
              </Button>
            </Col>
            <Col>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/Signup";
                }}
              >
                Register as Individual
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    );
  }
}

export default HomeComponent;
