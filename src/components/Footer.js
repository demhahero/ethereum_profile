import React, { Component } from "react";
import "./Footer.scss";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      account: "",
      balance: 0,
      id: null,
    };
  }

  render() {
    return (
      <footer id="footer" class="footer-1">
        Copyright 2021
      </footer>
    );
  }
}

export default Footer;
