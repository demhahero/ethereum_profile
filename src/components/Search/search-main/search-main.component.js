import React, { Component } from "react";
import "./search-main.component.scss";
import { Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import SearchItemComponent from "./search-item/search-item.component.js";
import Config from "../../../config";

class SearchMainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    fetch(Config.API_URL + "?do=search&value=" + event.target.value)
      .then((response) => response.json())
      .then((response) => this.setState({ data: response }));
  }

  render() {
    return (
      <Card body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              onChange={(e) => this.onChange(e)}
              placeholder="Keywords, email, content, id, ...etc"
            />
          </Form.Group>
        </Form>

        {this.state.data.map((item) => (
          <SearchItemComponent
            id={item["id"]}
            email={item["email"]}
            address={item["address"]}
          />
        ))}
      </Card>
    );
  }
}

export default SearchMainComponent;
