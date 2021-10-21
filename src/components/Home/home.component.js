import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./home.component.scss";
import ConnectToWallet from "./connect-button/connect.component";

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
          <ConnectToWallet />
        </div>
      </div>
    );
  }
}

export default HomeComponent;
