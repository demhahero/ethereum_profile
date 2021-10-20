import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./home.component.scss";

class HomeComponent extends Component {
  handleClick(e) {
    if (e.key === "Enter") {
      window.location = "/Search";
    }
  }
  render() {
    return (
      <div>
        <div>
          <input
            placeholder="name, phone, id, etc"
            onKeyDown={this.handleClick}
          />
        </div>
        <div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/Signup";
            }}
          >
            Organization
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/Signup";
            }}
          >
            Individual
          </Button>
        </div>
        <div>
          <Button>Connect</Button>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
